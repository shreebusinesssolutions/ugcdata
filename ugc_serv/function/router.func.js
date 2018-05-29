var _postUserLogin = require("../handler/POST/user/login/postUserLogin.handler");
var _postUserLoginAuto = require("../handler/POST/user/login/auto/postUserLoginAotu.handler");

var _getDataGlobalCollege = require("../handler/GET/data/global/college/getDataGlobalCollege.handler");
var _getDataGlobalScheme = require("../handler/GET/data/global/scheme/getDataGlobalScheme.handler");
var _getDataGlobalSubScheme = require("../handler/GET/data/global/subscheme/getDataGlobalSubscheme.handler");

var _getPaidFilenum = require("../handler/GET/data/paid/filenum/getPaidFilenum.handler");
var _getPaidMasterfilenum = require("../handler/GET/data/paid/masterfilenum/getPaidMasterfilenum.handler");
var _getPaidYear = require("../handler/GET/data/paid/year/getPaidYear.handler");
var _getPaidPaid = require("../handlerr/GET/data/paid/paid/getPaidPaid.handler");
var _getPaidUC = require("../handler/GET/data/paid/uc/getPaidUC.handler");
var _getPaidPlan = require("../handler/GET/data/paid/plan/getPaidPlan.handler");

var _getPaidReportCount = require("../handler/GET/report/count/getReportPaidCount.handler");
var _getPaidReport = require("../handler/GET/report/getReportPaid.handler");

var logger = require("../function/logger.func");

exports.route = function (method, pathname) {
    if (method == 'POST' && /^\/user\/login\/auto\//.test(pathname))
        return _postUserLoginAuto;
    else if (method == 'POST' && /^\/user\/login\//.test(pathname))
        return _postUserLogin;

    else if (method == "GET" && /^\/data\/global\/college\//.test(pathname))
        return _getDataGlobalCollege;
    else if (method == "GET" && /^\/data\/global\/scheme\//.test(pathname))
        return _getDataGlobalScheme;
    else if (method == "GET" && /^\/data\/global\/subscheme\//.test(pathname))
        return _getDataGlobalSubScheme;

    else if (method == "GET" && /^\/data\/paid\/filenum\//.test(pathname))
        return _getPaidFilenum;
    else if (method == "GET" && /^\/data\/paid\/masterfilenum\//.test(pathname))
        return _getPaidMasterfilenum;
    else if (method == "GET" && /^\/data\/paid\/year\//.test(pathname))
        return _getPaidYear;
    else if (method == "GET" && /^\/data\/paid\/paid\//.test(pathname))
        return _getPaidPaid;
    else if (method == "GET" && /^\/data\/paid\/uc\//.test(pathname))
        return _getPaidUC;
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