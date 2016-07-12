(function(){
    window.app={};
    /********************通用**********************/
app.readFn={}
    $(document).ready(function(){
        $.each(app.readFn,function(index,fn){
            fn();
        });
    });
/*是否IE*/
function isIE(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var iIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 ; //判断是否IE浏览器
    if (iIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        return fIEVersion;
    }else{
        return false;
        }
    }
/*是否手机*/
function is_mobile() {  
var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini)/i;  
var u = navigator.userAgent;  
if (null == u) {  
return true;  
}  
var result = regex_match.exec(u);  
if (null == result) {  
return false  
} else {  
return true  
}  
}
var is_mobile=is_mobile();
/********************自适应**********************/
var myScroll={
    refresh:function(){}
    }
app.scrollFn={}
var scrollObj={};
if(!(isIE()&&isIE()<9)){
$(".wrap").each(function(){
    scrollObj[$(this).attr("id")]=new IScroll('#'+$(this).attr("id"), { probeType: 3, mouseWheel: !is_mobile ,scrollbars: !is_mobile,click: true,bounce:is_mobile});
    scrollObj[$(this).attr("id")].on('scroll', function(){
    var that=this;
    $.each(app.scrollFn,function(i,f){
        f(that);
    });
     });
});
$("img").on("load",function(){
    $.each(scrollObj,function(id,obj){
        obj.refresh();
    });
});
     
}
/*自适应处理*/
    function resize(){
        var showSize = 1;
        if(is_mobile){
            showSize = $(window).width()/750;
            $("html,body").width(750);
            $("body").addClass("phone");
            $("body").removeClass("browser");
            }else{
            if($(window).width()<1200&&$(window).width()>750){
            $("html,body").width(1200);
            showSize = $(window).width()/1200;
            $("body").addClass("browser");
            $("body").removeClass("phone");
            }else if($(window).width()<=750){
                $("html,body").width(750);
                showSize = $(window).width()/750;
                $("body").addClass("phone");
                $("body").removeClass("browser");
                }else{
                    $("html,body").width("100%");
                    $("body").addClass("browser");
                    $("body").removeClass("phone");
                    }
            }
    $(".wrap").height($(window).height()/showSize);
    if(isIE()&&isIE()<9){
        $("body").css({
        "zoom":showSize
        });
        $(".wrap").css("overflow","auto");
        $(".wrap").width($(window).width()/showSize);
        }else{
        $("html").css({
        "-webkit-transform":"scale("+showSize+")",
        "transform":"scale("+showSize+")"
        }); 
        myScroll.refresh();
            }
    }
    /*先执行一次*/
    app.readFn.resize=resize;
    /*屏幕有变动的时候再执行*/
    $(window).on("resize",resize);
    /****兼容****/
var android =function(){
      var u = window.navigator.userAgent;
      var num ;
        //移动端
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
          //android
          num = u.substr(u.indexOf('Android') + 8, 3);
          return num;
        }else{
          return false;
        }
    }

if(android()){
  var v=android().split(".");
  if(Number(v[0])<=4&&Number(v[1])<4){

  }
}

})();