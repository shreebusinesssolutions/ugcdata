var LoginCtrl = (function () {
    function LoginCtrl($scope, $mdDialog, $mdToast, $timeout) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$timeout = $timeout;
        this.primary = 'blue';
        this.accent = 'red';
        this.white = 'white';

        this.mode = {
            loggingIn: false
        };

        this.login = {
            username: "",
            password: ""
        };
    }

    LoginCtrl.prototype.showNotif = function (message, timeout = 3000, errorToast = false) {
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
    LoginCtrl.prototype.loginUser = function () {
        var _this = this;
        loginBtn = document.getElementById("login-btn");
        loginBtn.classList.add("w3-theme-primary-dark");
        _this.mode.loggingIn = true;
        loginIcon = document.getElementById("login-icon");
        loginIcon.classList.remove("fa-sign-in-alt");
        loginIcon.classList.add("fa-circle-notch");
        loginIcon.classList.add("fa-spin");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange == function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log((this.responseText));
                } else if (this.status == 403) {
                    _this.showNotif(message = "Invalid Username and/or Password.", errorToast = true);
                }
                else if(this.status == 500) {
                    _this.showNotif(message = "Something went wrong. Please try again.", errorToast = true);
                }
            }
        }
    };

    LoginCtrl.$inject = [
        '$scope',
        '$mdDialog',
        '$mdToast',
        '$timeout'
    ];
    return LoginCtrl;
}());

angular
    .module('LoginApp', [
        'ngMaterial',
        'ngMessages'
    ])
    .controller('LoginCtrl', LoginCtrl)
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
        $mdThemingProvider.theme('dark')
            .primaryPalette('yellow').dark()
            .accentPalette('yellow').dark();
        $mdThemingProvider.theme('dark-primary').backgroundPalette('blue').dark();
        $mdThemingProvider.theme('dark-accent').backgroundPalette('red').dark();
    });