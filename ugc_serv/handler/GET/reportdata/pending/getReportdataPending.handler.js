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
                    if (qdata.entry_num) {
                        var sql = "SELECT auto_num, pt.college_id, college_name, file_num, remarks, master_file_num, sanction_date, paid, uc, pending_uc, st.scheme_id, scheme_name, sst.subscheme_id, subscheme_name, year, case_cleared ";
                        sql += "FROM plan_11_pending pt, college ct, scheme st, sub_scheme sst ";
                        sql += "WHERE entry_num = " + qdata.entry_num + " ";
                        sql += "AND pt.college_id = ct.college_id ";
                        sql += "AND pt.scheme_id = st.scheme_id ";
                        sql += "AND pt.subscheme_id = sst.subscheme_id";
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
                                        autoNum: result[0].auto_num,
                                        college: {
                                            id: result[0].college_id,
                                            name: result[0].college_name
                                        },
                                        fileNum: result[0].file_num,
                                        masterFileNum: result[0].master_file_num,
                                        sanctionDate: result[0].sanction_date,
                                        paid: result[0].paid,
                                        uc: result[0].uc,
                                        pendingUc: result[0].pending_uc,
                                        scheme: {
                                            id: result[0].scheme_id,
                                            name: result[0].scheme_name
                                        },
                                        subScheme: {
                                            id: result[0].subscheme_id,
                                            name: result[0].subscheme_name
                                        },
                                        year: result[0].year,
                                        caseCleared: result[0].case_cleared
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
                    else if(qdata.auto_num) {
                        var sql = "SELECT COUNT(*) as count FROM plan_11_pending WHERE auto_num = " + qdata.auto_num;
                        db_conn.query(sql, function (err, result, fields) {
                            if (err) {
                                logger.error(err);
                                res.statusCode = 500;
                                res.statusMessage = "Internal Server Error";
                                res.end();
                            } else {
                                if (result[0].count == 0) {
                                    res.statusCode = 404;
                                    res.statusMessage = qdata.college_id + " Not Found";
                                    res.end();
                                }
                                else if (result[0].count == 1) {
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
                    else {
                        res.statusCode = 400;
                        res.statusMessage = "Bad Request";
                        res.end();
                    }
                }
            })
        }
    });
};