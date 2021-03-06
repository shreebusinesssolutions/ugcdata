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
                        var sql = "INSERT INTO college (college_id, old_college_id, college_name, addr1, addr2, pin, pfms_unique_code, naac_validity, bsr_intrest_paid_and_intrest) ";
                        sql += "VALUES (";
                        sql += "'" + reqBodyObj.collegeId + "', ";
                        sql += "'" + reqBodyObj.oldCollegeId + "', ";
                        sql += "'" + reqBodyObj.collegeName + "', ";
                        sql += "'" + reqBodyObj.address1 + "', ";
                        sql += "'" + reqBodyObj.address2 + "', ";
                        sql += "" + reqBodyObj.pin + ", ";
                        sql += "'" + reqBodyObj.pfmsCode + "', ";
                        sql += "'" + reqBodyObj.naacValidity + "', ";
                        sql += "'" + reqBodyObj.bsrInterest + "'";
                        sql += ")";
                        sql = sql.replace(/'null'/g, "null");
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