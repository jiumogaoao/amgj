(function(){
    app.view={};
    /*新旧页面重置*/
    function pageChange(){
        $("#oldPage").attr("id","hidePage");
                        $("#hidePage").attr("style","");
                        $("#newPage").attr("id","oldPage");
                        $("#oldPage").attr("style","");
                        $("#hidePage").attr("id","newPage");
                        $("#newPage").remove();
    }
app.view.show={
    show:function(state){/*显隐渐变，正反向一样*/
                    $("#oldPage").attr("style","transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 1000ms;opacity: 0;");
                    segestDelay=setTimeout(function(){
                        pageChange();
                    },1000);
            },
            side:function(state){/*侧滑*/
                if(state===1){/*正向*/
                    $("#newPage").attr("style","z-index:3;transform:translate(100%, 0px) translateZ(0px)");
                    segestDelay=setTimeout(function(){
                        $("#newPage").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, 0px) translateZ(0px)","opacity": 1});
                        segestDelay=setTimeout(function(){
                            pageChange();
                        },1000);
                    },50);
                }else{/*回退*/
                    $("#newPage").attr("style","opacity: 1;");
                    $("#oldPage").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(100%, 0px) translateZ(0px)","opacity": 0});
                    segestDelay=setTimeout(function(){
                        pageChange();
                    },1000);
                }
            },
            top:function(state){/*上下*/
                if(state===1){/*正向*/
                    $("#newPage").attr("style","z-index:3;transform:translate(0px, -100%) translateZ(0px);opacity: 0");
                    segestDelay=setTimeout(function(){
                    $("#newPage").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, 0px) translateZ(0px)","opacity": 1});
                    segestDelay=setTimeout(function(){
                        pageChange();
                    },1000);
                    },50);
                }else{/*回退*/
                    $("#newPage").attr("style","opacity: 1;");
                    segestDelay=setTimeout(function(){
                    $("#oldPage").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"translate(0px, -100%) translateZ(0px)","opacity": 0});
                    segestDelay=setTimeout(function(){
                        pageChange();
                    },1000);
                    },50);
                }
            },
            size:function(state){/*缩放*/
                if(state===1){/*正向*/
                    $("#newPage").attr("style","z-index:3;transform: scale(0.1);opacity: 0;");
                    segestDelay=setTimeout(function(){
                    $("#newPage").css({"transition-timing-function": "cubic-bezier(0.5, 0.1, 0.5, 1)", "transition-duration": "1000ms","transform":"scale(1)","opacity": 1,"z-index":3});
                    segestDelay=setTimeout(function(){
                        pageChange();
                    },1000);
                },50);  
                }else{/*回退*/
                    $("#newPage").attr("style","opacity: 1;");
                    $("#oldPage").css({"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)", "transition-duration": "1000ms","transform":"scale(0.1)","opacity": 0});
                    segestDelay=setTimeout(function(){
                        pageChange();
                    },1000);
                }
            }
};

app.view.load=function(url){
    $("#all").append('<div id="newPage"></div>');
    $.ajax({
        url: url,
        cache: false,
        dataType:"html",
        success: function(html){
            $("#newPage").html(html);
        } 
    });
};
})();
