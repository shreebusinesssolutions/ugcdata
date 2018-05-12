var _loginUser = require("../handler/loginUser.handler");
var logger = require("../function/logger.func");

exports.route = function (method, pathname) {
    if (method == 'POST' && /^\/user\/login\//.test(pathname))
        return _loginUser;
    // else if (method == 'GET' && /^\/chat\/download\//.test(pathname))
    //     return _chatDownloader;
    // else if (method == 'GET' && /^\/chat\/end\//.test(pathname))
    //     return _endChat;
    // else if (method == 'POST' && /^\/chat\//.test(pathname))
    //     return _chat;
    else {
        logger.error(pathname + " (" + method + ") Not found.", { method: "router()" });
        return false;
    }
};