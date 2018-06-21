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
                        var sql = "SELECT file_num, master_file_num, pt.college_id, college_name, year, paid, uc, pt.scheme_id, scheme_name, pt.subscheme_id, subscheme_name, plan_files ";
                        sql += "FROM plan_11_12_paid pt, college ct, scheme st, sub_scheme sst ";
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
                                        fileNum: result[0].file_num,
                                        masterFileNum: result[0].master_file_num,
                                        college: {
                                            id: result[0].college_id,
                                            name: result[0].college_name
                                        },
                                        year: result[0].year,
                                        paid: result[0].paid,
                                        uc: result[0].uc,
                                        scheme: {
                                            id: result[0].scheme_id,
                                            name: result[0].scheme_name
                                        },
                                        subScheme: {
                                            id: result[0].subscheme_id,
                                            name: result[0].subscheme_name
                                        },
                                        plan: result[0].plan_files
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