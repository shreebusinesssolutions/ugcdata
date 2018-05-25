exports.getToken = require("bearer-token");
exports.verify = function (token, username, cb) {
    var BearerAuthError = require("../error/bearerAuth.error");
    sql = "SELECT * FROM user_token WHERE token = '" + token + "' AND username = '" + username + "' AND active = 1";
    db_conn.query(sql, function (err, result, fields) {
        if (err)
            cb(err)
        else {
            if (result.length != 1)
                cb(new BearerAuthError());
            else {
                tokenUsed(token, function (err, result, fields) {
                    if (err)
                        cb(err);
                    else
                        cb();
                })
            }
        }
    });
};