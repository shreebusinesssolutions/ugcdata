var _loginUser = require("../handler/loginUser.handler");
var _loginUserAuto = require("../handler/loginUserAotu.handler");
var _getPaidFileNum = require("../handler/getPaidFileNum.handler");
var _getPaidMasterFileNum = require("../handler/getPaidMasterFileNum.handler");
var _getPaidCollege = require("../handler/getPaidCollege.handler");
var _getPaidYear = require("../handler/getPaidYear.handler");
var _getPaidPaid = require("../handler/getPaidPaid.handler");
var _getPaidUC = require("../handler/getPaidUC.handler");
var _getPaidScheme = require("../handler/getPaidScheme.handler");
var _getPaidSubScheme = require("../handler/getPaidSubScheme.handler");
var _getPaidPlan = require("../handler/getPaidPlan.handler");
var _getPaidReportCount = require("../handler/getReportPaidCount.handler");
var _getPaidReport = require("../handler/getReportPaid.handler");

var logger = require("../function/logger.func");

exports.route = function (method, pathname) {
    if (method == 'POST' && /^\/user\/login\/auto\//.test(pathname))
        return _loginUserAuto;
    else if (method == 'POST' && /^\/user\/login\//.test(pathname))
        return _loginUser;
    else if (method == "GET" && /^\/data\/paid\/filenum\//.test(pathname))
        return _getPaidFileNum;
    else if (method == "GET" && /^\/data\/paid\/masterfilenum\//.test(pathname))
        return _getPaidMasterFileNum;
    else if (method == "GET" && /^\/data\/paid\/college\//.test(pathname))
        return _getPaidCollege;
    else if (method == "GET" && /^\/data\/paid\/year\//.test(pathname))
        return _getPaidYear;
    else if (method == "GET" && /^\/data\/paid\/paid\//.test(pathname))
        return _getPaidPaid;
    else if (method == "GET" && /^\/data\/paid\/uc\//.test(pathname))
        return _getPaidUC;
    else if (method == "GET" && /^\/data\/paid\/scheme\//.test(pathname))
        return _getPaidScheme;
    else if (method == "GET" && /^\/data\/paid\/subscheme\//.test(pathname))
        return _getPaidSubScheme;
    else if (method == "GET" && /^\/data\/paid\/plan\//.test(pathname))
        return _getPaidPlan;
    else if (method == "GET" && /^\/report\/paid\/count\//.test(pathname))
        return _getPaidReportCount;
    else if (method == "GET" && /^\/report\/paid\//.test(pathname))
        return _getPaidReport;
    else {
        logger.error(pathname + " (" + method + ") Not found.", { method: "router()" });
        return false;
    }
};