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
                        var sqlmax = "SELECT MAX(entry_num) as max_entry_num FROM plan_11_12_paid";
                        db_conn.query(sqlmax, function (err, result, fields) {
                            if (err) {
                                logger.error(err);
                                res.statusCode = 500;
                                res.statusMessage = "Internal Server Error";
                                res.end();
                            } else {
                                var new_entry_num = result[0].max_entry_num + 1;
                                var sql = "INSERT INTO plan_11_12_paid (entry_num, file_num, master_file_num, college_id, year, paid, uc, scheme_id, subscheme_id, plan_files) ";
                                sql += "VALUES (";
                                sql += new_entry_num + ", ";
                                sql += "'" + (reqBodyObj.fileNum ? reqBodyObj.fileNum.replace(/'/g, "\\'") : null) + "', ";
                                sql += "'" + (reqBodyObj.masterFileNum ? reqBodyObj.masterFileNum.replace(/'/g, "\\'") : null) + "', ";
                                sql += "'" + reqBodyObj.collegeId + "', ";
                                sql += "'" + reqBodyObj.year + "', ";
                                sql += "" + reqBodyObj.paid + ", ";
                                sql += "" + reqBodyObj.uc + ", ";
                                sql += "'" + reqBodyObj.schemeId + "', ";
                                sql += "'" + reqBodyObj.subSchemeId + "', ";
                                sql += "'" + reqBodyObj.plan + "'";
                                sql += ")";
                                sql = sql.replace(/'null'/g, "null");
                                db_conn.query(sql, function (err, result, fields) {
                                    if (err) {
                                        logger.error(err);
                                        res.statusCode = 500;
                                        res.statusMessage = "Internal Server Error";
                                        res.end();
                                    } else {
                                        res.write(JSON.stringify({
                                            entryNum: new_entry_num
                                        }));
                                        res.statusCode = 200;
                                        res.statusMessage = "OK";
                                        res.end();
                                    }
                                });
                            }
                        });
                    });
                }
            })
        }
    });
};