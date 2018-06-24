exports.handler = function (req, res, qpaths, qdata) {
    var unique = require('uniqid');
    var moment = require('moment-timezone');
    var md5 = require('md5');

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
                    var reqBodyStr = '';
                    var reqBodyObj = {};
                    req.on('data', function (data) {
                        reqBodyStr += data;
                    });
                    req.on('end', function () {
                        reqBodyObj = sanitizeJson(reqBodyStr, [
                            "entryNum",
                            "autoNum",
                            "fileNum",
                            "masterFileNum",
                            "collegeId",
                            "remarks",
                            "paid",
                            "uc",
                            "pendingUc",
                            "schemeId",
                            "subSchemeId",
                            "sanctionDate",
                            "caseCleared"
                        ]);
                        var sql = "UPDATE plan_11_12_paid ";
                        sql += "SET ";
                        sql += "auto_num = '" + reqBodyObj.autoNum + "' ";
                        sql += "file_num = '" + (reqBodyObj.fileNum ? reqBodyObj.fileNum.replace(/'/g, "\\'") : null) + "', ";
                        sql += "master_file_num = '" + (reqBodyObj.masterFileNum ? reqBodyObj.masterFileNum.replace(/'/g, "\\'") : null) + "', ";
                        sql += "college_id = '" + reqBodyObj.collegeId + "', ";
                        sql += "remarks = '" + (reqBodyObj.remarks ? reqBodyObj.remarks.replace(/'/g, "\\'") : null) + "', ";
                        sql += "paid = " + (reqBodyObj.paid?reqBodyObj.paid: null) + ", ";
                        sql += "uc = " + (reqBodyObj.uc?reqBodyObj.uc:null) + ", ";
                        sql += "pending_uc = " + (reqBodyObj.pendingUc?reqBodyObj.pendingUc:null) + ", ";
                        sql += "scheme_id = '" + reqBodyObj.schemeId + "', ";
                        sql += "subscheme_id = '" + reqBodyObj.subSchemeId + "', ";
                        sql += "sanction_date = '" + (reqBodyObj.sanctionDate?reqBodyObj.sanctionDate:null) + "', ";
                        sql += "case_cleared = " + reqBodyObj.caseCleared + " ";
                        sql += "WHERE entry_num = '" + reqBodyObj.entryNum + "'";
                        sql = sql.replace(/'null'/g, "null");
                        console.log(sql);
                        db_conn.query(sql, function (err, result, fields) {
                            if (err) {
                                logger.error(err);
                                res.statusCode = 500;
                                res.statusMessage = "Internal Server Error";
                                res.end();
                            } else {
                                res.statusCode = 200;
                                res.statusMessage = "OK";
                                res.end();
                            }
                        })
                    });
                }
            })
        }
    });
};