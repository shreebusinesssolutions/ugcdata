cust_localStorage = {
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

cust_sessionStorage = {
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

Object.freeze(cust_localStorage);
Object.freeze(cust_sessionStorage);