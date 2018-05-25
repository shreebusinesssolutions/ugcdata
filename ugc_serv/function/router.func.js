var _loginUser = require("../handler/loginUser.handler");
var _loginUserAuto = require("../handler/loginUserAotu.handler");
var _getPaidFileNum = require("../handler/getPaidFileNum.handler");
var logger = require("../function/logger.func");

exports.route = function (method, pathname) {
    if (method == 'POST' && /^\/user\/login\/auto\//.test(pathname))
        return _loginUserAuto;
    else if (method == 'POST' && /^\/user\/login\//.test(pathname))
        return _loginUser;
    else if (method == "GET" && /^\/data\/paid\/filenum\//.test(pathname))
        return _getPaidFileNum;
    else {
        logger.error(pathname + " (" + method + ") Not found.", { method: "router()" });
        return false;
    }
};