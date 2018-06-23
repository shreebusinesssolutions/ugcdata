exports.handler = function (req, res, qpaths, qdata) {
    var unique = require('uniqid');
    var moment = require('moment-timezone');
    var md5 = require('md5');
    //var tokenUsed = require("../function/dba_func/tokenUsed.dba_func");
    //var sanitizeJson = require("../function/sanitizeJson.func");
    //var bearer = require("../function/bearer.func");

    for (var key in qdata) {
        qdata[key] = qdata[key].split(";,;");
        if (key == "use_or")
            qdata.use_or = qdata.use_or == "true" ? true : false;
        else if (key == "sanctionDate")
            qdata.sanctionDate[2] = qdata.sanctionDate[2] == "true" ? true : false;
        else if (key == "paid")
            qdata.paid[2] = qdata.paid[2] == "true" ? true : false;
        else if (key == "uc")
            qdata.uc[2] = qdata.uc[2] == "true" ? true : false;
        else if (key == "pendingUc")
            qdata.pendingUc[2] = qdata.pendingUc[2] == "true" ? true : false;
        else if (key == "pendingUc") {
            qdata.pendingUc[0] = qdata.pendingUc[0] == "true" ? true : false;
            qdata.pendingUc[1] = qdata.pendingUc[1] == "true" ? true : false;
        }
        else {
            if (qdata[key].length == 1 && qdata[key][0] == '')
                qdata[key] = [];
        }
    }

    bearer.getToken(req, function (err, token) {
        if (err) {
            logger.error(err);
            res.statusCode = 500;
            res.statusMessage = "Internal Server Error";
            res.end();
        }
        else {
            bearer.verify(token, req.headers["username"], function (err) {
                if (err) {
                    logger.error(err, { username: req.headers["username"] });
                    if (err.message == "bearer_auth_error") {
                        res.statusCode = 403;
                        res.statusMessage = "Forbidden";
                        res.end();
                    }
                    else {
                        res.statusCode = 500;
                        res.statusMessage = "Internal Server Error";
                        res.end();
                    }
                }
                else {
                    tokenUsed(token, function (err) {
                        if (err) {
                            logger.error(err);
                            res.statusCode = 500;
                            res.statusMessage = "Internal Server Error";
                            res.end();
                        } else {
                            var concat = qdata.use_or ? "OR" : "AND";
                            var sql = "SELECT * FROM plan_11_pending ";
                            sql += "WHERE ";
                            var sub_query = [];
                            if (qdata.autoNum.length > 0) {
                                var k = "autoNum";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(auto_num IS null OR auto_num IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("auto_num IS null");
                                }
                                else
                                    sub_query.push("auto_num IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(auto_num IS NULL OR auto_num IN (SELECT DISTINCT auto_num from plan_11_pending))")
                            }
                            if (qdata.fileNum.length > 0) {
                                var k = "fileNum";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(file_num IS null OR file_num IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("file_num IS null");
                                }
                                else
                                    sub_query.push("file_num IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(file_num IS NULL OR file_num IN (SELECT DISTINCT file_num from plan_11_pending))")
                            }
                            if (qdata.masterFileNum.length > 0) {
                                var k = "masterFileNum";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(master_file_num IS null OR master_file_num IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("master_file_num IS null");
                                }
                                else
                                    sub_query.push("master_file_num IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(master_file_num IS NULL OR master_file_num IN (SELECT DISTINCT master_file_num from plan_11_pending))")
                            }
                            if (qdata.collegeId.length > 0) {
                                var k = "collegeId";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(college_id IS null OR college_id IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("college_id IS null");
                                }
                                else
                                    sub_query.push("college_id IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(college_id IS NULL OR college_id IN (SELECT DISTINCT college_id from plan_11_pending))")
                            }
                            if (qdata.remarks.length > 0) {
                                var k = "remarks";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(remarks IS null OR remarks IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("remarks IS null");
                                }
                                else
                                    sub_query.push("remarks IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(remarks IS NULL OR remarks IN (SELECT DISTINCT remarks from plan_11_pending))")
                            }
                            if (qdata.sanctionDate[2] == true)
                            sub_query.push("(sanction_date IS null OR sanction_date BETWEEN '" + moment(qdata.sanctionDate[0]).subtract(1, "d").format("YYYY-MM-DD") + "' AND  '" + moment(qdata.sanctionDate[1]).add(1, "d").format("YYYY-MM-DD") + "')");
                            else
                                sub_query.push("(sanction_date IS NOT null OR sanction_date BETWEEN '" + moment(qdata.sanctionDate[0]).subtract(1, "d").format("YYYY-MM-DD") + "' AND  '" + moment(qdata.sanctionDate[1]).add(1, "d").format("YYYY-MM-DD") + "')");
                            if (qdata.paid[2] == true)
                                sub_query.push("(paid IS null OR paid BETWEEN '" + qdata.paid[0] + "' AND  '" + qdata.paid[1] + "')");
                            else
                                sub_query.push("(paid IS NOT null OR paid BETWEEN '" + qdata.paid[0] + "' AND  '" + qdata.paid[1] + "')");
                            if (qdata.uc[2] == true)
                                sub_query.push("(uc IS null OR uc BETWEEN '" + qdata.uc[0] + "' AND  '" + qdata.uc[1] + "')");
                            else
                                sub_query.push("(uc IS NOT null OR uc BETWEEN '" + qdata.uc[0] + "' AND  '" + qdata.uc[1] + "')");
                            if (qdata.pendingUc[2] == true)
                                sub_query.push("(pending_uc IS null OR pending_uc BETWEEN '" + qdata.pendingUc[0] + "' AND  '" + qdata.pendingUc[1] + "')");
                            else
                                sub_query.push("(pending_uc IS NOT null OR pending_uc BETWEEN '" + qdata.pendingUc[0] + "' AND  '" + qdata.pendingUc[1] + "')");
                            if (qdata.scheme.length > 0) {
                                var k = "scheme";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(scheme_id IS null OR scheme_id IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("scheme_id IS null");
                                }
                                else
                                    sub_query.push("scheme_id IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(scheme_id IS NULL OR scheme_id IN (SELECT DISTINCT scheme_id from plan_11_pending))")
                            }
                            if (qdata.subScheme.length > 0) {
                                var k = "subScheme";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(subscheme_id IS null OR subscheme_id IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("subscheme_id IS null");
                                }
                                else
                                    sub_query.push("subscheme_id IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(subscheme_id IS NULL OR subscheme_id IN (SELECT DISTINCT subscheme_id from plan_11_pending))")
                            }
                            if (qdata.year.length > 0) {
                                var k = "year";
                                if (qdata[k].indexOf("(Blank)") >= 0) {
                                    qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                                    if (qdata[k].length)
                                        sub_query.push("(year IS null OR year IN ('" + qdata[k].join("','") + "'))");
                                    else
                                        sub_query.push("year IS null");
                                }
                                else
                                    sub_query.push("year IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("(year IS NULL OR year IN (SELECT DISTINCT year from plan_11_pending))")
                            }
                            if (!qdata.caseCleared[0] && !qdata.caseCleared[1])
                                sub_query.push("(case_cleared != 1 AND case_cleared !=0)")
                            else if (qdata.caseCleared[0] && !qdata.caseCleared[1])
                                sub_query.push("(case_cleared = 1 AND case_cleared !=0)")
                            else if (!qdata.caseCleared[0] && qdata.caseCleared[1])
                                sub_query.push("(case_cleared != 1 AND case_cleared =0)")
                            sql += sub_query.join(" " + concat + " ");
                            sql += " LIMIT " + qdata.limit[0] + ", " + qdata.limit[1]
                            
                            db_conn.query(sql, function (err, result, fields) {
                                if (err) {
                                    logger.error(err);
                                    res.statusCode = 500;
                                    res.statusMessage = "Internal Server Error";
                                    res.end();
                                } else {
                                    var responseObj = [];
                                    for (var i = 0; i < result.length; i++) {
                                        responseObj.push([
                                            result[i].entry_num,
                                            result[i].auto_num,
                                            result[i].college_id,
                                            result[i].file_num,
                                            result[i].remarks,
                                            result[i].master_file_num,
                                            result[i].sanction_date,
                                            result[i].paid,
                                            result[i].uc,
                                            result[i].pending_uc,
                                            result[i].scheme_id,
                                            result[i].subscheme_id,
                                            result[i].year,
                                            result[i].case_cleared
                                        ]);
                                    }
                                    res.write(JSON.stringify({
                                        data: responseObj
                                    }));
                                    res.statusCode = 200;
                                    res.statusMessage = "OK";
                                    res.end();
                                }
                            })
                        }
                    });
                }
            });
        }
    });
};