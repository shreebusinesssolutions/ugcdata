module.exports = function (token, cb) {
    var sql = "UPDATE user_token " +
        "SET last_request_time = NOW() " +
        "WHERE token = '" + token + "'";
    db_conn.query(sql, function (err, result, fields) {
        cb(err, result, fields);
    });
};