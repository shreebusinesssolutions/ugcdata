var _postUserLogin = require("../handler/POST/user/login/postUserLogin.handler");
var _postUserLoginAuto = require("../handler/POST/user/login/auto/postUserLoginAotu.handler");

var _getDataGlobalCollege = require("../handler/GET/data/global/college/getDataGlobalCollege.handler");
var _getDataGlobalScheme = require("../handler/GET/data/global/scheme/getDataGlobalScheme.handler");
var _getDataGlobalSubScheme = require("../handler/GET/data/global/subscheme/getDataGlobalSubscheme.handler");

var _getDataPaidFilenum = require("../handler/GET/data/paid/filenum/getDataPaidFilenum.handler");
var _getDataPaidMasterfilenum = require("../handler/GET/data/paid/masterfilenum/getDataPaidMasterfilenum.handler");
var _getDataPaidYear = require("../handler/GET/data/paid/year/getDataPaidYear.handler");
var _getDataPaidPaid = require("../handler/GET/data/paid/paid/getDataPaidPaid.handler");
var _getDataPaidUc = require("../handler/GET/data/paid/uc/getDataPaidUc.handler");
var _getDataPaidPlan = require("../handler/GET/data/paid/plan/getDataPaidPlan.handler");
var _getDataPaidEntrynum = require("../handler/GET/data/paid/entrynum/getDataPaidEntrynum.handler");

var _getReportPaidCount = require("../handler/GET/report/paid/count/getReportPaidCount.handler");
var _getReportPaid = require("../handler/GET/report/paid/getReportPaid.handler");

var _getDataPendingAutonum = require("../handler/GET/data/pending/autonum/getDataPendingAutonum.handler");
var _getDataPendingFilenum = require("../handler/GET/data/pending/filenum/getDataPendingFilenum.handler");
var _getDataPendingMasterfilenum = require("../handler/GET/data/pending/masterfilenum/getDataPendingMasterfilenum.handler");
var _getDataPendingRemarks = require("../handler/GET/data/pending/remarks/getDataPendingRemarks.handler");
var _getDataPendingSanctiondate = require("../handler/GET/data/pending/sanctiondate/getDataPendingSanctiondate.handler");
var _getDataPendingPaid = require("../handler/GET/data/pending/paid/getDataPendingPaid.handler");
var _getDataPendingUc = require("../handler/GET/data/pending/uc/getDataPendingUc.handler");
var _getDataPendingPendinguc = require("../handler/GET/data/pending/pendinguc/getDataPendingPendinguc.handler");
var _getDataPendingYear = require("../handler/GET/data/pending/year/getDataPendingYear.handler");
var _getDataPendingEntrynum = require("../handler/GET/data/pending/entrynum/getDataPendingEntrynum.handler");

var _getReportPendingCount = require("../handler/GET/report/pending/count/getReportPendingCount.handler");
var _getReportPending = require("../handler/GET/report/pending/gerReportPending.handler");

var _getDatatableCollege = require("../handler/GET/datatable/college/getDatatableCollege.handler");
var _getDatatableCollegeCount = require("../handler/GET/datatable/college/count/getDatatableCollegeCount.handler");

var _getCollege = require("../handler/GET/college/getCollege.handler");
var _putCollege = require("../handler/PUT/college/putCollege.handler");
var _postCollege = require("../handler/POST/college/postCollege.handler");

var _getReportdataPaid = require("../handler/GET/reportdata/paid/getReportdataPaid.handler");
var _putReportdataPaid = require("../handler/PUT/reportdata/paid/putReportdataPaid.handler");
var _postReportdataPaid = require("../handler/POST/reportdata/paid/postReportdataPaid.handler");

var _getReportdataPending = require("../handler/GET/reportdata/pending/getReportdataPending.handler");
var _putReportdataPending = require("../handler/PUT/reportdata/pending/putReportdataPending.handler");

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
        return _getDataPaidUc;
    else if (method == "GET" && /^\/data\/paid\/plan\//.test(pathname))
        return _getDataPaidPlan;
    else if (method == "GET" && /^\/data\/paid\/entrynum\//.test(pathname))
        return _getDataPaidEntrynum;

    else if (method == "GET" && /^\/report\/paid\/count\//.test(pathname))
        return _getReportPaidCount;
    else if (method == "GET" && /^\/report\/paid\//.test(pathname))
        return _getReportPaid;

    else if (method == "GET" && /^\/data\/pending\/autonum\//.test(pathname))
        return _getDataPendingAutonum;
    else if (method == "GET" && /^\/data\/pending\/filenum\//.test(pathname))
        return _getDataPendingFilenum;
    else if (method == "GET" && /^\/data\/pending\/masterfilenum\//.test(pathname))
        return _getDataPendingMasterfilenum;
    else if (method == "GET" && /^\/data\/pending\/remarks\//.test(pathname))
        return _getDataPendingRemarks;
    else if (method == "GET" && /^\/data\/pending\/sanctiondate\//.test(pathname))
        return _getDataPendingSanctiondate;
    else if (method == "GET" && /^\/data\/pending\/paid\//.test(pathname))
        return _getDataPendingPaid;
    else if (method == "GET" && /^\/data\/pending\/uc\//.test(pathname))
        return _getDataPendingUc;
    else if (method == "GET" && /^\/data\/pending\/pendinguc\//.test(pathname))
        return _getDataPendingPendinguc;
    else if (method == "GET" && /^\/data\/pending\/year\//.test(pathname))
        return _getDataPendingYear;
    else if (method == "GET" && /^\/data\/pending\/entrynum\//.test(pathname))
        return _getDataPendingEntrynum;

    else if (method == "GET" && /^\/report\/pending\/count\//.test(pathname))
        return _getReportPendingCount;
    else if (method == "GET" && /^\/report\/pending\//.test(pathname))
        return _getReportPending;

    else if (method == "GET" && /^\/datatable\/college\/count\//.test(pathname))
        return _getDatatableCollegeCount;
    else if (method == "GET" && /^\/datatable\/college\//.test(pathname))
        return _getDatatableCollege;

    else if (method == "GET" && /^\/college/.test(pathname))
        return _getCollege;
    else if (method == "PUT" && /^\/college\//.test(pathname))
        return _putCollege;
    else if (method == "POST" && /^\/college\//.test(pathname))
        return _postCollege;

    else if (method == "GET" && /^\/reportdata\/paid/.test(pathname))
        return _getReportdataPaid;
    else if (method == "PUT" && /^\/reportdata\/paid\//.test(pathname))
        return _putReportdataPaid;
    else if (method == "POST" && /^\/reportdata\/paid\//.test(pathname))
        return _postReportdataPaid;

    else if (method == "GET" && /^\/reportdata\/pending/.test(pathname))
        return _getReportdataPending;

    else if (method == "PUT" && /^\/reportdata\/pending/.test(pathname))
        return _putReportdataPending;
    
    else {
        logger.error(pathname + " (" + method + ") Not found.", { method: "router()" });
        return false;
    }
};