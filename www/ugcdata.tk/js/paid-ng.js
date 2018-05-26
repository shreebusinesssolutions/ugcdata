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
                every: null
            }
        };
        this.filter = {
            masterFileNum: {
                selected: [],
                selectedItem: null,
                search: "",
                every: null
            }
        };

        var _this = this;
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/filenum/"
            }).then(function successCallback(response) {
                _this.filter.fileNum.every = response.data;
            }, function errorCallback(response) {
                console.log("error", response);
            });
        }, 100);
        this.$timeout(function () {
            _this.$http({
                method: "GET",
                url: "/ugc_serv/data/paid/filenum/"
            }).then(function successCallback(response) {
                _this.filter.masterFileNum.every = response.data;
            }, function errorCallback(response) {
                console.log("error", response);
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
    PaidCtrl.prototype.clearSearchFileNumber = function () {
        this.filter.fileNum.search = "";
    };
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
    PaidCtrl.prototype.transformFileNumChip = function (chip) {
        chip
    };
    PaidCtrl.prototype.querySearchFileNum = function (query) {
        var results = query ? this.filter.fileNum.every.filter(createFilterFor(query)) : [];
        return results;
    };
    PaidCtrl.prototype.transformMasterFileNumChip = function (chip) {
        chip
    };
    PaidCtrl.prototype.querySearchMasterFileNum = function (query) {
        var results = query ? this.filter.masterFileNum.every.filter(createFilterFor(query)) : [];
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