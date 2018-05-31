exports.handler = function (req, res, qpaths, qdata) {
    var unique = require('uniqid');
    var moment = require('moment-timezone');
    var md5 = require('md5');
    //tokenUsed = require("../function/dba_func/tokenUsed.dba_func");
    //var sanitizeJson = require("../function/sanitizeJson.func");
    //var bearer = require("../function/bearer.func");

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
                    var sql = "SELECT MIN(uc) AS min_uc, MAX(uc) AS max_uc FROM plan_11_pending";
                    db_conn.query(sql, function (err, result, fields) {
                        if (err) {
                            logger.error(err);
                            res.statusCode = 500;
                            res.statusMessage = "Internal Server Error";
                            res.end();
                        } else {
                            var responseObj = {
                                min: result[0].min_uc,
                                max: result[0].max_uc
                            }
                            res.write(JSON.stringify(responseObj));
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