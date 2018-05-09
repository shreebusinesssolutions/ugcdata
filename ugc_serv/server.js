var http = require('http');
var url = require('url');
var routers = require("./function/router.func.js");

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var qdata = q.query;
    var qpaths = (q.pathname.substr(1, q.pathname.length)).split("/");
    var handlerObj = routers.route(req.method, q.pathname);
    if (handlerObj) {
        handlerObj.handler(req, res, qpaths, qdata);
    }
    else {
        res.statusCode = 404;
        res.statusMessage = q.pathname + "(" + req.method + ") Not Found.";
        res.end();
    }
}).listen(8888);

console.log('Server running on port 8888\n');