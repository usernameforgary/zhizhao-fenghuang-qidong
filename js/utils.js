if (typeof window.CUMS != "undefined") {
	var ui = window.CUMS.UI;
}
var uid = 0;
$("input,textarea").on("blur", function () {
	window.scroll(0, 0);
});
//localStorage.setItem("zhizhao_uid",25)
//所有的登录和未登录的状态---uid
if (localStorage.getItem("zhizhao_uid")) {
	uid = parseInt(localStorage.getItem("zhizhao_uid"));
}



console.log("uid=======" + uid)
function goUrl (a) {/*跳转URL*/
	location.href = a + "?" + Math.random();
};
window.addEventListener('pageshow', function () {
	if (sessionStorage.getItem("ifReload")) {
		sessionStorage.removeItem("ifReload");
		window.location.reload();
	}
});
//让页面的高度最低是内容的总高度
var body_height = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
$(".up-page-wrapper").css("min-height", body_height);
$(".toTop").click(function () {/*点击回到顶部*/
	$(".footer").fadeOut("slow", function () {//底部消失
		$(".footer").css("bottom", "-1rem");
		if250F = false;
		if250T = true;
	});
	$('html,body').animate({ scrollTop: '0px' }, 1000);
})
var if250T = true/*scrool<250*/, if250F = true;/*scrool>250*/
var if_lists_model = true;/*模型页面来判断是不是该加载--之后上一次加载完毕后才能加载*/
window.onscroll = function () {
	//	页面的滚动条 滚动事件
	if ($(document).scrollTop() > 250 || $(document).scrollTop() == 0) {
		if ($(document).scrollTop() == 0) {
			$(".toTop").fadeOut();
		} else if (if250T) {
			$(".toTop").fadeIn();
		}
		if (if250T) {
			if250T = false;
			if250F = true;
			$(".footer").css("display", "block");
			$(".footer").animate({
				bottom: 0
			});
		}
	} else {
		$(".toTop").fadeOut();
		if (if250F) {
			$(".footer").fadeOut("slow", function () {
				$(".footer").css("bottom", "-1rem");
				if250F = false;
				if250T = true;
			});
		}
	}

	if (document.getElementsByClassName("video-main")[0]) {
		/*首页--当滚动到视频教程部分--执行动画*/
		if (document.documentElement.clientHeight + $(document).scrollTop() - 180 > $(".video-main")[0].offsetTop) {
			$(".video-main .list").animate({
				"margin-top": 0,
				"opacity": 1
			}, 1000);
		};
	};

	//	if (document.getElementsByClassName("reloadHistory")[0]){
	//		if ($(document).scrollTop()>=$(document).height()-$(window).height()-2) {
	//			
	//			if(if_lists_model){
	//				if_lists_model=false;
	//				ui.showToast( '加载中~');
	//	       		pageindex++;
	//	       		if($('.tab li.active').attr('index')==1){
	//					yiqiandan($("#search").val());
	//				}else if($('.tab li.active').attr('index')==2){
	//					weiqiandan($("#search").val());
	//				}else{
	//					ziyuanku($("#search").val());
	//				}
	//			}
	//		}
	//	}
	//	if (document.getElementsByClassName("adminN_student")[0]){
	//		if ($(document).scrollTop()>=$(document).height()-$(window).height()-2) {
	//			
	//			if(if_lists_model){
	//				if_lists_model=false;
	//				ui.showToast( '加载中~');
	//	       		pageindex++;
	//	       		weiqiandan($("#search").val());
	//			}
	//		}
	//	}
	//	if (document.getElementsByClassName("admin_student")[0]){
	//		if ($(document).scrollTop()>=$(document).height()-$(window).height()-2) {
	//			
	//			if(if_lists_model){
	//				if_lists_model=false;
	//				ui.showToast( '加载中~');
	//	       		pageindex++;
	//	       		yiqiandan($("#search").val());
	//			}
	//		}
	//	}
	if (document.getElementsByClassName("student_history")[0]) {
		if ($(document).scrollTop() >= $(document).height() - $(window).height() - 2) {

			if (if_lists_model) {
				if_lists_model = false;
				ui.showToast('加载中~');
				pageindex++;
				go();
			}
		}
	}
	if (document.getElementsByClassName("tingkeliebiao")[0]) {
		if ($(document).scrollTop() >= $(document).height() - $(window).height() - 2) {

			if (if_lists_model) {
				if_lists_model = false;
				ui.showToast('加载中~');
				pageindex++;
				go();
			}
		}
	}
	if (document.getElementsByClassName("xufeiliebiao")[0]) {
		if ($(document).scrollTop() >= $(document).height() - $(window).height() - 2) {

			if (if_lists_model) {
				if_lists_model = false;
				ui.showToast('加载中~');
				pageindex++;
				yiqiandan();
			}
		}
	}
	if (document.getElementsByClassName("beikeliebiao")[0]) {
		if ($(document).scrollTop() >= $(document).height() - $(window).height() - 2) {

			if (if_lists_model) {
				if_lists_model = false;
				ui.showToast('加载中~');
				pageindex++;
				go();
			}
		}
	}
}




/*下面的是 AJAX的封装*/
function getAjax (_url, ajaxData, callback, tag_name) {
	//下面是AJAX通信 
	//创建
	$.ajax({
		type: "get",
		dataType: "json",
		url: _url,
		data: ajaxData,
		success: function (data) {
			callback(data, tag_name);
		}
	});
}
function postAjax (_url, ajaxData, callback) {
	//下面是AJAX通信 
	//创建
	$.ajax({
		type: "post",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		url: _url,
		data: ajaxData,
		success: function (data) {
			callback(data);
		}
	});
}
function postAjax1 (_url, ajaxData, callback) {
	//下面是AJAX通信 
	//创建
	$.ajax({
		type: "post",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType: "json",
		url: _url,
		data: ajaxData,
		success: function (data) {
			callback(data);
		}
	});
}
function _getAjax (_url, ajaxData, callback) {
	//下面是AJAX通信 
	//创建
	$.ajax({
		type: "get",
		async: false,
		dataType: "json",
		url: _url,
		data: ajaxData,
		success: function (data) {
			callback(data);
		}
	});
}
/*这是--访问后端的主机名*/
//TODO remove before deploy
//var hostAjax = "http://139.224.133.133:8088";//http://121.196.206.172:8060
var hostAjax = "http://139.224.133.133:8084";
var jinbohao = hostAjax;
var hostAjax1 = jinbohao;
var hostAjax2 = jinbohao;/*本地的接口http://192.168.1.108:64639*/
var img_url = "";//img的路径前缀http://192.168.1.108:64639
/*这个是总的方法类*/
var all_function = {
	signature: function (_jsapi_ticket) {//传来_jsapi_ticket
		_timestamp = Math.round(new Date().getTime() / 1000);
		var string1 = "jsapi_ticket=" + _jsapi_ticket + "&noncestr=Wm3WZYTPz0wzccnW&timestamp=" + _timestamp + "&url=" + location.href.split('#')[0];
		_signature = hex_sha1(string1);

		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: 'wx220f1ff8e48f8edb', // 必填，公众号的唯一标识
			timestamp: _timestamp, // 必填，生成签名的时间戳
			nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
			signature: _signature,// 必填，签名
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'hideOptionMenu']// 必填，需要使用的JS接口列表
		});
	},
	wxFenxiang: function () {
		//、、下面的是微信分享功能、、、、、、、、、、、、、、、、、、、、、、、、、、、、
		var _urlWX = hostAjax1 + "/InterfaceUrl/WeiXin/WeiXinService.asmx/WeiXinApi";
		var ajaxData = {};
		//判断token的时间--2小时
		if (localStorage.getItem("token_time")) {
			if ((new Date() - new Date(JSON.parse(localStorage.getItem("token_time"))["time"])) > 7200000) {
				postAjax(_urlWX, ajaxData, callback);
			}
		} else if (localStorage.getItem("token_time") == null) {
			//第一次进
			postAjax(_urlWX, ajaxData, callback);
		}
		if (localStorage.getItem("token_time")) {
			if ((new Date() - new Date(JSON.parse(localStorage.getItem("token_time"))["time"])) < 7200000) {
				//跳过获取token值直接config 微信
				all_function.signature(localStorage.getItem("jsapi_ticket"));
			}
		}
		function callback (data) {
			//	   	JSON.parse(data.d).access_token
			console.log(JSON.parse(data.d).access_token);
			localStorage.setItem("token_time", JSON.stringify({
				time: new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
				token: JSON.parse(data.d).access_token
			}))
			//根据token值获取jsapi的值
			//根据token值获取jsapi的值

			postAjax(hostAjax1 + "/InterfaceUrl/WeiXin/WeiXinService.asmx/GetTicket", JSON.stringify({ access_token: JSON.parse(data.d).access_token }), callback2);
		}
		function callback2 (data) {
			_jsapi_ticket = JSON.parse(data.d).ticket;
			localStorage.setItem("jsapi_ticket", _jsapi_ticket);
			all_function.signature(_jsapi_ticket);
		}
	},
	wxOpenId: function (_code) {
		//、、微信--登录--获取用户信息和openid、、、、、、、、、、、、、、、、、、、、、、、、、、、、
		getAjax(hostAjax + "/api/weixin/v1/access_token?code=" + _code, "", wxOpenIdCallback);
		//判断token的时间--2小时
		function wxOpenIdCallback (data) {
			if (data.Code == 0) {
				console.log(JSON.parse(data.Data).access_token);//获取openid的token
			//	alert(JSON.parse(data.Data).openid)
				localStorage.setItem("zhizhao_openid", JSON.parse(data.Data).openid);
		    	getAjax(hostAjax+"/api/weixin/v1/userinfo?access_token="+JSON.parse(data.Data).access_token+"&openid="+JSON.parse(data.Data).openid,"",openid);//此接口为获取用户信息的接口
				//openId登录
			   	getAjax(hostAjax+"/api/user/v1/wxloginopenid?openid="+JSON.parse(data.Data).openid+"&imgurl="+JSON.parse(data.Data).imgurl+"&nickname="+JSON.parse(data.Data).nickname+"&unionid="+JSON.parse(data.Data).unionid,"",function(){});
				localStorage.setItem("zhizhao_uid1", "预备存留");
				function openid (data) {
					//用户unionid
					//alert(JSON.parse(data.Data).unionid+"||"+JSON.parse(data.Data).openid);
					localStorage.setItem('unionid',JSON.parse(data.Data).unionid);
					console.log("用户id" + data)
				}
			}
		}
	},
	countTime: function (id, times) {
		var timer = null;
		timer = setInterval(function () {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0;//时间默认值
			if (times > 0) {
				//	      day = Math.floor(times / (60 * 60 * 24));
				hour = Math.floor(times / (60 * 60)) - (day * 24);
				minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (day <= 9) day = '0' + day;
			if (hour <= 9) hour = '0' + hour;
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			//alert(day+"天:"+hour+"小时："+minute+"分钟："+second+"秒");
			times--;
			//pk_1v1的倒计时
			$("#" + id).find(".list_content_time p").eq(1).text(hour + ":" + minute + ":" + second + "");
			if (times <= 0) {
				clearInterval(timer);
				//到时间就让比赛取消--调取取消比赛的接口--成功后刷新页面
				postAjax(hostAjax + "/Interface/PKService/PKService.asmx/ServiceUpdataPKState", JSON.stringify({ sPkID: id, iPkstate: 3 }), callback);//0是未开始,1是让他进行,2是让他结束,3是让他无效
				function callback (data) {
					if (data.d.Code == 0) {
						ui.showToast("有比赛已经过期即将刷新页面");
						setTimeout(function () {
							location.reload();
						}, 1000);
					}
				}
				//localStorage.setItem(id,0);//
			}
		}, 1000);

	},
	//带天数的倒计时--都是开始的比赛
	countDown: function (select, times) {
		var timer = null;
		timer = setInterval(function () {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0;//时间默认值
			if (times > 0) {
				day = Math.floor(times / (60 * 60 * 24));
				hour = Math.floor(times / (60 * 60)) - (day * 24);
				minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (day <= 9) day = '0' + day;
			if (hour <= 9) hour = '0' + hour;
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			//
			//	    console.log(day+"天:"+hour+"小时："+minute+"分钟："+second+"秒");
			times--;
			//pk_1v1的倒计时
			$(select).text(day + "天:" + hour + "时:" + minute + "分:" + second + "秒");
			if (times <= 86400) {
				//最后24小时=86400s字体变红
				$(select).css("color", "#D81515");
			}
			if (times <= 0) {//倒计时结束
				if (localStorage.getItem("Pkstate") == 1) {

					postAjax(hostAjax + "/Interface/PKService/PKService.asmx/ServiceUpdataPKState", JSON.stringify({ sPkID: localStorage.getItem("pkId"), iPkstate: 2 }), callback);
				} else if (localStorage.getItem("Pkstate") == 0) {
					postAjax(hostAjax + "/Interface/PKService/PKService.asmx/ServiceUpdataPKState", JSON.stringify({ sPkID: localStorage.getItem("pkId"), iPkstate: 1 }), callback);
				} else {
					alert("系统出错~");
				}
				function callback (data) {
					if (data.d.Code == 0) {
						ui.showToast("比赛结束,本页面即将关闭");
						setTimeout(function () {
							history.go(-1);
						}, 1000);
					}
				}
				clearInterval(timer);
			}
		}, 1000);
	},
	// 判断是否为手机号  
	isPoneAvailable: function (pone) {
		var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (!myreg.test(pone)) {
			return false;
		} else {
			return true;
		}
    },
    isChinaPhoneNumber: function (phoneNumber) {
        let phoneReg = /^1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[235-8]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|66\d{2})\d{6}$/;
        if(!phoneReg.test(phoneNumber)) {
            return false;
        } else {
            return true;
        }
    },
	isLogin: function () {
		//判断是否登录的方法
		if (localStorage.getItem("zhizhao_uid")) {
			return true;
		} else {
			//uid不存在表示没登录
			var url = location.href;
			localStorage.setItem("login_url", url);
			location.href = "login.html";
		}
	},
	isLogin2: function () {
		//判断是否登录的方法
		if (localStorage.getItem("zhizhao_uid")) {
			return true;
		} else {
			//uid不存在表示没登录
			var url = location.href;
			localStorage.setItem("login_url", url);
			location.href = "../login.html";
		}
	},
	//该方法把后台传来的图片全部截取第一张
	firstImg: function (imgUrl) {
		if (imgUrl.indexOf(",") > 0) {
			return imgUrl.split(",")[0];
		} else {

			return "http://" + imgUrl.split("http://")[1];
		}
	}
	//专门负责调出登录的方法
	, showLogin: function (item) {

	},
	//专门计算--加票
	addVote: function () {
		//调接口 --成功之后--加票数
	},
	//投票--调取投票接口-主题id/擂主id/用户id/pk类型
	vote: function (_sID, _iUserId, _iUserIdVote, _iPkstate) {
		var vote_url = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceAddVote";
		var vote_str = { sPkid: _sID, iUserId: parseInt(_iUserId), iUserIdVote: _iUserIdVote, iPktype: _iPkstate };
		postAjax(vote_url, JSON.stringify(vote_str), callback);
		function callback (data) {
			console.log(data);
			if (data.d.Code == "408") {
				ui.showToast(data.d.Msg);
			} else if (data.d.Code == 0) {
				ui.showToast("投票成功");
				setTimeout(function () {
					location.reload();
				}, 800);
			}
		}
	},
	//控制血量值
	vote_percent: function (percent) {
		//			alert((100-((percent)*100).toFixed(2)));

		if (percent == Infinity) {
			percent = 0;
		} else if (percent < 1) {


			if ((100 - ((percent) * 100).toFixed(2)) > 90) {
				percent = "90%";

			} else {
				percent = (100 - ((percent) * 100).toFixed(2)) + "%";
			}
		} else if (percent == 1) {
			percent = "48%";
		} else if (percent == 0) {
			percent = "100%";
		} else if (isNaN(percent)) {
			percent = "48%";
		}
		else {
		}
		$(".blue_bar").animate({
			right: percent
		}, 2000)
	}
	,
	//pk页面调取接口的信息展示
	showpk_1v1: function () {
		//获取主题id
		var _1v1_pkId = localStorage.getItem("pkId");
		var Pkstate = localStorage.getItem("Pkstate");
		var _url = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceSelectPKhomePage1V1"
		var ajaxData_str;
		if (localStorage.getItem("zhizhao_uid")) {
			ajaxData_str = { sID: _1v1_pkId, sTitle: '', iPkstate: Pkstate, iUserId: parseInt(localStorage.getItem("zhizhao_uid")) };
		} else {
			ajaxData_str = { sID: _1v1_pkId, sTitle: '', iPkstate: Pkstate, iUserId: 0 };
		}/*0.未开始,1,进行中,2.结束*/
		var ajaxData = JSON.stringify(ajaxData_str);
		postAjax(_url, ajaxData, callback);
		function callback (data) {
			console.log(data.d.Data)
			document.title = "1v1_" + data.d.Data[0].title;
			//如果是已结束---
			if (data.d.Data[0].pkstate == 2) {
				$(".pk_information li:first-child button").eq(0).hide();
				$(".pk_information li:last-child button").eq(0).hide();
				//不能刷礼物gift
				$(".gift").hide();
				//input变长
				$(".pk_input input").css('width', '7.1rem');
				$(".pk_input i").css('position', 'absolute');
				$(".pk_input i").css('right', '0.3rem');
				/*去掉倒计时*/
				$(".pk_time").html("<button>关注PK</button>比赛已结束")
			} else {
				all_function.countDown(".pk_time span", (new Date(all_function.iponeTime(data.d.Data[0].endtime)) - new Date()) / 1000);//倒计时
			}
			//点击转到评论详情
			$(".comment a").click(function () {
				if (all_function.isLogin()) {
					location.href = "commit_pk.html?pkid=" + data.d.Data[0].id;
				}
			});
			theme_id = data.d.Data[0].id;//主题id在评论提交时用到
			//是否关注
			if (data.d.Data[0].iffollow == 1) {
				$(".pk_time button").text("已关注!");
			} else if (data.d.Data[0].iffollow == 0) {
				/*点击关注*/
				$(".pk_time button").click(function () {
					if (all_function.isLogin()) {//如果登录
						if (if_guanzhu && $(this).text() == "关注PK") {
							all_function.guanzhu(_1v1_pkId, parseInt(localStorage.getItem("zhizhao_uid")));
						}
						if_guanzhu = false;
					}
				})
			}

		}
		//调取擂主的信息
		//BL20180710050743080453551是主题id
		//投票要擂主id
		var _url1 = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceSelectPKChallenger";
		var ajaxData_str1 = { sID: _1v1_pkId, sTitle: '', iPktype: 1, iSenduserId: 0, sSenduserNeme: '' };/*0.未开始,1,进行中,2.结束 1：1v1,2：多人pk，3.冠军争霸*/
		var ajaxData1 = JSON.stringify(ajaxData_str1);
		postAjax(_url1, ajaxData1, callback1);
		function callback1 (data) {
			console.log(data.d.Data);
			//姓名--学校
			if (data.d.Data[0].headimg == "") {
				data.d.Data[0].headimg = "img/default_person.png";
			}
			$(".blue").html("<div class='pk_name'>" + data.d.Data[0].name + "</div><img src='" + img_url + data.d.Data[0].headimg + "'/><div class='adress'>" + data.d.Data[0].schoolneme + "</div>");
			$(".blue img").click(function () {
				location.href = "person_page/person_detail.html?id=" + data.d.Data[0].senduserid;
			})
			//图片
			$(".header li").eq(0).click(function () {
				localStorage.setItem("video", JSON.stringify({
					src: data.d.Data[0].Video,
					name: data.d.Data[0].name,
					vote: data.d.Data[0].Voters
				}))
				location.href = "modelDetail.html?id=" + data.d.Data[0].modelId;
			})
			$(".header li:first-child").find("img").eq(0).attr("src", all_function.firstImg(data.d.Data[0].uploadpath));
			$(".pk_information li:first-child").find(".pk_inf_list2 img").attr("src", all_function.firstImg(data.d.Data[0].narrowing));
			//票数
			$(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text(data.d.Data[0].Voters);
			//已卖出
			$(".pk_information li:first-child").find(".pk_inf_list1 p").eq(1).find("span").text(data.d.Data[0].sellingtimes);
			//简介
			$(".pk_information li:first-child").find(".pk_inf_list3 p").text(data.d.Data[0].remark);
			//专家点评
			$(".pk_information li:first-child").find(".pk_inf_list4 p").text(data.d.Data[0].Commentcomments);
			//投票和购买的buttonid--擂主id
			$(".pk_information li:first-child button").eq(0).attr("index", data.d.Data[0].senduserid);
			$(".pk_information li:first-child button").eq(0).click(function () {
				//这是投票
				//				alert($(this).attr("tabindex"));
				if (all_function.isLogin()) {

					all_function.vote(_1v1_pkId, $(this).attr("index"), parseInt(localStorage.getItem("zhizhao_uid")), "1");
				}
			})
			//点击购买模型跳转到模型购买页
			$(".pk_information li:first-child button").eq(1).click(function () {
				ui.showToast('暂不支持购买!');
				//location.href="modelDetail.html?id=410";//后面加index值就是擂主模型的id

			})
			//血量值--投票

			if ($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text() != "" && $(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text() != "") {
				if (Number($(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text()) == 0) {
					all_function.vote_percent($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text() / (Number($(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text())));
				} else {
					all_function.vote_percent($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text() / (Number($(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text()) + Number($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text())));
				}
			}
		}
		//调取参赛者的信息
		var _url2 = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceSelectContestantInformation";
		var ajaxData_str2 = { sID: _1v1_pkId, sTitle: '', iPktype: 1, iSenduserId: 0, sSenduserNeme: '', iUserId: uid };/*0.未开始,1,进行中,2.结束 1：1v1,2：多人pk，3.冠军争霸iUserId是用户id*/
		var ajaxData2 = JSON.stringify(ajaxData_str2);
		postAjax(_url2, ajaxData2, callback2);
		function callback2 (data) {
			console.log(data.d.Data);
			//姓名--学校
			if (data.d.Data[0].headimg == "") {
				data.d.Data[0].headimg = "img/default_person.png";
			}
			$(".red").html("<div class='pk_name'>" + data.d.Data[0].name + "</div><img src='" + img_url + data.d.Data[0].headimg + "'/><div class='adress'>" + data.d.Data[0].schoolneme + "</div>");
			$(".red img").click(function () {
				location.href = "person_page/person_detail.html?id=" + data.d.Data[0].senduserid;
			})
			//图片
			$(".header li").eq(1).click(function () {
				localStorage.setItem("video", JSON.stringify({
					src: data.d.Data[0].video,
					name: data.d.Data[0].name,
					vote: data.d.Data[0].Voters
				}))
				location.href = "modelDetail.html?id=" + data.d.Data[0].modelId;
			})
			$(".header li").eq(1).find("img").eq(0).attr("src", all_function.firstImg(data.d.Data[0].uploadpath));
			$(".pk_information li:last-child").find(".pk_inf_list2 img").attr("src", all_function.firstImg(data.d.Data[0].narrowing));
			//票数
			$(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text(data.d.Data[0].Voters);
			//已卖出
			$(".pk_information li:last-child").find(".pk_inf_list1 p").eq(1).find("span").text(data.d.Data[0].sellingtimes);
			//简介
			$(".pk_information li:last-child").find(".pk_inf_list3 p").text(data.d.Data[0].remark);
			//专家点评
			$(".pk_information li:last-child").find(".pk_inf_list4 p").text(data.d.Data[0].Commentcomments);
			//投票和购买的buttonid--擂主id
			$(".pk_information li:last-child button").eq(0).attr("index", data.d.Data[0].senduserid);
			$(".pk_information li:last-child button").eq(0).click(function () {
				//这是投票
				//				alert($(this).attr("tabindex"));
				if (all_function.isLogin()) {
					all_function.vote(_1v1_pkId, $(this).attr("index"), parseInt(localStorage.getItem("zhizhao_uid")), 1);

				}
			})
			//点击购买模型跳转到模型购买页
			$(".pk_information li:last-child button").eq(1).click(function () {
				ui.showToast('暂不支持购买!');
				//location.href="modelDetail.html?id=410";//后面加index值就是擂主模型的id

			})
			//血量值--投票

			if ($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text() != "" && $(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text() != "") {
				if (Number($(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text()) == 0) {
					all_function.vote_percent($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text() / (Number($(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text())));
				} else {
					all_function.vote_percent($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text() / (Number($(".pk_information li:last-child").find(".pk_inf_list1 p").eq(0).find("span").text()) + Number($(".pk_information li:first-child").find(".pk_inf_list1 p").eq(0).find("span").text())));
				}
			}
		}
		//调取评论信息
		all_function.pkComment();
	},
	//专门写所有评论PK部分
	pkComment: function () {
		//调取评论信息
		var _url3 = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceSelectComment";
		var ajaxData_str3 = { sPkid: localStorage.getItem("pkId"), iUserId: 0 };
		postAjax(_url3, JSON.stringify(ajaxData_str3), callback3);
		function callback3 (data) {
			var commentStr = "";
			var commentImg = "img/default_person.png";
			console.log(data);
			/*这里是评论区--默认三条*/
			if (data.d.Code == 0) {/*有评论就是0--没评论是1000*/
				for (var i = 0; i < data.d.Data.length && i <= 2; i++) {
					if (data.d.Data[i].imgurl != "") {
						commentImg = img_url + data.d.Data[i].imgurl;
					}
					commentStr += "<div class='list'><img src='" + commentImg + "'/><div class='name'>&ensp;" + data.d.Data[i].userName + "</div><p>" + data.d.Data[i].content + "</p></div>";
				};
				$(".comment>header span").text("共" + data.d.Data.length + "条评论");
			} else {
				commentStr = "<p style='text-align: center;font-size: 0.26rem;color:white;'>暂时没有评论哦~~</p>";
				$(".comment>header span").text("");
			}

			$(".comment-Lists")[0].innerHTML = commentStr;
		};/*评论的返回函数结束*/
	}
	, guanzhu: function (_sPkid, _iUserId) {//主题id--登录人的id
		//所有的地方点击关注
		var guanzhu_url = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceAddReviewGuZhu";
		var guanzhu_str = { sPkid: _sPkid, iUserId: parseInt(_iUserId), sName: '' };
		postAjax(guanzhu_url, JSON.stringify(guanzhu_str), callback);
		function callback (data) {
			console.log(data.d.Success);
			if (data.d.Success = "true") {
				ui.showToast('关注成功!');
				$(".pk_time button").text("已关注");
			} else {
				ui.showToast(data.d.Msg);
			}
		}
	},
	//提交评论--
	commit: function (_sPkid, _iCommentatorId, str) {
		var commit_url = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceAddReview";
		var commit_str = { sPkid: _sPkid, iCommentatorId: parseInt(_iCommentatorId), sContent: str };
		postAjax(commit_url, JSON.stringify(commit_str), callback);
		function callback (data) {
			if (data.d.Success = "true") {
				console.log(data.d.Success);
				if (data.d.Success = "true") {
					ui.showToast('评论成功!');
					//					$("#comment").val("");
					//刷新页面
					setTimeout(function () {
						location.reload();
					}, 800);

				} else {
					ui.showToast('评论失败,请刷新页面!');
				}
			}
		}
	}
	,//验证注册信息
	yanzheng: function () {
		if (!all_function.isPoneAvailable($("#tel").val())) {
			ui.showToast("手机号填写不对!");
			return false;
		}
		if ($("#uname").val() == "") {
			ui.showToast("请填写昵称!");
			return false;
		}
		if ($("#passd").val() == "" || !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test($("#passd").val())) {
			ui.showToast("填写6到20位字母加数字的密码!");
			return false;
		}
		if ($("#qrpassd").val() != $("#passd").val()) {
			ui.showToast("两次输入的密码不一致!");
			return false;
		}
		return true;
	},//获取验证码
	getCode: function (t) {
		var code_str = {
			type: t,
			account: $("#tel").val(),
		};
		postAjax(hostAjax + "/api/user/v1/sms", JSON.stringify(code_str), callback);
		function callback (data) {
			console.log(data);


			if (data.Code == 0) {
				time();
			} else {
				if ($("#tel").val() != "") {
					ui.showToast("请确保手机号正确");
				}

				ifTime = true;
			}

			//  	 if(data.d.Code==0){
			//  	 	location.href="login.html";
			//  	 }else if(data.d.Code==201){
			//  	 	ui.showToast(data.d.Msg);
			//  	 }
		}
	},
	//点赞
	dianzan: function (_user_id, _model_id) {
		ajaxData = {/*访问后端接口--传递的参数---总模型列表的接口参数*/
			userid: parseInt(_user_id),
			model_id: parseInt(_model_id)
		}
		getAjax(hostAjax + "/api/user/v1/setmodelzan", ajaxData, callback1);
		function callback1 (data) {
			console.log(data);
		}
	},
	//收藏
	shoucang: function (_user_id, _model_id, _type) {//1:收藏 2:取消收藏
		ajaxData1 = {/*访问后端接口--传递的参数---总模型列表的接口参数*/
			userid: parseInt(_user_id),
			model_id: parseInt(_model_id),
			type: _type
		}
		getAjax(hostAjax + "/api/user/v1/setmodelcollect", ajaxData1, callback2);
		function callback2 (data) {
			console.log(data);
			if (data.Code == 0) {
				if_shoucang = true;
				if (_type == 1) {
					ui.showToast("收藏成功");
				} else {
					ui.showToast("取消收藏");
				}
			}
		}
	},
	modelImgList: function () {
		/*这是点击模型详情页面的模型图片时让它放大显示---初始化*/
		var pswpElement = document.querySelectorAll('.pswp')[0];
		// build items array
		// define options (if needed)
		var options, gallery;
		$('.mod-img img').click(function () {
			$(".playvideo").css("display", "none");
			options = {
				index: Number($(this).attr("index")),
				// history & focus options are disabled on CodePen        
				history: false,
				focus: false,
				showAnimationDuration: 0,
				hideAnimationDuration: 0
			};
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		});
	}
	, mvm_time: function (a, b) {//a是pk的类型,b是pk的状态
		_url2 = hostAjax2 + "/Interface/PKService/PKService.asmx/ServiceSelectTheme"
		ajaxData_str2 = { sID: localStorage.getItem("pkId"), sTitle: '', iPktype: a, iPkstate: b };/*0.未开始,1,进行中,2.结束*/
		ajaxData2 = JSON.stringify(ajaxData_str2);
		postAjax(_url2, ajaxData2, callback2);
		function callback2 (data) {
			pk1v1_str = "";
			console.log(data.d.Data[0].endtime);
			all_function.countDown("time span", (new Date(all_function.iponeTime(data.d.Data[0].endtime)) - new Date()) / 1000);
		}
	}
}















//把所有的moreLike---猜你喜欢--调用接口
if (document.getElementsByClassName("moreLike")[0]) {
	var moreLike_str = "";
	var ajaxData = {/*访问后端接口--传递的参数---总模型列表的接口参数*/
		// 		user_id:null,
		orderby: "2"/**/
	}
	getAjax(hostAjax + "/api/user/v1/getindexmodelist", ajaxData, callback1);
	function callback1 (data) {
		//  	console.log(data);
		moreLike_str = "";
		for (var i = 0; i < data.Data.list.length; i++) {

			moreLike_str += "<li  id='" + data.Data.list[i].modelid + "'><img src='" + data.Data.list[i].smallimg + "'/><p>" + data.Data.list[i].modelname + "</p></li>"
		}
		$(".moreLike ul").html(moreLike_str);
		$(".moreLike img").click(function () {
			location.href = "modelDetail.html?id=" + $(this).parents("li").attr("id");
		});
	}
}

$(".tabClick li").click(function () {
	$(".active").attr("class", "");
	$(this).attr("class", "active");
});

//进来就就把后缀的localStorage设置
if (location.href.indexOf("localStorage") > 0) {
	localStorage.setItem("pkId", location.href.split("=")[1].split("&")[0])
}
if (location.href.indexOf("senduserid") > 0 && localStorage.getItem("senduserid") == null) {
	localStorage.setItem("senduserid", location.href.split("senduserid=")[1].split("&")[0])
}
if (location.href.indexOf("inviteCode") > 0 && sessionStorage.getItem("zhizhao_inviteCode") == null) {
	sessionStorage.setItem("zhizhao_inviteCode", location.href.split("inviteCode=")[1].split("&")[0])
}
if (location.href.indexOf("code=") > 0 && localStorage.getItem("zhizhao_openid") == null) {//获取用户openid
	sessionStorage.setItem("zhizhao_code", location.href.split("code=")[1].split("&")[0]);
	all_function.wxOpenId(location.href.split("code=")[1].split("&")[0]);
}
function bodyScroll (event) {
	event.preventDefault();
}

//调用微信登录
//TODO remove befor deploy
let isDevelplment = false;
wxLogin();
function wxLogin(_url){
	if(localStorage.getItem("zhizhao_uid1")){
		return false;
	}
	if(localStorage.getItem("zhizhao_openid")){
		localStorage.setItem("zhizhao_uid1","预备存留");
		return false;
		// getAjax(hostAjax+"/api/user/v1/wxloginopenid?openid="+localStorage.getItem("zhizhao_openid"),"",relogin);
    }
    //下面是微信授权
    if(!isDevelplment) {
        if(sessionStorage.getItem("zhizhao_code")==null&&localStorage.getItem("zhizhao_openizhizhao_openidd")==null){
            var wxUrl=encodeURI(location.href);
            location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx220f1ff8e48f8edb&redirect_uri="+wxUrl+"&response_type=code&scope=snsapi_userinfo&state=jin#wechat_redirect";
		}
    }
}
function relogin (data) {
	if (data.Code == 200) {
		ui.showToast("登录成功");
		// localStorage.setItem("zhizhao_uid1", data.Data.user_id);
		// localStorage.setItem("zhizhao_token", data.Data.token);

		/*存本地sesson*/
		// $.ajax({
		// 	type: "get",
		// 	url: hostAjax + "/api/user/v1/info",
		// 	data: { user_id: data.Data.user_id, curr_id: data.Data.user_id },
		// 	dataType: "json",
		// 	success: function (data) {
		// 		localStorage.setItem("zhizhao_inviteCode", data.Data.invitecode);
		// 		if (sessionStorage.getItem("firstReload") == null) {
		// 			sessionStorage.setItem("firstReload", "1");
		// 			setTimeout("location.reload()", 1000)

		// 		}
		// 	},
		// 	error: function () {
		// 		alert("网络错误")
		// 	}
		// })
	} else if (data.Code == 401) {
		if (document.getElementsByClassName("person")[0]) {
			if (!sessionStorage.getItem("ifPerson")) {
				sessionStorage.setItem('ifPerson', 'true');
				location.href = 'login.html';

			}
		}
	}


}