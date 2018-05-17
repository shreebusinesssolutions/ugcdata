$(window).ready(function () {
    if (cust_localStorage.getItem("token") && cust_localStorage.getItem("username")) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                switch (this.status) {
                    case 200:
                        if (info.page == "login.html")
                            window.location.href = "/main";
                        break;
                    default:
                        window.location.href = "/";
                        cust_localStorage.removeItem("token");
                        break;
                }
            }
        };
        xhr.open("POST", "/ugc_serv/user/login/auto/");
        xhr.send(JSON.stringify({
            username: cust_localStorage.getItem("username"),
            token: cust_localStorage.getItem("token")
        }));
    } else {
        if (info.page != "login.html")
            window.location.href = "/";
    }
});

const cust_localStorage = {
    setItem: function (key, value) {
        if (typeof (Storage) !== "undefined") {
            window.localStorage.setItem(key, value);
        } else {
            window.location.href = "/outdated";
        }
    },
    getItem: function (key, value) {
        if (typeof (Storage) !== "undefined") {
            return window.localStorage.getItem(key, value);
        } else {
            window.location.href = "/outdated";
        }
    },
    removeItem: function (key) {
        if (typeof (Storage) !== "undefined") {
            window.localStorage.removeItem(key);
        } else {
            window.location.href = "/outdated";
        }
    }
};

const cust_sessionStorage = {
    setItem: function (key, value) {
        if (typeof (Storage) !== "undefined") {
            window.sessionStorage.setItem(key, value);
        } else {
            window.location.href = "/outdated";
        }
    },
    getItem: function (key, value) {
        if (typeof (Storage) !== "undefined") {
            return window.sessionStorage.getItem(key, value);
        } else {
            window.location.href = "/outdated";
        }
    },
    removeItem: function (key) {
        if (typeof (Storage) !== "undefined") {
            window.sessionStorage.removeItem(key);
        } else {
            window.location.href = "/outdated";
        }
    }
};