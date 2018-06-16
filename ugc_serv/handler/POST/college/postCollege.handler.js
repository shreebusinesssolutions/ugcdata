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
                            "collegeId",
                            "oldCollegeId",
                            "collegeName",
                            "address1",
                            "address2",
                            "pin",
                            "pfmsCode",
                            "naacValidity",
                            "bsrInterest"
                        ]);
                        var sql = "UPDATE college ";
                        sql += "SET ";
                        sql += "old_college_id = '" + reqBodyObj.oldCollegeId + "', ";
                        sql += "college_name = '" + reqBodyObj.collegeName + "', ";
                        sql += "addr1 = '" + reqBodyObj.address1 + "', ";
                        sql += "addr2 = '" + reqBodyObj.address2 + "', ";
                        sql += "pin = " + reqBodyObj.pin + ", ";
                        sql += "pfms_unique_code = '" + reqBodyObj.pfmsCode + "', ";
                        sql += "naac_validity='" + reqBodyObj.naacValidity + "', ";
                        sql += "bsr_intrest_paid_and_intrest = '" + reqBodyObj.bsrInterest + "' ";
                        sql += "WHERE college_id = '" + reqBodyObj.collegeId + "'";
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