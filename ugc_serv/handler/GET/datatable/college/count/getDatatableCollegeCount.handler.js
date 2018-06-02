exports.handler = function (req, res, qpaths, qdata) {
    var unique = require('uniqid');
    var moment = require('moment-timezone');
    var md5 = require('md5');
    //var tokenUsed = require("../function/dba_func/tokenUsed.dba_func");
    //var sanitizeJson = require("../function/sanitizeJson.func");
    //var bearer = require("../function/bearer.func");

    for (var key in qdata) {
        qdata[key] = qdata[key].split(";,;");
        if (qdata[key].length == 1 && qdata[key][0] == '')
            qdata[key] = [];
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
                            var sql = "SELECT COUNT(*) FROM college ";
                            sql += "WHERE ";
                            var sub_query = [];
                            if (qdata.collegeId.length > 0) {
                                var k = "collegeId";
                                sub_query.push("college_id IN ('" + qdata[k].join("','") + "')");
                            }
                            else {
                                sub_query.push("college_id IN (SELECT DISTINCT college_id from college))")
                            }
                            sql += sub_query.join(" " + concat + " ") + " ";
                            sql += "LIMIT " + qdata.limit[0] + ", " + qdata.limit[1]
                            console.log(sql);
                            
                            db_conn.query(sql, function (err, result, fields) {
                                if (err) {
                                    logger.error(err);
                                    res.statusCode = 500;
                                    res.statusMessage = "Internal Server Error";
                                    res.end();
                                } else {
                                    res.write("" + result[0].count);
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