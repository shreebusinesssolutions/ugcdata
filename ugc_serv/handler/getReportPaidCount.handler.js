exports.handler = function (req, res, qpaths, qdata) {
    var unique = require('uniqid');
    var moment = require('moment-timezone');
    var md5 = require('md5');
    tokenUsed = require("../function/dba_func/tokenUsed.dba_func");
    var sanitizeJson = require("../function/sanitizeJson.func");
    var bearer = require("../function/bearer.func");

    for (var key in qdata) {
        qdata[key] = qdata[key].split(";,;");
        if (key == "use_or")
            qdata.use_or = qdata.use_or == "true" ? true : false;
        else {
            if (qdata[key].length == 1 && qdata[key][0] == '')
                qdata[key] = [];
            // if (qdata[key].indexOf("(Blank)") >= 0)
            //     qdata[key][qdata[key].indexOf("(Blank)")] = "null";
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
                    var concat = qdata.use_or ? "OR" : "AND";
                    var sql = "SELECT COUNT(*) AS count FROM plan_11_12_paid ";
                    sql += "WHERE ";
                    var sub_query = [];
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
                        sub_query.push("(file_num IS NULL OR file_num IN (SELECT DISTINCT file_num from plan_11_12_paid))")
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
                        sub_query.push("(master_file_num IS NULL OR master_file_num IN (SELECT DISTINCT master_file_num from plan_11_12_paid))")
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
                        sub_query.push("(college_id IS NULL OR college_id IN (SELECT DISTINCT college_id from plan_11_12_paid))")
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
                        sub_query.push("(year IS NULL OR year IN (SELECT DISTINCT year from plan_11_12_paid))")
                    }
                    sub_query.push("paid BETWEEN " + qdata.paid[0] + " AND " + qdata.paid[1]);
                    sub_query.push("uc BETWEEN " + qdata.uc[0] + " AND " + qdata.uc[1]);
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
                        sub_query.push("(scheme_id IS NULL OR scheme_id IN (SELECT DISTINCT scheme_id from plan_11_12_paid))")
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
                        sub_query.push("(subscheme_id IS NULL OR subscheme_id IN (SELECT DISTINCT subscheme_id from plan_11_12_paid))")
                    }
                    if (qdata.plan.length > 0) {
                        var k = "plan";
                        if (qdata[k].indexOf("(Blank)") >= 0) {
                            qdata[k].splice(qdata[k].indexOf("(Blank)"), 1);
                            if (qdata[k].length)
                                sub_query.push("(plan_files IS null OR plan_files IN ('" + qdata[k].join("','") + "'))");
                            else
                                sub_query.push("plan_files IS null");
                        }
                        else
                            sub_query.push("plan_files IN ('" + qdata[k].join("','") + "')");
                    }
                    else {
                        sub_query.push("(plan_files IS NULL OR plan_files IN (SELECT DISTINCT plan_files from plan_11_12_paid))")
                    }
                    sql += sub_query.join(" " + concat + " ");
                    db_conn.query(sql, function (err, result, fields) {
                        if (err) {
                            logger.error(err);
                            res.statusCode = 500;
                            res.statusMessage = "Internal Server Error";
                            res.end();
                        } else {
                            // var responseObj = [];
                            // for (var i = 0; i < result.length; i++)
                            //     responseObj.push(result[i].year ? result[i].year : "(Blank)");
                            res.write("" + result[0].count);
                            res.statusCode = 200;
                            res.statusMessage = "OK";
                            res.end();
                        }
                    })
                }
            })
        }
    });
};