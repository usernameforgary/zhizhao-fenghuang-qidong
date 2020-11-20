(function ($, CUMS) {
    "use strict";
    CUMS.UI = CUMS.UI || {};
    var ui = CUMS.UI;

    /**
     * 显示H5加载动画
     * @param msg
     */
    ui.showLoading = function (msg) {
        clearTimeout(ui.dismissTimer);
        if ($('#commonUILoading').length === 0) {
            var html = '<div id="commonUILoading"><div class="commonUI-loading-mask"></div>';
            html += '<div class="commonUI-loading">';
            html += '<div class="commonUI-loadingPic">';
            html += '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#ffffff" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"/></rect></svg>';
            html += '</div>';
            html += '<div class="commonUI-loadingText">加载中...</div>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
        }
        var $el = $('#commonUILoading');
        $el.find('.commonUI-loadingText').text(msg || '加载中...');
        $('body').addClass('commonUI-overflow');
        $el.show();
    };

    /**
     * 隐藏H5加载动画
     */
    ui.dismiss = function () {
        $('#commonUILoading').hide();
        $('body').removeClass('commonUI-overflow');
    };

    /**
     * 延迟隐藏动画
     * @param delay
     */
    ui.dismissTimer = 0;
    ui.dismissDelay = function (delay) {
        if (!delay || delay > 1000) {
            delay = 300;
        }
        ui.dismissTimer = setTimeout(function () {
            UP.W.UI.dismiss();
        }, delay);
    };

    /**
     * 显示H5 Toast提示
     * @param msg
     */var showToast_num=0;
     var commonUIToast,toastTimer;
    ui.showToast = function (msg, time) {
    	 
    	showToast_num++;
        time = time || 800;
      commonUIToast ="commonUIToast"+showToast_num;
        if ($('#'+commonUIToast+'').length === 0) {
            var html = '<div id="'+commonUIToast+'" class="commonUI-toastd">';
            html += '<div class="commonUI-toast-wrapper">';
            html += '<span></span>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
        }
        $('#'+commonUIToast+'').find('span').text(msg);
        // 动画渐显
        $('#'+commonUIToast+'').show();
//      $('#'+commonUIToast+'').removeClass('fadeOut');
        $('#'+commonUIToast+'').addClass('fadeIn');
       
        // 动画渐隐
        setTimeout(function (a) {//找到对应的对象
            $('#'+a+'').removeClass('fadeIn');
            $('#'+a+'').addClass('fadeOut');
            setTimeout(function (b) {
                $('#'+b+'').remove();
            }, 600,a);
        }, time,commonUIToast);
        return $('#'+commonUIToast+'');
    };

    /**
     * 提示/确认对话框
     * @param message 提示消息
     * @param okCallback “确定/知道了”回调
     * @param cancelCallback “取消”回调
     * @param okText “确定/知道了”按钮自定义文本
     * @param cancelText “取消”按钮自定义文本
     * @param titleText “提示” 标题 文本
     */
    ui.showAlert = function (message, okCallback, cancelCallback, okText, cancelText, titleText) {
        if ($('#commonUIAlert').length === 0) {
            var html = '<div id="commonUIAlert" class="commonUI-mask">';
            html += '<div class="commonUI-alert">';
            //头部
            html += '<div class="commonUI-alertTitle">';
            html += '<p>'+titleText+'</p>';
            html += '</div>';
            // 上部
            html += '<div class="commonUI-alertTop">';
            html += '<p></p>';
            html += '</div>';
            // 下部
            html += '<div class="commonUI-alertBottom">';
            html += '<button class="commonUI-alertButton" data-btn="Yes">确定</button>';
            html += '<button class="commonUI-alertButton" data-btn="No">取消</button>';
            html += '<button class="commonUI-alertButton" data-btn="OK">知道了</button>';
            html += '</div>';

            html += '</div>';
            html += '</div>';
            $('body').append(html);
        }

        $('.commonUI-alertButton').unbind().bind('click', function () {
            $el.hide();
            // window.location.href="./src/Course/buke.html"
            $('body').removeClass('commonUI-overflow');
            // 确定点击了哪个按钮，调用对应的回调
            var type = $(this).attr('data-btn');
            if (type === 'Yes' || type === 'OK') {
                if (typeof okCallback === 'function') {
                    okCallback();
                }
            } else if (type === 'No') {
                if (typeof cancelCallback === 'function') {
                    cancelCallback();
                }
            }
        });

        var $el = $('#commonUIAlert');
        if (cancelCallback || cancelText) {
            $el.find('.commonUI-alertButton[data-btn="Yes"]').text(okText || '确定').show();
            $el.find('.commonUI-alertButton[data-btn="No"]').text(cancelText || '取消').show();
            $el.find('.commonUI-alertButton[data-btn="OK"]').hide();
        } else {
            $el.find('.commonUI-alertButton[data-btn="Yes"]').hide();
            $el.find('.commonUI-alertButton[data-btn="No"]').hide();
            $el.find('.commonUI-alertButton[data-btn="OK"]').show(okText || '知道了');
        }
        $el.find('.commonUI-alertTop p').text(message);
        if(message){
            $el.find('.commonUI-alertTop').show();
        } else {
            $el.find('.commonUI-alertTop').hide();
        }
        //头部提示，允许为空串
        if (typeof titleText !== 'undefined') {
            $el.find('.commonUI-alertTitle p').text(titleText);
        } else if (cancelCallback || cancelText) {
            $el.find('.commonUI-alertTitle p').text("确认");
        } else {
            $el.find('.commonUI-alertTitle p').text("提示");
        }

        $('body').addClass('commonUI-overflow');
        $el.show();
    };



    /**h5侧滑
     * @param msg
     */

    ui.swipeLeft = function (element) {
        var expansion = null; //是否存在展开的list
        var container = document.querySelectorAll(element);
        for (var i = 0; i < container.length; i++) {
            var x, y, X, Y, swipeX, swipeY;
            container[i].addEventListener('touchstart', function (event) {
                x = event.changedTouches[0].pageX;
                y = event.changedTouches[0].pageY;
                swipeX = true;
                swipeY = true;
                console.log("滑动开始了");
                if (expansion) {   //判断是否展开，如果展开则收起
                    expansion.className = "";
                }
            });
            container[i].addEventListener('touchmove', function (event) {

                X = event.changedTouches[0].pageX;
                Y = event.changedTouches[0].pageY;
                // 左右滑动
                //逻辑判断：左右滑动的距离大于 上下滑动的距离
                if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
                    // 阻止事件冒泡
                    //冒泡会传递到上一层的父元素

                    event.stopPropagation();
                    if (X - x > 10) {   //右滑
                     console.log("右滑了");
                        event.preventDefault();//阻止事件的默认行为。click事件
                        this.className = "";    //右滑收起
                    }
                    if (x - X > 10) {   //左滑
                        console.log("滑左了");
                        event.preventDefault();
                        this.className = "swipeleft";   //左滑展开
                        expansion = this;
                    }
                    swipeY = false;
                }
                // 上下滑动
                // 逻辑判断：左右滑动的距离小于上下滑动的距离
                if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
                    swipeX = false;
                }
            });
        };
    };
    /*区域联动*/
    ui.areaLink=function(ele){
        var areaLinkHtml="";
        areaLinkHtml+='<div class="areaSelect" id="addBox">';
        areaLinkHtml+='    <div class="grayLayer"></div>';
        areaLinkHtml+='    <div class="content">';
        areaLinkHtml+='    <div class="btnBar">';
        areaLinkHtml+='    <div class="fixWidth">';
        areaLinkHtml+='    <div class="cancel" id="cancel">取消</div>';
        areaLinkHtml+='    <div class="title">选择城市</div>';
        areaLinkHtml+='    <div class="ensure" id="ensure">确认</div>';
        areaLinkHtml+='    </div>';
        areaLinkHtml+='    </div>';
        areaLinkHtml+='    <p class="addArea" id="addArea">';
        areaLinkHtml+='    <span id="province"></span><span id="city" ></span><span id="country"></span></p>';
        areaLinkHtml+='<div class="fixWidth">';
        areaLinkHtml+='    <ul class="select" id="selectProvince">';
        areaLinkHtml+='    </ul>';
        areaLinkHtml+='    <ul class="select" id="selectCity" style="display:none;">';
        areaLinkHtml+='    </ul>';
        areaLinkHtml+='    <ul class="select" id="selectCountry" style="display:none;">';
        areaLinkHtml+='   </ul>';
        areaLinkHtml+='    </div>';
        areaLinkHtml+='    </div>';
        areaLinkHtml+='    </div>';
        $("#"+ele).on("click",function(){
            $.ajax({
                type: "get",
                url: "../vipMember/searchProvince",
                dataType: "json",
                success: function (R) {
                    $("#selectProvince").empty();
                    var data = JSON.parse(analyze(R));
                    var str="";
                    for(var j=0;j<data.length;j++){
                        str+='<li data-id="'+data[j].id+'">'+data[j].name+'</li>';
                    }
                    $("body").append(areaLinkHtml);
                    $("#addBox").addClass("areaSelect-show");
                    $("#selectProvince").html(str);
                }
            });
        });

        $("body").on("click","#selectProvince li",function(){
            var id= $(this).attr("data-id");
            $(this).addClass("active").siblings().removeClass("active");
            $("#province").text($(this).text()+" ");
            $("#city").text("请选择").addClass("tip").siblings().removeClass("tip");
            $("#province").addClass("active").siblings().removeClass("active");
            $.ajax({
                type: "get",
                url: "../vipMember/searchCity",
                data: {id: id},
                dataType: "json",
                success: function (R) {
                    var data = JSON.parse(analyze(R));
                    var str="";
                    for(var j=0;j<data.length;j++){
                        str+='<li data-id="'+data[j].id+'">'+data[j].name+'</li>';
                    }
                    $("#selectProvince").hide();
                    $("#selectCity").html(str).show();
                }
            });
        });
        $("body").on("click","#selectCity li",function(){
            var id= $(this).attr("data-id");
            $(this).addClass("active").siblings().removeClass("active");
            $("#city").text($(this).text()+" ");
            $("#country").text("请选择").addClass("tip").siblings().removeClass("tip");
            $("#city").addClass("active").siblings().removeClass("active");
            $.ajax({
                type: "get",
                url: "../vipMember/searchCountry",
                data: {id: id},
                dataType: "json",
                success: function (R) {
                    var data = JSON.parse(analyze(R));
                    var str="";
                    for(var j=0;j<data.length;j++){
                        str+='<li data-id="'+data[j].id+'">'+data[j].name+'</li>';
                    }
                    $("#selectCity").hide();
                    $("#selectCountry").html(str).show();
                }
            });
        });


        $("body").on("click","#selectCountry li",function(){
            var id= $(this).attr("data-id");
            $(this).addClass("active").siblings().removeClass("active");
            $("#country").text($(this).text());
            $("#country").removeClass("tip");
            $("#country").addClass("active").siblings().removeClass("active");
        });
        /*弹框取消*/
        $("body").on("click","#cancel",function(){
            $("#addBox").removeClass("areaSelect-show");
        });
        ;
        $("body").on("click","#ensure",function(){
            var proText=$("#province").text();
            var cityText=$("#city").text();
            var counText=$("#country").text();

            if( proText!=""&&cityText!=""&&counText!=""){
                if(cityText!="请选择"&&counText!="请选择"){
                    var text="";
                    text +=$("#addArea").find("span").text();
                    $("#area").text(text);
                    $("#addBox").removeClass("areaSelect-show");
                }
            }
        });
        /*省-市-区导航*/
        $("body").on("click","#city",function(){
            $("#selectCity").show();
            $("#selectCity").siblings().hide();
            $("#city").addClass("active");
            $("#city").siblings().removeClass("active");
        });
        $("body").on("click","#country",function(){
            $("#selectCountry").show();
            $("#selectCountry").siblings().hide();
            $("#country").addClass("active");
            $("#country").siblings().removeClass("active");

        });
        $("body").on("click","#province",function(){
            $("#selectProvince").show();
            $("#selectProvince").siblings().hide();
            $("#province").addClass("active");
            $("#province").siblings().removeClass("active");

        });
    };
    /*添加游客*/
    ui.addLinkPerson=function(ele){

    };
    /*选择日期*/
    ui.calendar=function(ele,mNum, okCallback, cancelCallback, titleText,left){
        var selectDate="";
        var flag="true";
        if ($('#dateSelectBox').length === 0) {
            var calendarHtml = '<div class="dateSelect" id="dateSelectBox">';
            calendarHtml += '    <div class="grayLayer"></div>';
            calendarHtml += '    <div class="content">';
            calendarHtml += '    <div class="btnBar">';
            calendarHtml += '    <div class="cancel" id="dateSelectCancel" class="calenButton" data-btn="No">取消</div>';
            calendarHtml += '    <div class="title">'+titleText+'</div>';
            calendarHtml += '    <div class="ensure" id="dateSelectEnsure" class="calenButton" data-btn="Yes">确认</div>';
            calendarHtml += '    </div>';
            calendarHtml += '    <div class="fixWidth">';
            calendarHtml += '    <ul class="week-list list">';
            calendarHtml += '    <li class="red">日</li>';
            calendarHtml += '    <li>一</li>';
            calendarHtml += '    <li>二</li>';
            calendarHtml += '    <li>三</li>';
            calendarHtml += '    <li>四</li>';
            calendarHtml += '    <li>五</li>';
            calendarHtml += '    <li class="red">六</li>';
            calendarHtml += '    </ul>';
            calendarHtml += '    <div id="dateList" class="dateList">';
            calendarHtml += '    </div>';
            calendarHtml += '    </div>';
            calendarHtml += '    </div>';
            calendarHtml += '    </div>';
            $('body').append(calendarHtml);
        }

        getDateList();
        $(".calenButton").unbind().bind("click",function(event){
            // 确定点击了哪个按钮，调用对应的回调
            var type = $(this).attr('data-btn');
            if (type === 'Yes' || type === 'OK') {
                if (typeof okCallback === 'function') {
                    okCallback();
                }
            } else if (type === 'No') {
                if (typeof cancelCallback === 'function') {
                    cancelCallback();
                }
            }
        });
        $("ul.list li").unbind().bind("click",function(event){
            if($(this).is(".grey") || $(this).is(".none")){
                return;
            }else{
                if($(this).is(".today")){
                    $(this).find("i").html("今日");
                    $(this).addClass("goday");
                    $(this).parent().siblings().find("span").parent().removeClass("goday");
                    var temp=$(this).parent().siblings().find("span").text();
                    if(temp=="出发日"){
                        $(this).parent().siblings().find("span").remove();
                    }
                    $(this).siblings().find("span").parent().removeClass("goday");
                    var temp=$(this).siblings().find("span").text();
                    if(temp=="出发日"){
                        $(this).siblings().find("span").remove();
                    }
                    var year=$(this).attr("data-year");
                    var month=$(this).attr("data-mounth");
                    var  month1=getMonth(month);
                    var date=$(this).attr("data-date");
                    selectDate=year+"-"+month1+"-"+date;
                }else{
                    $(this).addClass("goday");
                    $(this).append("<span>出发日</span>");
                    $(this).parent().siblings().find("span").parent().removeClass("goday");
                    $(this).siblings().removeClass("goday");
                    $(this).parent().siblings().find("i").parent().removeClass("goday");
                    $(this).parent().siblings().removeClass("goday");
                    var temp=$(this).parent().siblings().find("span").text();
                    if(temp=="出发日"){
                        $(this).parent().siblings().find("span").remove();
                    }
                    $(this).siblings().find("span").parent().removeClass("goday");
                    var temp=$(this).siblings().find("span").text();
                    if(temp=="出发日"){
                        $(this).siblings().find("span").remove();
                    }

                    var year=$(this).attr("data-year");
                    var month=$(this).attr("data-mounth");
                    var  month1=getMonth(month);
                    var date=$(this).attr("data-date");
                    selectDate=year+"-"+month1+"-"+date;
                }
            }
        });

        $("body").on("click","#dateSelectCancel",function(){
            $("#dateSelectBox").removeClass("dateSelect-show");
            /*$("#dataPlay").text();*/
            $("#dataPlay").find("#cyDate").text("");
            flag=false;
        });
        $("body").on("click","#dateSelectEnsure",function(){
            if(selectDate==""){
                ui.showToast("请选择出发日期",300);
                return;
            }else{
                $("#dataPlay").find("#cyDate").text(selectDate);
                flag=false;
                $("#dateSelectBox").removeClass("dateSelect-show");
            }

        });
        $("#"+ele).on("click",function(){
            if(flag=="true"){
                flag=false;
                $("#dateSelectBox").addClass("dateSelect-show");
            }else{
                $("#dateSelectBox").addClass("dateSelect-show");
            }
        });

        function getFirstWeekDay(nowYear,nowMonth){
            return new Date(Date.UTC(nowYear,nowMonth-1,1)).getDay();
        }
        function getDayCount(nowYear,nowMonth){
            var count;
            if (/^(1|3|5|7|8|10|12)$/.test(nowMonth)) {
                count=31;
            }else if (/^(4|6|9|11)$/.test(nowMonth)) {
                count=30;
            }else if (/^2$/.test(nowMonth)) {
                if (nowYear % 4 === 0 && nowYear % 100 !==0 || nowYear % 400 === 0) {
                    count=29;
                }
                else {
                    count=28;
                }
            }else {
                throw new Error('month is illegal');
            }
            return count;
        }
        function getMonth(month){
            var month1;
            if(month<10){
                month1="0"+month;
            }else{
                month1=month;
            }
            return month1;
        }
        function getDateList(){
            // 初始化时间
            $("#dateList").empty();
            var now = new Date();
            var nowYear = now.getFullYear();//年
            var nowMonth = parseInt(now.getMonth()) + 1;//月
            var nowDate=now.getDate();//日
            var dateHtml="";
            //从今日起未来的mNum个月都可以买票
            for(var m=0;m<nowMonth+mNum;m++){
                var month=nowMonth+m;
                /* var month1;
                10之前的月份加上0，凑齐双位数
                if(month<10){
                    month1="0"+month;
                }else{
                    month1=month;
                }*/
               var  month1=getMonth(month);
                var title=nowYear+"-"+month1;
                dateHtml += '<p class="dateSelect-title title" >'+title+'</p>';
                dateHtml += '<ul class="dateSelect-list list" >';
                //获得月的天数
                var count=getDayCount(nowYear,month);
                //获得月的第一天是周几
                var week=getFirstWeekDay(nowYear,month);
                var grayHtml="";
                for(var i=0;i<week;i++){
                    grayHtml+='<li class="none">&nbsp;&nbsp;&nbsp;&nbsp;</li>';
                }
                var lightHtml="";
                //遍历月的所有天数
                for(var i=1;i<=count;i++){

                    //当前时间所在月份
                    if(m==0){
                        if(nowDate==i){
                            lightHtml+='<li class="today" data-date="'+i+'" data-mounth="'+month+'" data-year="'+nowYear+'">'+i+'<i>今日</i></li>';
                        }else if(nowDate>i){
                            lightHtml+='<li class="grey" disabled="disabled">'+i+'</li>';
                        }else{
                            var mm=i+week-1;
                            if(mm%7==0 || mm%7==6){
                                lightHtml+='<li class="red" data-date="'+i+'" data-mounth="'+month+'" data-year="'+nowYear+'">'+i+'</li>';
                            }else{
                                lightHtml+='<li data-date="'+i+'" data-mounth="'+month+'" data-year="'+nowYear+'">'+i+'</li>';
                            }

                        }
                    }else{
                        var mm=i+week-1;
                        if(mm%7==0 || mm%7==6){
                            lightHtml+='<li class="red" data-date="'+i+'" data-mounth="'+month+'" data-year="'+nowYear+'">'+i+'</li>';
                        }else{
                            lightHtml+='<li  data-date="'+i+'" data-mounth="'+month+'" data-year="'+nowYear+'">'+i+'</li>';
                        }
                    }

                }
                dateHtml+=grayHtml+lightHtml;
                dateHtml+='</ul>';
            }
            $("#dateList").append(dateHtml);
        }
    };

})(window.Zepto || window.jQuery, window.CUMS = window.CUMS || {});