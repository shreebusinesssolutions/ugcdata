var PaidCtrl = (function () {
    function PaidCtrl($scope, $mdDialog, $mdToast, $timeout, $http) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$timeout = $timeout;
        this.$http = $http;
        this.primary = 'blue';
        this.accent = 'red';
        this.white = 'white';

        this.mode = {
            report: {
                getting: false,
                loaded: false
            }
        };

        this.filter = {
            use_or: false,
            fileNum: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
                hasBlanks: false,
                includeBlanks: false
            },
            masterFileNum: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
                hasBlanks: false,
                includeBlanks: false
            },
            college: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
                hasBlanks: false,
                includeBlanks: false
            },
            year: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
                hasBlanks: false,
                includeBlanks: false
            },
            paid: {
                scaleMin: null,
                scaleMax: null,
                min: null,
                max: null
            },
            uc: {
                scaleMin: null,
                scaleMax: null,
                min: null,
                max: null
            },
            scheme: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
                hasBlanks: false,
                includeBlanks: false
            },
            subScheme: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
                hasBlanks: false,
                includeBlanks: false
            },
            plan: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
                hasBlanks: false,
                includeBlanks: false
            }
        };

        this.reportData = {
            totalCount: null,
            maxChunkSize: 1000,
            limit: {
                min: null,
                max: null
            },
            data: []
        };

        var _this = this;
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/filenum/"
            }).then(function successCallback(response) {
                _this.filter.fileNum.every = response.data;
                if (response.data.indexOf("(Blank)") >= 0)
                    _this.filter.fileNum.hasBlanks = true;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/masterfilenum/"
            }).then(function successCallback(response) {
                _this.filter.masterFileNum.every = response.data;
                if (response.data.indexOf("(Blank)") >= 0)
                    _this.filter.masterFileNum.hasBlanks = true;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/college/"
            }).then(function successCallback(response) {
                _this.filter.college.every = response.data;
                if (response.data.indexOf("(Blank)") >= 0)
                    _this.filter.college.hasBlanks = true;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/year/"
            }).then(function successCallback(response) {
                _this.filter.year.every = response.data;
                if (response.data.indexOf("(Blank)") >= 0)
                    _this.filter.year.hasBlanks = true;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/paid/"
            }).then(function successCallback(response) {
                _this.filter.paid.scaleMin = response.data.min;
                _this.filter.paid.scaleMax = response.data.max;
                _this.filter.paid.min = response.data.min;
                _this.filter.paid.max = response.data.max;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/uc/"
            }).then(function successCallback(response) {
                _this.filter.uc.scaleMin = response.data.min;
                _this.filter.uc.scaleMax = response.data.max;
                _this.filter.uc.min = response.data.min;
                _this.filter.uc.max = response.data.max;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/scheme/"
            }).then(function successCallback(response) {
                _this.filter.scheme.every = response.data;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/subscheme/"
            }).then(function successCallback(response) {
                _this.filter.subScheme.every = response.data;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/plan/"
            }).then(function successCallback(response) {
                _this.filter.plan.every = response.data;
                if (response.data.indexOf("(Blank)") >= 0)
                    _this.filter.plan.hasBlanks = true;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
    }

    PaidCtrl.prototype.showNotif = function (message, timeout = 3000, errorToast = false) {
        var _this = this;
        var toast = null;
        if (!errorToast) {
            toast = _this.$mdToast.simple()
                .textContent(message)
                .action('Close')
                .highlightAction(true)
                .highlightClass('md-accent')
                .position("bottom left")
                .hideDelay(timeout);

            _this.$mdToast.show(toast).then(function (response) {
                if (response == 'ok') {
                    //alert('You clicked the \'UNDO\' action.');
                }
            });
            setTimeout(function () {
                document.getElementsByTagName("md-toast")[0].style.position = "fixed";
                document.getElementsByTagName("md-toast")[0].style.zIndex = "297";
            }, 50);
        } else {
            (timeout < 9000) ? (timeout = 9000) : (timeout = timeout + 1);
            toast = _this.$mdToast.simple()
                .textContent("ERROR: " + message)
                .position("bottom left")
                .hideDelay(timeout);

            _this.$mdToast.show(toast).then(function (response) {
                if (response == 'ok') {
                    //alert('You clicked the \'UNDO\' action.');
                }
            });
            setTimeout(function () {
                document.getElementsByTagName("md-toast")[0].style.position = "fixed";
                document.getElementsByTagName("md-toast")[0].style.zIndex = "297";
            }, 50);
        }
    };
    PaidCtrl.prototype.showAlert = function (title, content, okText = "OK", confirmCallback = function () { }) {
        var _this = this;
        var alert = _this.$mdDialog.alert({
            title: title,
            textContent: content,
            ok: okText,
            ariaLabel: "Alert Dialog",
        });
        _this.$mdDialog.show(alert).then(function () {
            confirmCallback();
        })
    };
    PaidCtrl.prototype.showConfirm = function (title, content, okText = "OK", cancelText = "Cancel", confirmCallback = function () { }, cancelCallback = function () { }) {
        var _this = this;
        var confirm = _this.$mdDialog.confirm({
            title: title,
            textContent: content,
            ariaLabel: "Confirm Dialog",
            ok: okText,
            cancel: cancelText
        });
        _this.$mdDialog.show(confirm).then(function () {
            confirmCallback();
        }, function () {
            cancelCallback();
        });
    };
    PaidCtrl.prototype.openMenu = function ($$mdMenu, $$event) {
        $$mdMenu.open($$event);
    };
    // PaidCtrl.prototype.clearSearchFileNumber = function () {
    //     this.filter.fileNum.search = "";
    // };
    // PaidCtrl.prototype.loadFileNumbers = function () {
    //     var _this = this;
    //     return _this.$http({
    //         method: "GET",
    //         url: "/ugc_serv/data/paid/filenum/"
    //     }).then(function successCallback(response) {
    //         _this.filter.fileNum.every = response.data;
    //     }, function errorCallback(response) {
    //         console.log("error", response);
    //     });
    // }
    PaidCtrl.prototype.toggleBlanks = function (filter) {
        var _this = this;
        if (_this.filter[filter].hasBlanks) {
            if (_this.filter[filter].includeBlanks)
                _this.filter[filter].selected.push("(Blank)");
            else
                _this.filter[filter].selected.splice(_this.filter[filter].selected.indexOf("(Blank)"), 1);
        }
    };
    PaidCtrl.prototype.filterChanged = function (filter) {
        var _this = this;
        if (_this.filter[filter].hasBlanks) {
            if (_this.filter[filter].selected.indexOf("(Blank)") >= 0)
                _this.filter[filter].includeBlanks = true;
            else
                _this.filter[filter].includeBlanks = false;
        }
    };
    PaidCtrl.prototype.transformFileNumChip = function (chip) {
        return chip
    };
    PaidCtrl.prototype.querySearchFileNum = function (query) {
        var results = query ? this.filter.fileNum.every.filter(createFilterFor(query)) : this.filter.fileNum.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.transformMasterFileNumChip = function (chip) {
        return chip
    };
    PaidCtrl.prototype.querySearchMasterFileNum = function (query) {
        var results = query ? this.filter.masterFileNum.every.filter(createFilterFor(query)) : this.filter.masterFileNum.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.transformCollegeChip = function (chip) {
        return chip
    };
    PaidCtrl.prototype.querySearchCollege = function (query) {
        var results = query ? this.filter.college.every.filter(createFilterFor(query)) : this.filter.college.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.transformYearChip = function (chip) {
        return chip
    };
    PaidCtrl.prototype.querySearchYear = function (query) {
        var results = query ? this.filter.year.every.filter(createFilterFor(query)) : this.filter.year.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.transformSchemeChip = function (chip) {
        return chip.id
    };
    PaidCtrl.prototype.querySearchScheme = function (query) {
        var results = query ? this.filter.scheme.every.filter(createFilterObjFor(query)) : this.filter.scheme.every.filter(createFilterObjFor(''));
        return results;
    };
    PaidCtrl.prototype.transformSubSchemeChip = function (chip) {
        return chip.id
    };
    PaidCtrl.prototype.querySearchSubScheme = function (query) {
        var results = query ? this.filter.subScheme.every.filter(createFilterObjFor(query)) : this.filter.subScheme.every.filter(createFilterObjFor(''));
        return results;
    };
    PaidCtrl.prototype.transformPlanChip = function (chip) {
        return chip
    };
    PaidCtrl.prototype.querySearchPlan = function (query) {
        var results = query ? this.filter.plan.every.filter(createFilterFor(query)) : this.filter.plan.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.getReport = function (min, max) {
        var _this = this;
        _this.mode.report.getting = true;
        _this.mode.report.loaded = false;
        _this.$http({
            method: "GET",
            url: "/ugc_serv/report/paid/count/?use_or=" + decodeURI(_this.filter.use_or)
                + "&fileNum=" + decodeURI(_this.filter.fileNum.selected.join(";,;"))
                + "&masterFileNum=" + decodeURI(_this.filter.masterFileNum.selected.join(";,;"))
                + "&collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
                + "&year=" + decodeURI(_this.filter.year.selected.join(";,;"))
                + "&paid=" + decodeURI(_this.filter.paid.min) + ";,;" + decodeURI(_this.filter.paid.max)
                + "&uc=" + decodeURI(_this.filter.uc.min) + ";,;" + decodeURI(_this.filter.uc.max)
                + "&scheme=" + decodeURI(_this.filter.scheme.selected.join(";,;"))
                + "&subScheme=" + decodeURI(_this.filter.subScheme.selected.join(";,;"))
                + "&plan=" + decodeURI(_this.filter.plan.selected.join(";,;"))
        }).then(function successCallback(response) {
            _this.reportData.totalCount = response.data;
            _this.reportData.limit.min = 0;
            _this.reportData.limit.max = _this.reportData.maxChunkSize;
            if (_this.reportData.totalCount > _this.reportData.maxChunkSize) {
                _this.showConfirm(
                    "Too much data.",
                    "The data you tried to fetch has " + _this.reportData.totalCount + " entries. Try to modify your filter to produce more sharp results or the data will be fetched in chunks of " + _this.reportData.maxChunkSize + ". Proceed?",
                    "Yes (fetch data in chunks)",
                    "No (Modify filter)",
                    function () {
                        _this.$http({
                            method: "GET",
                            url: "/ugc_serv/report/paid/?use_or=" + decodeURI(_this.filter.use_or)
                                + "&fileNum=" + decodeURI(_this.filter.fileNum.selected.join(";,;"))
                                + "&masterFileNum=" + decodeURI(_this.filter.masterFileNum.selected.join(";,;"))
                                + "&collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
                                + "&year=" + decodeURI(_this.filter.year.selected.join(";,;"))
                                + "&paid=" + decodeURI(_this.filter.paid.min) + ";,;" + decodeURI(_this.filter.paid.max)
                                + "&uc=" + decodeURI(_this.filter.uc.min) + ";,;" + decodeURI(_this.filter.uc.max)
                                + "&scheme=" + decodeURI(_this.filter.scheme.selected.join(";,;"))
                                + "&subScheme=" + decodeURI(_this.filter.subScheme.selected.join(";,;"))
                                + "&plan=" + decodeURI(_this.filter.plan.selected.join(";,;"))
                                + "&limit=" + _this.reportData.limit.min + ";,;" + _this.reportData.limit.max
                        }).then(function successCallback(response) {
                            if ($.fn.dataTable.isDataTable('#dataTable')) {
                                console.log("Destrying", dtTable);
                                dtTable.destroy(true);
                                document.getElementById("divDataTable").innerHTML = '<table id="dataTable" class="table table-striped table-bordered compact hover order-column" style="width:100%">\
                                        <thead>\
                                            <tr>\
                                                <th>Entry Num</th>\
                                                <th>File Num</th>\
                                                <th>Master File Num</th>\
                                                <th>College ID</th>\
                                                <th>Year</th>\
                                                <th>Paid</th>\
                                                <th>UC</th>\
                                                <th>Scheme ID</th>\
                                                <th>Sub-scheme ID</th>\
                                                <th>Plan Files</th>\
                                            </tr>\
                                        </thead>\
                                        <tfoot>\
                                            <tr>\
                                                <th>Entry Num</th>\
                                                <th>File Num</th>\
                                                <th>Master File Num</th>\
                                                <th>College ID</th>\
                                                <th>Year</th>\
                                                <th>Paid</th>\
                                                <th>UC</th>\
                                                <th>Scheme ID</th>\
                                                <th>Sub-scheme ID</th>\
                                                <th>Plan Files</th>\
                                            </tr>\
                                        </tfoot>\
                                    </table>';
                            }
                            _this.$timeout(function () {
                                dtTable = $('#dataTable').DataTable({
                                    "deferRender": true,
                                    "lengthMenu": [50, 100],
                                    "destroy": true
                                });
                                // var oSettings = $('.dataTable').dataTable().fnSettings();
                                // var iTotalRecords = oSettings.fnRecordsTotal();
                                // for (i = 0; i <= iTotalRecords; i++) {
                                //     console.log(i);
                                //     $('.dataTable').dataTable().fnDeleteRow(0, null, true);
                                // }
                                console.log(response.data.data.length);
                                if (response.data.data.length == 0)
                                    _this.showAlert("No more data", "No more data to fetch.");
                                for (var i = 0; i < response.data.data.length; i++) {
                                    dtTable.row.add(response.data.data[i]).draw(false);
                                }
                                _this.mode.report.getting = false;
                                _this.mode.report.loaded = true;
                            }, 1000);
                        }, function errorCallback(response) {
                            _this.mode.report.getting = false;
                            _this.mode.report.loaded = false;
                            _this.httpResponseError(response);
                        });
                    },
                    function () {
                        _this.mode.report.getting = false;
                        _this.mode.report.loaded = false;
                        if (document.getElementById("filter_section").classList.contains("w3-hide"))
                            toggleAccordian("filter", "filter_section");
                    }
                );
            }
            else {
                _this.mode.report.getting = true;
                _this.mode.report.loaded = false;
                _this.$http({
                    method: "GET",
                    url: "/ugc_serv/report/paid/?use_or=" + decodeURI(_this.filter.use_or)
                        + "&fileNum=" + decodeURI(_this.filter.fileNum.selected.join(";,;"))
                        + "&masterFileNum=" + decodeURI(_this.filter.masterFileNum.selected.join(";,;"))
                        + "&collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
                        + "&year=" + decodeURI(_this.filter.year.selected.join(";,;"))
                        + "&paid=" + decodeURI(_this.filter.paid.min) + ";,;" + decodeURI(_this.filter.paid.max)
                        + "&uc=" + decodeURI(_this.filter.uc.min) + ";,;" + decodeURI(_this.filter.uc.max)
                        + "&scheme=" + decodeURI(_this.filter.scheme.selected.join(";,;"))
                        + "&subScheme=" + decodeURI(_this.filter.subScheme.selected.join(";,;"))
                        + "&plan=" + decodeURI(_this.filter.plan.selected.join(";,;"))
                        + "&limit=" + _this.reportData.limit.min + ";,;" + _this.reportData.maxChunkSize
                }).then(function successCallback(response) {
                    if ($.fn.dataTable.isDataTable('#dataTable')) {
                        console.log("Destrying", dtTable);
                        dtTable.destroy(true);
                        document.getElementById("divDataTable").innerHTML = '<table id="dataTable" class="table table-striped table-bordered compact hover order-column" style="width:100%">\
                                <thead>\
                                    <tr>\
                                        <th>Entry Num</th>\
                                        <th>File Num</th>\
                                        <th>Master File Num</th>\
                                        <th>College ID</th>\
                                        <th>Year</th>\
                                        <th>Paid</th>\
                                        <th>UC</th>\
                                        <th>Scheme ID</th>\
                                        <th>Sub-scheme ID</th>\
                                        <th>Plan Files</th>\
                                    </tr>\
                                </thead>\
                                <tfoot>\
                                    <tr>\
                                        <th>Entry Num</th>\
                                        <th>File Num</th>\
                                        <th>Master File Num</th>\
                                        <th>College ID</th>\
                                        <th>Year</th>\
                                        <th>Paid</th>\
                                        <th>UC</th>\
                                        <th>Scheme ID</th>\
                                        <th>Sub-scheme ID</th>\
                                        <th>Plan Files</th>\
                                    </tr>\
                                </tfoot>\
                            </table>';
                    }
                    _this.$timeout(function () {
                        dtTable = $('#dataTable').DataTable({
                            "deferRender": true,
                            "lengthMenu": [50],
                            "destroy": true,
                        });
                        console.log(response.data.data.length);
                        for (var i = 0; i < response.data.data.length; i++) {
                            dtTable.row.add(response.data.data[i]).draw(false);
                        }
                        _this.mode.report.getting = false;
                        _this.mode.report.loaded = true;
                    }, 1000);
                }, function errorCallback(response) {
                    _this.mode.report.getting = false;
                    _this.mode.report.loaded = false;
                    _this.httpResponseError(response);
                });
            }

        }, function errorCallback(response) {
            _this.httpResponseError(response);
        });
    };
    PaidCtrl.prototype.loadMore = function () {
        console.log("hi");
        var _this = scope.vm;
        _this.mode.report.getting = true;
        _this.mode.report.loaded = true;
        _this.reportData.limit.min += _this.reportData.maxChunkSize;
        _this.reportData.limit.max += _this.reportData.maxChunkSize;
        console.log(_this.reportData);
        _this.$http({
            method: "GET",
            url: "/ugc_serv/report/paid/?use_or=" + decodeURI(_this.filter.use_or)
                + "&fileNum=" + decodeURI(_this.filter.fileNum.selected.join(";,;"))
                + "&masterFileNum=" + decodeURI(_this.filter.masterFileNum.selected.join(";,;"))
                + "&collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
                + "&year=" + decodeURI(_this.filter.year.selected.join(";,;"))
                + "&paid=" + decodeURI(_this.filter.paid.min) + ";,;" + decodeURI(_this.filter.paid.max)
                + "&uc=" + decodeURI(_this.filter.uc.min) + ";,;" + decodeURI(_this.filter.uc.max)
                + "&scheme=" + decodeURI(_this.filter.scheme.selected.join(";,;"))
                + "&subScheme=" + decodeURI(_this.filter.subScheme.selected.join(";,;"))
                + "&plan=" + decodeURI(_this.filter.plan.selected.join(";,;"))
                + "&limit=" + _this.reportData.limit.min + ";,;" + _this.reportData.maxChunkSize
        }).then(function successCallback(response) {
            console.log(response.data.data.length);
            if (response.data.data.length == 0)
                _this.showAlert("No more data", "No more data to fetch.");
            for (var i = 0; i < response.data.data.length; i++) {
                dataTable.row.add(response.data.data[i]).draw(false);
            }
            _this.mode.report.getting = false;
            _this.mode.report.loaded = true;
        }, function errorCallback(response) {
            _this.mode.report.getting = false;
            _this.mode.report.loaded = true;
            _this.httpResponseError(response);
        });
    };

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }

    function createFilterObjFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.id.toLowerCase().indexOf(lowercaseQuery) === 0) || (item.name.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }

    PaidCtrl.prototype.httpResponseError = function (response) {
        var _this = this;
        console.log("error", response);
        if (response.status == 403) {
            _this.showNotif("You are not authorized. You'll be redirected in 5 secs.", 3000, true);
            _this.$timeout(function () {
                window.location.href = "/";
            }, 5000);
        }
        else {
            _this.showNotif("Something went wrong. Please try again later.", 3000, true);
        }
    }
    PaidCtrl.$inject = [
        '$scope',
        '$mdDialog',
        '$mdToast',
        '$timeout',
        '$http'
    ];
    return PaidCtrl;
}());

angular
    .module('PaidApp', [
        'ngMaterial',
        'ngMessages'
    ])
    .controller('PaidCtrl', PaidCtrl)
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
        $mdThemingProvider.theme('dark')
            .primaryPalette('yellow').dark()
            .accentPalette('yellow').dark();
        $mdThemingProvider.theme('dark-primary').backgroundPalette('blue').dark();
        $mdThemingProvider.theme('dark-accent').backgroundPalette('red').dark();
    })
    .run(function ($http) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + cust_localStorage.getItem("token");
        $http.defaults.headers.common['username'] = cust_localStorage.getItem("username");
    });