var http = require('http');
var url = require('url');
var routers = require("./function/router.func");
mysql = require("mysql");
logger = require("./function/logger.func");
var dba = require("./global/dba.global");
bearer = require("./function/bearer.func");
tokenUsed = require("./function/dba_func/tokenUsed.dba_func");
sanitizeJson = require("./function/sanitizeJson.func");

db_conn = mysql.createConnection({
    host: dba.servername,
    user: dba.username,
    password: dba.password,
    database: dba.dbname,
    multipleStatements: true
});

db_conn.connect(function (err) {
    if (err)
        logger.error(err);
    else {
        logger.log("Connected to DB: " + dba.servername + ":" + dba.dbname);
        http.createServer(function (req, res) {
            var q = url.parse(req.url, true);
            var qdata = q.query;
            var qpaths = (q.pathname.substr(1, q.pathname.length)).split("/");
            var handlerObj = routers.route(req.method, q.pathname);
            if (handlerObj) {
                handlerObj.handler(req, res, qpaths, qdata);
            } else {
                res.statusCode = 404;
                res.statusMessage = q.pathname + "(" + req.method + ") Not Found.";
                res.end();
            }
        }).listen(8888);

        logger.log('Server running on port 8888');
        logger.log("Settting DB heartbeat with interval = " + dba.heartbeat_interval);
        setInterval(function() {
            logger.log("DB Heartbeat req: SELECT 1;");
            db_conn.query("SELECT 1;", function (err, result, fields) {
                if(err) {
                    logger.error(err);
                }
                else {
                    logger.log("DB Heartbeat resp: " + JSON.stringify(result));
                }
            });
        }, dba.heartbeat_interval);
    }
});