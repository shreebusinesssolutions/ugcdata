exports.getToken = require("bearer-token");
exports.verify = function(token, cb) {
    var BearerAuthError = require("../error/bearerAuth.error");
    if(token == "abc")
        cb();
    else
        cb(new BearerAuthError());
};