var _postUserLogin = require("../handler/POST/user/login/postUserLogin.handler");
var _postUserLoginAuto = require("../handler/POST/user/login/auto/postUserLoginAotu.handler");

var _getDataGlobalCollege = require("../handler/GET/data/global/college/getDataGlobalCollege.handler");
var _getDataGlobalScheme = require("../handler/GET/data/global/scheme/getDataGlobalScheme.handler");
var _getDataGlobalSubScheme = require("../handler/GET/data/global/subscheme/getDataGlobalSubscheme.handler");

var _getDataPaidFilenum = require("../handler/GET/data/paid/filenum/getDataPaidFilenum.handler");
var _getDataPaidMasterfilenum = require("../handler/GET/data/paid/masterfilenum/getDataPaidMasterfilenum.handler");
var _getDataPaidYear = require("../handler/GET/data/paid/year/getDataPaidYear.handler");
var _getDataPaidPaid = require("../handler/GET/data/paid/paid/getDataPaidPaid.handler");
var _getDataPaidUC = require("../handler/GET/data/paid/uc/getDataPaidUC.handler");
var _getDataPaidPlan = require("../handler/GET/data/paid/plan/getDataPaidPlan.handler");

var _getDataPaidReportCount = require("../handler/GET/report/paid/count/getReportPaidCount.handler");
var _getDataPaidReport = require("../handler/GET/report/paid/getReportPaid.handler");

var _getDataPendingAutonum = require("../handler/GET/data/pending/autonum/getDataPendingAutonum.handler");
var _getDataPendingFilenum = require("../handler/GET/data/pending/filenum/getDataPendingFilenum.handler");

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
        return _getDataPaidFilenum;
    else if (method == "GET" && /^\/data\/paid\/masterfilenum\//.test(pathname))
        return _getDataPaidMasterfilenum;
    else if (method == "GET" && /^\/data\/paid\/year\//.test(pathname))
        return _getDataPaidYear;
    else if (method == "GET" && /^\/data\/paid\/paid\//.test(pathname))
        return _getDataPaidPaid;
    else if (method == "GET" && /^\/data\/paid\/uc\//.test(pathname))
        return _getDataPaidUC;
    else if (method == "GET" && /^\/data\/paid\/plan\//.test(pathname))
        return _getDataPaidPlan;

    else if (method == "GET" && /^\/report\/paid\/count\//.test(pathname))
        return _getDataPaidReportCount;
    else if (method == "GET" && /^\/report\/paid\//.test(pathname))
        return _getDataPaidReport;

    else if (method == "GET" && /^\/data\/pending\/autonum\//.test(pathname))
        return _getDataPendingAutonum;
    else if (method == "GET" && /^\/data\/pending\/filenum\//.test(pathname))
        return _getDataPendingFilenum;

    else {
        logger.error(pathname + " (" + method + ") Not found.", { method: "router()" });
        return false;
    }
};