document.domain = 'ettoday.net';

/*DFP 同步式*/
var script0 = document.createElement("script");
script0.type = "text/javascript";
script0.async = true; //dfp async
//script0.src = "https://www.googletagservices.com/tag/js/gpt.js";
script0.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
document.head.appendChild(script0);

//dfp async
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

var isMobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/BlackBerry/);

if (isMobile) {//手機

	// Prebid =============================================================
	var script4 = document.createElement("script");
	script4.type = "text/javascript";
	//script4.src = "https://static.ettoday.net/ad/prebid/prebid-1.40-appier.js?201906251044";
	script4.src = "https://static.ettoday.net/ad/prebid/prebid-1.40.js?201908221345";
	//script4.src = "https://static.ettoday.net/ad/prebid/prebid.js";
	document.head.appendChild(script4);

	var etInterstitialAd = 30;
	//var etInterstitialAd = 15;

}else{////非手機

	// Prebid =============================================================
	var script4 = document.createElement("script");
	script4.type = "text/javascript";
	//script4.src = "https://static.ettoday.net/ad/prebid/prebid-1.40-appier.js?201905271300";
	script4.src = "https://static.ettoday.net/ad/prebid/prebid-1.40.js?201908221345";
	//script4.src = "https://static.ettoday.net/ad/prebid/prebid.js";
	document.head.appendChild(script4);

	// 閒置廣告 =============================================================
	var myCountry = $.cookie("et_client_country");
	if (myCountry == "TW" || myCountry == "HK" || myCountry == "MO" || myCountry == "CN" || myCountry == "MY" || myCountry == "SG") { //台港澳中星馬
		if (window.location.href.indexOf("fashion") == -1 && window.location.href.indexOf("house") == -1 && window.location.href.indexOf("boba") == -1) { //非時尚, 且非房產, 且非播吧
			var script1 = document.createElement("script");
			script1.type = "text/javascript";
			script1.async = true;
			script1.src = "//static.ettoday.net/ad/idle-ad/idle-ad-970.js";
			document.head.appendChild(script1);
		}
	}

}

// CRITEO CDB =============================================================
var script2 = document.createElement("script");
script2.type = "text/javascript";
script2.async = true;
script2.src = "https://static.criteo.net/js/ld/publishertag.js";
document.head.appendChild(script2);
var CriteoAdUnits = { "placements": [
    /* Criteo Placements List */
    { "slotid": "criteo_783188", "zoneid": 783188 }, // EtToday - TW - CDB - SA - MOBILE - 300x250 Top
    { "slotid": "criteo_783189", "zoneid": 783189 }, // EtToday - TW - CDB - SA - MOBILE - 300x250 Bottom
    { "slotid": "criteo_1191499", "zoneid": 1191499 }, // EtToday - TW - CDB - SA - MOBILE - 300x250 Inread
    { "slotid": "criteo_806580", "zoneid": 806580 }, // EtToday - TW - CHB - SA - 300x250 (PC)
    { "slotid": "criteo_806581", "zoneid": 806581 }, // EtToday - TW - CHB - SA - 300x600 (PC)
    { "slotid": "criteo_845893", "zoneid": 845893 }, // EtToday - TW - CDB - SA - 300x250 - Bottom Right (PC)
    { "slotid": "criteo_943528", "zoneid": 943528 }, // EtToday - TW - CDB - SA - 300x250 - Article UP Left (PC)
    { "slotid": "criteo_1086335", "zoneid": 1086335 }, // EtToday - TW - CDB - SA - 300x250 - #2  (PC)
    { "slotid": "criteo_1086336", "zoneid": 1086336 }, // EtToday - TW - CDB - SA - 970x250 - Top (PC)
]};
window.Criteo = window.Criteo || {}; window.Criteo.events = window.Criteo.events || [];
var CriteoBids=CriteoBids||{},CriteoBidsReceived=function(){for(var t in CriteoAdUnits.placements){var e=CriteoAdUnits.placements[t],i=Criteo.GetBidsForAdUnit(e.slotid);CriteoBids[e.slotid]=i.length>0?i[0]:null}},CriteoDisplayAd=function(t,e,i){if(void 0===i&&(i=0),null!==CriteoBids[t])if(void 0===CriteoBids[t]&&null!==CriteoBids[t])100>i&&setTimeout(function(){CriteoDisplayAd(t,e,i+1)},200);else{var r=document.getElementById(t);if(r){var s=document.createElement("iframe");s.setAttribute("id",t+"_iframe"),s.setAttribute("frameborder","0"),s.setAttribute("allowtransparency","true"),s.setAttribute("hspace","0"),s.setAttribute("marginwidth","0"),s.setAttribute("marginheight","0"),s.setAttribute("scrolling","no"),s.setAttribute("vspace","0"),s.setAttribute("width",CriteoBids[t].width),s.setAttribute("height",CriteoBids[t].height),r.appendChild(s);var o='<script src="'+CriteoBids[t].displayUrl+'"></scr'+'ipt>',d=s.contentWindow.document;d.open(),d.write(o),d.close()}}else"function"==typeof e&&e()};
Criteo.events.push(function() { Criteo.RequestBids(CriteoAdUnits, CriteoBidsReceived, 2000); });

// UAM =============================================================
/*
//load the apstag.js library
!function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");

//initialize the apstag.js library on the page to allow bidding
apstag.init({
     pubID: '57552ad3-75de-4d1f-b62b-734abb045091', 
     adServer: 'googletag'
});
apstag.fetchBids({
     slots: [{
         slotID: 'mw_inread', 
         slotName: '12656948/mw_inread', 
         sizes: [[300,250], [336,280]]
     },
     {
         slotID: 'pet_970x250', 
         slotName: '12656948/pet_970x250', 
         sizes: [[970,250]]
     }],
     timeout: 2e3
}, function(bids) {
     // set apstag targeting on googletag, then trigger the first DFP request in googletag's disableInitialLoad integration
     googletag.cmd.push(function(){
         apstag.setDisplayBids();
         googletag.pubads().refresh();
     });
});
*/

// Dable =============================================================
if (window.location.href.indexOf("fashion.ettoday.net") == -1 && window.location.href.indexOf("ettoday.net/dalemon") == -1) {//非時尚 & 非大檸檬
	(function(d,a,b,l,e,_) {
	d[b]=d[b]||function(){(d[b].q=d[b].q||[]).push(arguments)};e=a.createElement(l);
	e.async=1;e.charset='utf-8';e.src='//static.dable.io/dist/plugin.min.js';
	_=a.getElementsByTagName(l)[0];_.parentNode.insertBefore(e,_);
	})(window,document,'dable','script');

	if (window.location.href.indexOf("star.ettoday.net") != -1) {//星光雲
	  dable('setService', 'star.ettoday.net');
	} else {//非星光雲
	    if (isMobile) {//手機
	      dable('setService', 'm.ettoday.net');
	    }else{////非手機
	      dable('setService', 'pc.ettoday.net');
	    }
	}
	dable('sendLogOnce');
}

// CSS 修正 =========================================================
//var myHotTopicCss = '.block_1 .part_menu_3, .block_a .part_menu_3{display:none;} .ad_in_news {margin:10px auto;text-align:center} .ad_in_news img {display:inline!important} .ad_in_news .adIF01, .ad_in_news .adJS01 {margin:0 auto!important}/*修正新聞中圖片廣告置中問題*/';
var myHotTopicCss = '.ad_in_news {margin:10px auto;text-align:center} .ad_in_news img {display:inline!important} .ad_in_news .adIF01, .ad_in_news .adJS01 {margin:0 auto!important}/*修正新聞中圖片廣告置中問題*/';
head = document.head || document.getElementsByTagName('head')[0];
myHotTopicStyle = document.createElement('style');

myHotTopicStyle.type = 'text/css';
myHotTopicStyle.appendChild(document.createTextNode(myHotTopicCss));
head.appendChild(myHotTopicStyle);	

/*
$(function(){
	if($(".part_menu_3 a:contains('★★★')").index() != -1 || $("#tag-cloud a:contains('★★★')").index() != -1){
		$(".part_menu_3 a:contains('★★★'), #tag-cloud a:contains('★★★')").css({"visibility":"hidden","position":"absolute","bottom":"0"});
	}
	$(".block_1 .part_menu_3, .block_a .part_menu_3").show();
});
*/

// =============================================================
var myCountry = $.cookie("et_client_country");

var u = navigator.userAgent;
 ua = navigator.userAgent.toLowerCase();
 isLineApp = u.indexOf("Line") > -1;
 isFbApp = u.indexOf("FB") > -1; 
 isWeixinApp = ua.match(/MicroMessenger/i) == "micromessenger"; 

 isOpera = u.indexOf("Opera") > -1;
 if (u.indexOf("Firefox") > -1 || u.indexOf("FxiOS") > -1){
    isFF = true;
 } else {
    isFF = false;
 }
 if (u.indexOf("Safari") > -1 && u.indexOf("Chrome") < 1 && u.indexOf("CriOS") < 1){
    isSafari = true;
 } else { 
    isSafari = false;
 }

//指定時段設定
var etStartHour = 1;//<--開始：時
var etStartMinute = 0;//<---開始：分
var etPlayStopHour = 6;//<---結束：時
var etPlaySopMinute = 29;//<---結束：分

//抓取現在時間
var RightNOW = new Date();
var this_hour = RightNOW.getHours();
var this_minute = RightNOW.getMinutes();
var this_second = RightNOW.getSeconds();

//靜音期間設定：以0時為0，分別計數出各時間點距0時幾秒
var AutoStartTime = (etStartHour*60*60)+(etStartMinute*60);
var AutoStopTime = (etPlayStopHour*60*60)+(etPlaySopMinute*60);
var RightTime = (this_hour*60*60)+(this_minute*60);

//依時段不同
if (AutoStartTime <= RightTime && RightTime <= AutoStopTime) {//現在時間在指定時段內
	var isNotChrome = (myCountry == "TW" || myCountry == "HK" || myCountry == "MO" || myCountry == "CN" || myCountry == "MY" || myCountry == "SG") && (isLineApp || isFbApp || isSafari);
} else {//其它時段
	var isNotChrome = (myCountry == "TW") && (isLineApp || isFbApp || isSafari);
	//var isNotChrome = (myCountry == "TW" || myCountry == "HK" || myCountry == "MO" || myCountry == "CN" || myCountry == "MY" || myCountry == "SG") && (isLineApp || isFbApp || isSafari);
	//var isNotChrome = isLineApp || isFbApp || isSafari;
}