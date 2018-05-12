exports.handler = function (req, res, qpaths, qdata) {
    var cookies = require('cookies');
    var request = require('request');
    var fs = require('fs');
    var unique = require('uniqid');
    var moment = require('moment');
    var md5 = require('md5');
    var bearer = require("../function/bearer.func");
    var getIp = require("ipware")().get_ip;

    var ip = getIp(req).clientIp;
    var reqBodyStr = '';
    var reqBodyObj = {};
    req.on('data', function (data) {
        reqBodyStr += data;
    });
    req.on('end', function () {
        reqBodyObj = JSON.parse(reqBodyStr);
        var sql = "SELECT COUNT(*) AS COUNT FROM user_credentials WHERE username = '" + reqBodyObj.username + "' AND password_hash = '" + md5(reqBodyObj.password) + "'";
        db_conn.query(sql, function (err, result, fields) {
            if (err) {
                logger.error(err);
                res.statusCode = 500;
                res.statusMessage = "Internal Server Error";
                res.end();
            } else {
                switch (result[0].COUNT) {
                    case 0:
                        res.statusCode = 403;
                        res.statusMessage = "Forbidden";
                        res.end();
                        break;
                    case 1:
                        var token = md5(moment(new Date()).format("YYYYMMDD_kkmmss") + "__" + unique());
                        var sql = "DELETE FROM user_token WHERE username = '" + reqBodyObj.username + "'; " +
                            "INSERT INTO user_token (token, username) VALUES ('" + token + "', '" + reqBodyObj.username + "'); " +
                            "INSERT INTO login_log (username, ip) VALUES ('" + reqBodyObj.username +"', '" + ip + "');";
                        db_conn.query(sql, function (err, result, fields) {
                            if (err) {
                                logger.error(err);
                                res.statusCode = 500;
                                res.statusMessage = "Internal Server Error";
                                res.end();
                            } else {
                                res.write(JSON.stringify({
                                    token: token
                                }));
                                res.statusCode = 200;
                                res.statusMessage = "OK";
                                res.end();
                            }
                        });
                        break;
                    default:
                        break;
                }
            }
        });
    });

    // bearer.getToken(req, function (err, token) {
    //     bearer.verify(token, function (err) {
    //         if (err) {
    //             logger.error(err);
    //             res.statusCode = 401;
    //             res.statusMessage = "Unauthorized";
    //             res.setHeader("WWW-Authenticate", "Bearer");
    //             res.end();
    //         } else {
    //             var reqBodyStr = '';
    //             var reqBodyObj = {};
    //             req.on('data', function (data) {
    //                 reqBodyStr += data;
    //             });
    //             req.on('end', function () {
    //                 reqBodyObj = JSON.parse(reqBodyStr);
    //                 console.log(reqBodyObj);
    //             });

    //             res.statusCode = 200;
    //             res.end();
    //         }
    //     });
    // });
};