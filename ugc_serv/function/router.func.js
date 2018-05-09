var _startChat = require("../handler/startChat.handler.js");
var _chat = require("../handler/chat.handler.js");
var _chatDownloader = require("../handler/chatDownloader.handler.js");
var _endChat = require("../handler/endChat.handler.js");
var logger = require("../function/logger.func.js");

exports.route = function (method, pathname) {
    if (method == 'GET' && /^\/chat\/start\//.test(pathname))
        return _startChat;
    else if (method == 'GET' && /^\/chat\/download\//.test(pathname))
        return _chatDownloader;
    else if (method == 'GET' && /^\/chat\/end\//.test(pathname))
        return _endChat;
    else if (method == 'POST' && /^\/chat\//.test(pathname))
        return _chat;
    else {
        logger.error(pathname + " (" + method + ") Not found.", { method: "router()" });
        return false;
    }
};