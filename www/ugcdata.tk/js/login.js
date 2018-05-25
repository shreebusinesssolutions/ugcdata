const info = {
    page: "login.html",
    path: "/login/"
};
Object.freeze(info);

$(function () {
    a();

    function a() {
        var pathSvg = $("#path").get(0),
            pathMain = pathSvg.getTotalLength();
        var confirm = $("#confirm").get(0),
            pathConfirm = confirm.getTotalLength();
        var contour = $("#contour").get(0),
            pathContour = contour.getTotalLength();
        var circle = $("#circle").get(0),
            pathCircle = circle.getTotalLength();
        var line = $("#line").get(0),
            pathLine = line.getTotalLength();
        var time = 300;

        $("path").each(function () {
            var path = $(this).get(0),
                pathTotal = path.getTotalLength();

            $(this).css({
                'stroke-dasharray': pathTotal,
                'stroke-dashoffset': pathTotal
            });
        });

        $(".username, .password").on('focusin', function () {
            $(this).parent(".cd-block").addClass('in-focus');
        });

        $(".username, .password").on('focusout', function () {
            $(this).parent(".cd-block").removeClass('in-focus');
        });

        $(".username, .password").on('change keyup', function () {
            ($(this).val() !== '') ? $(this).parent(".cd-block").addClass('typing'): $(this).parent(".cd-block").removeClass('typing');
        });

        $(".username").on('focusin keyup', function () {
            $("#path").animate({
                'stroke-dashoffset': pathMain - $(".username").innerWidth() + 40
            }, time);

            var testre = /^[a-zA-Z0-9_]+$/i;

            if (testre.test(this.value)) {
                document.getElementById("user").style.display = "none";
                $("#confirm").animate({
                    'stroke-dashoffset': 0
                }, time);
            } else {
                setTimeout(function () {
                    document.getElementById("user").style.display = "";
                }, time);
                $("#confirm").animate({
                    'stroke-dashoffset': pathConfirm
                }, time);
            }
        });

        $(".password").on('focusin keyup', function () {
            $("#path").animate({
                'stroke-dashoffset': -(pathMain - $(".username").innerWidth() + 40)
            }, time);

            if ($(this).val() == '') {
                setTimeout(function () {
                    document.getElementById("password_lock").style.display = "";
                }, time);

                $("#contour").animate({
                    'stroke-dashoffset': pathContour
                }, time);
                $("#circle").animate({
                    'stroke-dashoffset': pathCircle
                }, time);
                $("#line").animate({
                    'stroke-dashoffset': pathLine
                }, time);
                $(".password").attr('type', 'password');
            } else {
                document.getElementById("password_lock").style.display = "none";
                $("#contour, #circle").animate({
                    'stroke-dashoffset': 0
                }, time);
            }
        });

        $("#show_password").on('click', function () {
            $(".password").attr('type') === 'password' ?
                ($(".password").attr('type', 'text'), $("#line").animate({
                    'stroke-dashoffset': 0
                }, time)) :
                ($(".password").attr('type', 'password'), $("#line").animate({
                    'stroke-dashoffset': pathLine
                }, time));
        });
    }
});