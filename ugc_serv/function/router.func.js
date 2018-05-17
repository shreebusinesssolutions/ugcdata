var _loginUser = require("../handler/loginUser.handler");
var _loginUserAuto =  require("../handler/loginUserAotu.handler");
var logger = require("../function/logger.func");

exports.route = function (method, pathname) {
    if (method == 'POST' && /^\/user\/login\/auto\//.test(pathname))
        return _loginUserAuto;
    else if (method == 'POST' && /^\/user\/login\//.test(pathname))
        return _loginUser;
    else {
        logger.error(pathname + " (" + method + ") Not found.", { method: "router()" });
        return false;
    }
};