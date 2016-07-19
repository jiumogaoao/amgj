(function() {
    window.app = {};
    /********************通用**********************/
    app.readFn = {};
    $(document).ready(function() {
        $.each(app.readFn, function(index, fn) {
            fn();
        });
    });
    /*是否IE*/
    function isIE() {
        var userAgent = navigator.userAgent;
        //取得浏览器的userAgent字符串
        var iIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
        //判断是否IE浏览器
        if (iIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp('$1'));
            return fIEVersion;
        } else {
            return false;
        }
    }
    /*是否手机*/
    function is_mobileA() {
        var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini)/i;
        var u = navigator.userAgent;
        if (null == u) {
            return true;
        }
        var result = regex_match.exec(u);
        if (null == result) {
            return false;
        } else {
            return true;
        }
    }
    var is_mobile = is_mobileA();
    /********************自适应**********************/
    var myScroll = {
        refresh: function() {}
    };
    app.scrollFn = {};
    app.scrollObj = {};
    app.scrollAdd = function(target,fn,rsfn) {
        if (!(isIE() && isIE() < 9)) {
                app.scrollObj[target.attr("id")] = new IScroll(target[0],{
                    probeType: 3,
                    mouseWheel: !is_mobile,
                    scrollbars: !is_mobile,
                    click: true,
                    bounce: is_mobile
                });
                app.scrollObj[target.attr("id")].on('scroll', function() {
                    var that = this;
                    if(fn){fn(that);}
                });
            
            $("img").unbind("load").bind("load", function() {
                $.each(app.scrollObj, function(id, obj) {
                    obj.refresh();
                });
            });
        }else{
            target.css("overflow","auto");
            app.scrollObj[target.attr("id")].refresh=function(){};
        }
        app.resizeFn["sc_"+target.attr("id")]=function(){
            if(rsfn){
                rsfn();
            }
            app.scrollObj[target.attr("id")].refresh();
        };
    };
    /*自适应处理*/
    app.resizeFn={};
    app.resizeFn.defaule=function(){
        var showSize = 1;
        if (is_mobile) {
            showSize = $(window).width() / 750;
            $("html,body").width(750);
            $("body").addClass("phone");
            $("body").removeClass("browser");
        } else {
            if ($(window).width() < 1200 && $(window).width() > 750) {
                $("html,body").width(1200);
                showSize = $(window).width() / 1200;
                $("body").addClass("browser");
                $("body").removeClass("phone");
            } else if ($(window).width() <= 750) {
                $("html,body").width(750);
                showSize = $(window).width() / 750;
                $("body").addClass("phone");
                $("body").removeClass("browser");
            } else {
                $("html,body").width("100%");
                $("body").addClass("browser");
                $("body").removeClass("phone");
            }
        }
        
        if (isIE() && isIE() < 9) {
            $("body").css({
                "zoom": showSize
            });
        } else {
            $("html").css({
                "-webkit-transform": "scale(" + showSize + ")",
                "transform": "scale(" + showSize + ")"
            });
        }
    };
    /*先执行一次*/
    app.readFn.resize = app.resizeFn.defaule;
    /*屏幕有变动的时候再执行*/
    $(window).on("resize", function(){
        $.each(app.resizeFn,function(i,n){
            n();
        });
    });
    /****兼容****/
    var android = function() {
        var u = window.navigator.userAgent;
        var num;
        //移动端
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            //android
            num = u.substr(u.indexOf('Android') + 8, 3);
            return num;
        } else {
            return false;
        }
    };
    if (android()) {
        var v = android().split(".");
        if (Number(v[0]) <= 4 && Number(v[1]) < 4) {}
    }
})();