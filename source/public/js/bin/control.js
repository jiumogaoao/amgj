// JavaScript Document
;(function ($, obj, config) {
    /*页面栈*/
    var pageArry=[];
    /*跳页方法*/
    function changePage() {
        /*默认首页*/
        var hash = "page/index";
        /*如果hash有值*/
        if (location.hash) {
            /*获取hash值*/
            hash = location.hash.replace("#", "");
        }
        /*页面状态，0栈没有值，刚进入或刷新，1栈已有值，正向进入，-1回退*/
        var state = 0;/*栈没有值，刚进入或刷新*/
        if(pageArry.length){/*1栈已有值，正向进入*/
            state=1;
        }
        if(state&&hash===_.last(pageArry)){/*回退*/
            state = -1;
        }else{/*不是回退就入栈*/
          pageArry.push(hash);  
        }
        /*过滤hash中的get信息*/
        hash = hash.split("?")[0];
        hash += "/"+state;
        debugger;
        app.view.load(hash);
    }
/*监测hash变化，调用跳页方法*/
    window.addEventListener("hashchange", function () {
        changePage();
    });
    changePage();
    /*回退方法*/
    obj.back = function(){
        /*出栈*/
        pageArry=_.initial(pageArry);
        /*调用栈尾的control*/
        window.location.hash=_.last(pageArry);
    };
})();