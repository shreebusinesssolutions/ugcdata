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

        this.mode = {};

        this.filter = {
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
            }
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
                console.log("error", response);
                if (response.status == 403) {
                    _this.showNotif("ERROR: You are not authorized. You'll be redirected in 5 secs.", 3000, true);
                    _this.$timeout(function () {
                        window.location.href = "/";
                    }, 5000);
                }
                else {
                    _this.showNotif("ERROR: Something went wrong. Please try again later.", 3000, true);
                }
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
            console.log(_this.filter[filter].selected.indexOf("(Blank)"))
            if (_this.filter[filter].selected.indexOf("(Blank)") >= 0)
                _this.filter[filter].includeBlanks = true;
            else
                _this.filter[filter].includeBlanks = false;
        }
    };
    PaidCtrl.prototype.transformFileNumChip = function (chip) {
        chip
    };
    PaidCtrl.prototype.querySearchFileNum = function (query) {
        var results = query ? this.filter.fileNum.every.filter(createFilterFor(query)) : this.filter.fileNum.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.transformMasterFileNumChip = function (chip) {
        chip
    };
    PaidCtrl.prototype.querySearchMasterFileNum = function (query) {
        var results = query ? this.filter.masterFileNum.every.filter(createFilterFor(query)) : this.filter.masterFileNum.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.transformCollegeChip = function (chip) {
        chip
    };
    PaidCtrl.prototype.querySearchCollege = function (query) {
        var results = query ? this.filter.college.every.filter(createFilterFor(query)) : this.filter.college.every.filter(createFilterFor(''));
        return results;
    };
    PaidCtrl.prototype.transformYearChip = function (chip) {
        chip
    };
    PaidCtrl.prototype.querySearchYear = function (query) {
        var results = query ? this.filter.year.every.filter(createFilterFor(query)) : this.filter.year.every.filter(createFilterFor(''));
        return results;
    };


    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.toLowerCase().indexOf(lowercaseQuery) === 0);
        };

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