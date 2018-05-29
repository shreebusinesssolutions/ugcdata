exports.handler = function (req, res, qpaths, qdata) {
    var cookies = require('cookies');
    var request = require('request');
    var fs = require('fs');
    var unique = require('uniqid');
    var moment = require('moment-timezone');
    var md5 = require('md5');
    //var tokenUsed = require("../function/dba_func/tokenUsed.dba_func");
    //var sanitizeJson = require("../function/sanitizeJson.func");

    var reqBodyStr = '';
    var reqBodyObj = {};
    req.on('data', function (data) {
        reqBodyStr += data;
    });
    req.on('end', function () {
        reqBodyObj = sanitizeJson(reqBodyStr, ["username", "token"]);
        var sql = "SELECT t2.last_request_time, t2.timeout_mins " +
            "FROM user_credentials t1, user_token t2 " +
            "WHERE t1.username = '" + reqBodyObj.username + "' AND t2.token = '" + reqBodyObj.token + "'  " +
            "AND t1.username = t2.username";
        db_conn.query(sql, function (err, result, fields) {
            if (err) {
                logger.error(err);
                res.statusCode = 500;
                res.statusMessage = "Internal Server Error";
                res.end();
            } else {
                if (result.length != 1) {
                    logger.error(reqBodyObj.username + ", " + reqBodyObj.token + " not found.");
                    res.statusCode = 403;
                    res.statusMessage = "Forbidden";
                    res.end();
                } else {
                    var createdTime = moment(result[0].last_request_time);
                    var currTime = moment();
                    if (currTime.isSameOrBefore(moment(createdTime.add({
                        minutes: result[0].timeout_mins
                    }).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")))) {
                        tokenUsed(reqBodyObj.token, function (err) {
                            if (err) {
                                logger.error(err);
                                res.statusCode = 500;
                                res.statusMessage = "Internal Server Error";
                                res.end();
                            } else {
                                var sql = "INSERT INTO login_log (username, login_token, using_token) VALUES ('" + reqBodyObj.username + "', '" + reqBodyObj.token + "', 1);";
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
                                });
                            }
                        });
                    } else {
                        res.statusCode = 403;
                        res.statusMessage = "Forbidden";
                        res.end();
                    }
                }
            }
        });
    });
};