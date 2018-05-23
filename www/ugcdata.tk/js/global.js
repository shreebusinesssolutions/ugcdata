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
    includeTemplate();

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
Object.freeze(cust_localStorage);

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
Object.freeze(cust_sessionStorage);

const includeTemplate = function () {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByClassName("su-template-holder");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("su-include-template");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var respObj = JSON.parse(this.responseText);
                        elmnt.innerHTML = respObj.content.join("\n");
                        respObj.class_list.forEach(function (ele) {
                            elmnt.classList.add(ele);
                        });
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute("su-include-template");
                    includeTemplate();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    activateRipple();
};

const activateRipple = function () {
    var $ripple = $('.js-ripple');
    $ripple.on('click.ui.ripple', function (e) {
        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.c-ripple__circle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
            top: y + 'px',
            left: x + 'px'
        });

        $this.addClass('is-active');
    });
    $ripple.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function (e) {
        $(this).removeClass('is-active');
    });
};

const sideBar = {
    open: function () {
        var sidebar = document.getElementById("sideBar"),
            overlay = document.getElementsByClassName("w3-overlay")[0],
            hamburger = document.getElementsByClassName("hamburger")[0];
        hamburger.classList.add("is-active");
        sidebar.style.display = "block";
        overlay.style.display = "block";
        hamburger.style.left = "260px";
    },
    close: function () {
        var sidebar = document.getElementById("sideBar"),
            overlay = document.getElementsByClassName("w3-overlay")[0],
            hamburger = document.getElementsByClassName("hamburger")[0];
        hamburger.classList.remove("is-active");
        sidebar.style.display = "none";
        overlay.style.display = "none";
        hamburger.style.left = "10px";
    },
    toggle: function () {
        var sidebar = document.getElementById("sideBar"),
            overlay = document.getElementsByClassName("w3-overlay")[0],
            hamburger = document.getElementsByClassName("hamburger")[0];
        if (sidebar.style.display == "block")
            sideBar.close();
        else
            sideBar.open();
    }
};
Object.freeze(sideBar);

const toggleAccordian = function (caller, called) {
    var callerEle = document.getElementById(caller);
    var calledEle = document.getElementById(called);
    var faIcon = callerEle.getElementsByClassName("accordian-icon")[0];
    if (calledEle.classList.contains("w3-hide")) {
        calledEle.classList.remove("w3-hide");
        faIcon.classList.remove("fa-chevron-down");
        faIcon.classList.add("fa-chevron-up");
    } else {
        calledEle.classList.add("w3-hide");
        faIcon.classList.add("fa-chevron-down");
        faIcon.classList.remove("fa-chevron-up");
    }
};