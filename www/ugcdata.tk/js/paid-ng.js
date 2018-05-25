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
                search: "",
                every: null
            }
        };
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
    PaidCtrl.prototype.loadFileNumbers = function () {
        var _this = this;
        return _this.$http({
            method: "GET",
            url: "/ugc_serv/data/paid/filenum/"
        }).then(function successCallback(response) {
            console.log("success", response);
        }, function errorCallback(response) {
            console.log("error", response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        // return _this.$timeout(function () {
        //     _this.filter.fileNum.every = _this.filter.fileNum.every || [
        //         'Scooby Doo',
        //         'Shaggy Rodgers',
        //         'Fred Jones',
        //         'Daphne Blake',
        //         'Velma Dinkley'
        //     ];
        // }, 650);
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
    });