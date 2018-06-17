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
                    var sql = "SELECT * FROM college WHERE college_id ='" + qdata.college_id + "'";
                    db_conn.query(sql, function (err, result, fields) {
                        if (err) {
                            logger.error(err);
                            res.statusCode = 500;
                            res.statusMessage = "Internal Server Error";
                            res.end();
                        } else {
                            if (result.length == 0) {
                                res.statusCode = 404;
                                res.statusMessage = qdata.college_id + " Not Found";
                                res.end();
                            }
                            else if (result.length == 1) {
                                var responseObj = {
                                    oldCollegeId: result[0].old_college_id,
                                    collegeName: result[0].college_name,
                                    address1: result[0].addr1,
                                    address2: result[0].addr2,
                                    pin: result[0].pin,
                                    pfmsCode: result[0].pfms_unique_code,
                                    naacValidity: result[0].naac_validity,
                                    bsrInterest: result[0].bsr_intrest_paid_and_intrest
                                };
                                res.write(JSON.stringify(responseObj));
                                res.statusCode = 200;
                                res.statusMessage = "OK";
                                res.end();
                            }
                            else {
                                res.statusCode = 500;
                                res.statusMessage = "Internal Server Error";
                                res.end();
                            }
                        }
                    })
                }
            })
        }
    });
};