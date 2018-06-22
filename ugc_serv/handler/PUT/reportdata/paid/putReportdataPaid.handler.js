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
                            "fileNum",
                            "masterFileNum",
                            "collegeId",
                            "paid",
                            "uc",
                            "schemeId",
                            "subSchemeId",
                            "year",
                            "plan"
                        ]);
                        var sql = "UPDATE plan_11_12_paid ";
                        sql += "SET ";
                        sql += "file_num = '" + (reqBodyObj.fileNum ? reqBodyObj.fileNum.replace(/'/g, "\\'") : null) + "', ";
                        sql += "master_file_num = '" + (reqBodyObj.masterFileNum ? reqBodyObj.masterFileNum.replace(/'/g, "\\'") : null) + "', ";
                        sql += "college_id = '" + reqBodyObj.collegeId + "', ";
                        sql += "year = '" + reqBodyObj.year + "', ";
                        sql += "paid = " + reqBodyObj.paid + ", ";
                        sql += "uc = " + reqBodyObj.uc + ", ";
                        sql += "scheme_id = '" + reqBodyObj.schemeId + "', ";
                        sql += "subscheme_id = '" + reqBodyObj.subSchemeId + "', ";
                        sql += "plan_files = '" + reqBodyObj.plan + "' ";
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