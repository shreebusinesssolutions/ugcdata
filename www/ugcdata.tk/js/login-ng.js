var LoginCtrl = (function() {
    function LoginCtrl($scope, $mdDialog, $mdToast, $timeout) {
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.$timeout = $timeout;
        this.primary = 'blue';
        this.accent = 'red';
        this.white = 'white';

        this.login = {
            username: "",
            password: ""
        };
    }

    LoginCtrl.prototype.showNotif = function(message, timeout = 3000, errorToast = false) {
        var _this = this;
        if (!errorToast) {
            var toast = _this.$mdToast.simple()
                .textContent(message)
                .action('Close')
                .highlightAction(true)
                .highlightClass('md-accent')
                .position("bottom left")
                .hideDelay(timeout);

            _this.$mdToast.show(toast).then(function(response) {
                if (response == 'ok') {
                    //alert('You clicked the \'UNDO\' action.');
                }
            });
            setTimeout(function() {
                document.getElementsByTagName("md-toast")[0].style.position = "fixed";
                document.getElementsByTagName("md-toast")[0].style.zIndex = "297";
            }, 50);
        } else {
            var toast = _this.$mdToast.simple()
                .textContent(message)
                .action('Close')
                .highlightAction(true)
                .highlightClass('md-warn')
                .position("bottom left")
                .hideDelay(timeout);

            _this.$mdToast.show(toast).then(function(response) {
                if (response == 'ok') {
                    //alert('You clicked the \'UNDO\' action.');
                }
            });
            setTimeout(function() {
                document.getElementsByTagName("md-toast")[0].style.position = "fixed";
                document.getElementsByTagName("md-toast")[0].style.zIndex = "297";
            }, 50);
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
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
        $mdThemingProvider.theme('dark')
            .primaryPalette('yellow').dark()
            .accentPalette('yellow').dark();
        $mdThemingProvider.theme('dark-primary').backgroundPalette('blue').dark();
        $mdThemingProvider.theme('dark-accent').backgroundPalette('red').dark();
    });