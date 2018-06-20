var CollegeCtrl = (function () {
    function CollegeCtrl($scope, $mdDialog, $mdToast, $timeout, $http) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$timeout = $timeout;
        this.$http = $http;
        this.primary = 'blue';
        this.accent = 'red';
        this.white = 'white';

        this.selectedTabIndex = 0;

        this.mode = {
            report: {
                getting: false,
                loaded: false
            },
            edit: {
                saving: false
            },
            add: {
                checkingCollegeId: false,
                saving: false
            }
        };

        this.filter = {
            college: {
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

        this.edit = {
            collegeId: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null,
            },
            oldCollegeId: null,
            collegeName: null,
            address1: null,
            address2: null,
            pin: null,
            pfmsCode: null,
            naacValidity: null,
            bsrInterest: null
        };

        this.add = {
            collegeId: null,
            oldCollegeId: null,
            collegeName: null,
            address1: null,
            address2: null,
            pin: null,
            pfmsCode: null,
            naacValidity: null,
            bsrInterest: null
        };

        var _this = this;
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/global/college/"
            }).then(function successCallback(response) {
                _this.filter.college.every = response.data;
                if (response.data.indexOf("(Blank)") >= 0)
                    _this.filter.college.hasBlanks = true;
                _this.edit.collegeId.every = response.data;
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }, 100);
    }

    CollegeCtrl.prototype.showNotif = function (message, timeout = 3000, errorToast = false) {
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
    CollegeCtrl.prototype.showAlert = function (title, content, okText = "OK", confirmCallback = function () { }) {
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
    CollegeCtrl.prototype.showConfirm = function (title, content, okText = "OK", cancelText = "Cancel", confirmCallback = function () { }, cancelCallback = function () { }) {
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
    CollegeCtrl.prototype.openMenu = function ($$mdMenu, $$event) {
        $$mdMenu.open($$event);
    };

    CollegeCtrl.prototype.transformCollegeChip = function (chip) {
        return chip;
    };
    CollegeCtrl.prototype.querySearchCollege = function (query) {
        var results = query ? this.filter.college.every.filter(createFilterFor(query)) : this.filter.college.every.filter(createFilterFor(''));
        return results;
    };

    CollegeCtrl.prototype.getReport = function (min, max) {
        var _this = this;
        _this.mode.report.getting = true;
        _this.mode.report.loaded = false;
        _this.$http({
            method: "GET",
            url: "/ugc_serv/datatable/college/count/?collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
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
                            url: "/ugc_serv/datatable/college/?collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
                                + "&limit=" + _this.reportData.limit.min + ";,;" + _this.reportData.limit.max
                        }).then(function successCallback(response) {
                            if ($.fn.dataTable.isDataTable('#dataTable')) {
                                console.log("Destrying", dtTable);
                                dtTable.destroy(true);
                                document.getElementById("divDataTable").innerHTML = '\
                                    <table id="dataTable" class="table table-striped table-bordered compact hover order-column" style="width:100%">\
                                        <thead>\
                                            <tr>\
                                                <th>College ID</th>\
                                                <th>Old College ID</th>\
                                                <th>Name</th>\
                                                <th>Address 1</th>\
                                                <th>Address 2</th>\
                                                <th>PIN</th>\
                                                <th>PFMS Unique Code</th>\
                                                <th>NAAC Validity</th>\
                                                <th>BSR Interest Paid and Interest</th>\
                                            </tr>\
                                        </thead>\
                                        <tfoot>\
                                            <tr>\
                                                <th>College ID</th>\
                                                <th>Old College ID</th>\
                                                <th>Name</th>\
                                                <th>Address 1</th>\
                                                <th>Address 2</th>\
                                                <th>PIN</th>\
                                                <th>PFMS Unique Code</th>\
                                                <th>NAAC Validity</th>\
                                                <th>BSR Interest Paid and Interest</th>\
                                            </tr>\
                                        </tfoot>\
                                    </table>';
                            }
                            _this.$timeout(function () {
                                $.fn.dataTable.moment("DD-MMM-YYYY");
                                dtTable = $('#dataTable').DataTable({
                                    deferRender: true,
                                    lengthMenu: [50, 100],
                                    destroy: true,
                                    fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                        $(nRow).on('click', function () {
                                            scope = angular.element(document.getElementById("ng-app")).scope();
                                            scope.$apply(function () {
                                                scope.vm.edit.collegeId.selected = [aData[0]];
                                                scope.vm.edit.oldCollegeId = aData[1];
                                                scope.vm.edit.collegeName = aData[2];
                                                scope.vm.edit.address1 = aData[3];
                                                scope.vm.edit.address2 = aData[4];
                                                scope.vm.edit.pin = aData[5];
                                                scope.vm.edit.pfmsCode = aData[6];
                                                scope.vm.edit.naacValidity = new Date(aData[7]);
                                                scope.vm.edit.bsrInterest = aData[8];
                                                scope.vm.selectedTabIndex = 1;
                                            })
                                        });
                                    },
                                    dom: 'lfBrtip',
                                    buttons: [
                                        {
                                            extend: 'excel',
                                            text: 'Save as Excel'
                                        },
                                        {
                                            extend: 'csv',
                                            text: 'Save as CSV'
                                        },
                                        {
                                            extend: 'print',
                                            text: 'Print all (manual)',
                                            autoPrint: false
                                        },
                                        {
                                            extend: 'print',
                                            text: 'Print current page',
                                            exportOptions: {
                                                modifier: {
                                                    page: 'current'
                                                }
                                            }
                                        }
                                    ]
                                });
                                //dtTable.buttons().container().appendTo($('.col-sm-6:eq(0)', dtTable.table().container()));
                                console.log(response.data.data.length);
                                if (response.data.data.length == 0)
                                    _this.showAlert("No more data", "No more data to fetch.");
                                for (var i = 0; i < response.data.data.length; i++) {
                                    if (response.data.data[i][7])
                                        response.data.data[i][7] = moment(response.data.data[i][7]).format("DD-MMM-YYYY");
                                    dtTable.row.add(response.data.data[i]).draw(false);
                                }
                                console.log("row click not working 1");
                                // $('#dataTable').on('click', 'tr', function () {
                                //     //console.log(dtTable.row(this).data());
                                //     console.log("hi");
                                // });
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
                    url: "/ugc_serv/datatable/college/?collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
                        + "&limit=" + _this.reportData.limit.min + ";,;" + _this.reportData.limit.max
                }).then(function successCallback(response) {
                    if ($.fn.dataTable.isDataTable('#dataTable')) {
                        console.log("Destrying", dtTable);
                        dtTable.destroy(true);
                        document.getElementById("divDataTable").innerHTML = '\
                            <table id="dataTable" class="table table-striped table-bordered compact hover order-column" style="width:100%">\
                                <thead>\
                                    <tr>\
                                        <th>College ID</th>\
                                        <th>Old College ID</th>\
                                        <th>Name</th>\
                                        <th>Address 1</th>\
                                        <th>Address 2</th>\
                                        <th>PIN</th>\
                                        <th>PFMS Unique Code</th>\
                                        <th>NAAC Validity</th>\
                                        <th>BSR Interest Paid and Interest</th>\
                                    </tr>\
                                </thead>\
                                <tfoot>\
                                    <tr>\
                                        <th>College ID</th>\
                                        <th>Old College ID</th>\
                                        <th>Name</th>\
                                        <th>Address 1</th>\
                                        <th>Address 2</th>\
                                        <th>PIN</th>\
                                        <th>PFMS Unique Code</th>\
                                        <th>NAAC Validity</th>\
                                        <th>BSR Interest Paid and Interest</th>\
                                    </tr>\
                                </tfoot>\
                            </table>';
                    }
                    _this.$timeout(function () {
                        $.fn.dataTable.moment("DD-MMM-YYYY");
                        dtTable = $('#dataTable').DataTable({
                            deferRender: true,
                            lengthMenu: [50, 100],
                            destroy: true,
                            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                $(nRow).on('click', function () {
                                    scope = angular.element(document.getElementById("ng-app")).scope();
                                    scope.$apply(function () {
                                        scope.vm.edit.collegeId.selected = [aData[0]];
                                        scope.vm.edit.oldCollegeId = aData[1];
                                        scope.vm.edit.collegeName = aData[2];
                                        scope.vm.edit.address1 = aData[3];
                                        scope.vm.edit.address2 = aData[4];
                                        scope.vm.edit.pin = aData[5];
                                        scope.vm.edit.pfmsCode = aData[6];
                                        scope.vm.edit.naacValidity = new Date(aData[7]);
                                        scope.vm.edit.bsrInterest = aData[8];
                                        scope.vm.selectedTabIndex = 1;
                                    })
                                });
                            },
                            dom: 'lfBrtip',
                            buttons: [
                                {
                                    extend: 'excel',
                                    text: 'Save as Excel'
                                },
                                {
                                    extend: 'csv',
                                    text: 'Save as CSV'
                                },
                                {
                                    extend: 'print',
                                    text: 'Print all (manual)',
                                    autoPrint: false
                                },
                                {
                                    extend: 'print',
                                    text: 'Print current page',
                                    exportOptions: {
                                        modifier: {
                                            page: 'current'
                                        }
                                    }
                                }
                            ]
                        });
                        //dtTable.buttons().container().appendTo($('.col-sm-6:eq(0)', dtTable.table().container()));
                        console.log(response.data.data.length);
                        for (var i = 0; i < response.data.data.length; i++) {
                            if (response.data.data[i][7])
                                response.data.data[i][7] = moment(response.data.data[i][7]).format("DD-MMM-YYYY");
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
    CollegeCtrl.prototype.loadMore = function () {
        var _this = this;
        _this.mode.report.getting = true;
        _this.mode.report.loaded = true;
        _this.reportData.limit.min += _this.reportData.maxChunkSize;
        _this.reportData.limit.max += _this.reportData.maxChunkSize;
        console.log(_this.reportData);
        _this.$http({
            method: "GET",
            url: "/ugc_serv/datatable/college/?collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
                + "&limit=" + _this.reportData.limit.min + ";,;" + _this.reportData.limit.max
        }).then(function successCallback(response) {
            console.log(response.data.data.length);
            if (response.data.data.length == 0)
                _this.showAlert("No more data", "No more data to fetch.");
            for (var i = 0; i < response.data.data.length; i++) {
                dtTable.row.add(response.data.data[i]).draw(false);
            }
            _this.mode.report.getting = false;
            _this.mode.report.loaded = true;
        }, function errorCallback(response) {
            _this.mode.report.getting = false;
            _this.mode.report.loaded = true;
            _this.httpResponseError(response);
        });
    };

    CollegeCtrl.prototype.transformEditCollegeIdChip = function (chip) {
        return chip;
    };
    CollegeCtrl.prototype.querySearchEditCollegeId = function (query) {
        var results = query ? this.edit.collegeId.every.filter(createFilterFor(query)) : this.edit.collegeId.every.filter(createFilterFor(''));
        return results;
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

    CollegeCtrl.prototype.editCollegeIdChanged = function () {
        var _this = this;
        if (_this.edit.collegeId.selected.length == 0) {
            _this.edit.oldCollegeId = null;
            _this.edit.collegeName = null;
            _this.edit.address1 = null;
            _this.edit.address2 = null;
            _this.edit.pin = null;
            _this.edit.pfmsCode = null;
            _this.edit.naacValidity = null;
            _this.edit.bsrInterest = null;
        }
        else {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/college?college_id=" + _this.edit.collegeId.selected[0]
            }).then(function successCallback(response) {
                _this.edit.oldCollegeId = response.data.oldCollegeId ? response.data.oldCollegeId : "";
                _this.edit.collegeName = response.data.collegeName ? response.data.collegeName : "";
                _this.edit.address1 = response.data.address1 ? response.data.address1 : "";
                _this.edit.address2 = response.data.address2 ? response.data.address2 : "";
                _this.edit.pin = response.data.pin ? response.data.pin : "";
                _this.edit.pfmsCode = response.data.pfmsCode ? response.data.pfmsCode : "";
                _this.edit.naacValidity = response.data.naacValidity ? new Date(response.data.naacValidity) : null;
                _this.edit.bsrInterest = response.data.bsrInterest ? response.data.bsrInterest : "";
            }, function errorCallback(response) {
                _this.httpResponseError(response);
            });
        }
    };
    CollegeCtrl.prototype.editSave = function () {
        var _this = this;
        _this.mode.edit.saving = true;
        _this.$http({
            method: "PUT",
            url: "/ugc_serv/college/",
            data: {
                collegeId: _this.edit.collegeId.selected[0],
                oldCollegeId: _this.edit.oldCollegeId ? _this.edit.oldCollegeId : null,
                collegeName: _this.edit.collegeName,
                address1: _this.edit.address1,
                address2: _this.edit.address2,
                pin: _this.edit.pin,
                pfmsCode: _this.edit.pfmsCode ? _this.edit.pfmsCode : null,
                naacValidity: _this.edit.naacValidity ? moment(_this.edit.naacValidity).format("YYYY-MM-DD") : null,
                bsrInterest: _this.edit.bsrInterest ? _this.edit.bsrInterest : null
            }
        }).then(function successCallback(response) {
            _this.showNotif("College data updated successfully.");
            _this.mode.edit.saving = false;
        }, function errorCallback(response) {
            _this.httpResponseError(response);
            _this.mode.edit.saving = false;
        });
    };

    CollegeCtrl.prototype.addCollege = function () {
        var _this = this;
        _this.mode.add.saving = true;
        _this.$http({
            method: "POST",
            url: "/ugc_serv/college/",
            data: {
                collegeId: _this.add.collegeId,
                oldCollegeId: _this.add.oldCollegeId ? _this.add.oldCollegeId : "null",
                collegeName: _this.add.collegeName,
                address1: _this.add.address1,
                address2: _this.add.address2,
                pin: _this.add.pin,
                pfmsCode: _this.add.pfmsCode ? _this.add.pfmsCode : "null",
                naacValidity: _this.add.naacValidity ? moment(_this.add.naacValidity).format("YYYY-MM-DD") : "null",
                bsrInterest: _this.add.bsrInterest ? _this.add.bsrInterest : "null"
            }
        }).then(function successCallback(response) {
            _this.showNotif("College added successfully.");
            _this.mode.add.saving = false;
        }, function errorCallback(response) {
            _this.httpResponseError(response);
            _this.mode.add.saving = false;
        });
    };

    CollegeCtrl.prototype.httpResponseError = function (response) {
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
    };

    CollegeCtrl.$inject = [
        '$scope',
        '$mdDialog',
        '$mdToast',
        '$timeout',
        '$http'
    ];
    return CollegeCtrl;
}());

angular
    .module('CollegeApp', [
        'ngMaterial',
        'ngMessages'
    ])
    .controller('CollegeCtrl', CollegeCtrl)
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
    .directive('ngCustvalidatorCollegeid', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    if (/^[A-Z0-9]+$/.test(value)) {
                        scope.vm.mode.add.checkingCollegeId = true;
                        scope.vm.$http({
                            method: "GET",
                            url: "/ugc_serv/college?college_id=" + value
                        }).then(function successCallback(response) {
                            ngModel.$setValidity("college-id-exists", false);
                            scope.vm.mode.add.checkingCollegeId = false;
                        }, function errorCallback(response) {
                            if (response.status == 404 && /^[A-Z0-9]+ Not Found$/.test(response.statusText))
                                ngModel.$setValidity("college-id-exists", true);
                            else
                                scope.vm.httpResponseError(response);
                            scope.vm.mode.add.checkingCollegeId = false;
                        });
                    }
                    return value;
                });
            }
        }
    })
    .config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD-MMM-YYYY');
        }
    })
    .run(function ($http) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + cust_localStorage.getItem("token");
        $http.defaults.headers.common['username'] = cust_localStorage.getItem("username");
    });