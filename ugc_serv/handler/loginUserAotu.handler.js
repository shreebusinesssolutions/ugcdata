exports.handler = function (req, res, qpaths, qdata) {
    var cookies = require('cookies');
    var request = require('request');
    var fs = require('fs');
    var unique = require('uniqid');
    var moment = require('moment-timezone');
    var md5 = require('md5');
    var bearer = require("../function/bearer.func");

    var reqBodyStr = '';
    var reqBodyObj = {};
    req.on('data', function (data) {
        reqBodyStr += data;
    });
    req.on('end', function () {
        reqBodyObj = JSON.parse(reqBodyStr);
        var sql = "SELECT t2.created_time, t2.timeout_mins FROM user_credentials t1, user_token t2 " +
            "WHERE t1.username = '" + reqBodyObj.username + "' AND t2.token = '" + reqBodyObj.token + "'  " +
            "AND t1.username = t2.username";
        db_conn.query(sql, function (err, result, fields) {
            if (err) {
                logger.error(err);
                res.statusCode = 500;
                res.statusMessage = "Internal Server Error";
                res.end();
            } else {
                console.log(result[0]);
                var createdTime = moment(result[0].created_time);
                var currTime = moment();
                console.log(currTime.format("YYYY-MM-DDTHH:mm:ss.SSSZZ"));
                console.log(createdTime.format("YYYY-MM-DDTHH:mm:ss.SSSZZ"));
                console.log(result[0].timeout_mins);
                console.log(currTime, createdTime.add({minutes: result[0].timeout_mins}), currTime.isSameOrBefore(createdTime.add(result[0].timeout_mins, 'm')));
            }
        });
    });
};