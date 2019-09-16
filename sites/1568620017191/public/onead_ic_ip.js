
request_isip=function(){
    window.is_requesting_isip = true;
    var ONEAD = {};
    window.ONEAD = ONEAD;
    ONEAD.isDfpMode = true;
    (function () {

    var slot = document.getElementById('oneadICIPTag');

    var slots = ['div-incover-ad','div-onead-ad'];
    for (var i = slots.length - 1; i >= 0; i--) {
        var s = document.createElement('div');
        s.id = slots[i];

        if (window.frameElement) {
            ONEAD.isDfpIframeMode = true;
            window.frameElement.parentNode.insertBefore(
                s,
                window.frameElement.parentNode.children[0]
                )
        } else {
            slot.appendChild(s);
        }
    }

    ONEAD.channel = 21; // ETToday

	//聲音播放時段設定 (設定每天自動靜音的時間區段)
	var AudioStartHour = 8;//<---自動聲音播放開始：時
	var AudioStartMinute = 0;//<---自動聲音播放開始：分
	var AudioPlayStopHour = 21;//<---自動聲音播放結束：時
	var AudioPlaySopMinute = 59;//<---自動聲音播放結束：分

	//抓取現在時間
	var RightNOW = new Date();
	var this_hour = RightNOW.getHours();
	var this_minute = RightNOW.getMinutes();
	var this_second = RightNOW.getSeconds();

	//靜音期間設定：以0時為0，分別計數出各時間點距0時幾秒
	var AutoAudioStartTime = (AudioStartHour*60*60)+(AudioStartMinute*60);
	var AutoAudioStopTime = (AudioPlayStopHour*60*60)+(AudioPlaySopMinute*60);
	var RightTime = (this_hour*60*60)+(this_minute*60);

	//音量依時間不同
	if (AutoAudioStartTime <= RightTime && RightTime <= AutoAudioStopTime) {//現在時間介於聲音播放開始和結束時間
		ONEAD.volume =  0; // 預設音量，值域為 0 ~ 1，建議採中間值 0.5。
		//alert("音量0.1");
	} else {
		ONEAD.volume =  0; // 預設音量，值域為 0 ~ 1，建議採中間值 0.5。
		//alert("音量0");
	}

    ONEAD.slot_limit = { width: 1000, height: 420 };
    // optional(s)
    ONEAD.slot_limit_multiple = {
        inread: {
            width: 665,
            height: 420
        }
    };

    ONEAD.response_freq = {
        start: 1,
        step: 1
    };

	//分頻id
	var categoryID = $("body").attr("id");
	if (categoryID =="" || categoryID == undefined){
		ONEAD.category = "-1";
	} else {
		ONEAD.category = categoryID;
	}

    ONEAD.response_freq_multiple = {
		incover: "1001,1002,1003,1004,1005,1006,1007,1008,1009,1010",
		instream: "1,2,3,4,5,6,7,8,9,10",
    };

    //ONEAD.uid = "1000037"; //測試UID
	//ONEAD.external_url = "//demo.onead.com.tw/"; //測試影音廣告主機
	ONEAD.uid = "1000019";	//正式UID
	ONEAD.external_url = "//onead.onevision.com.tw/"; //正式影音廣告主機
	
    ONEAD.wrapper = 'ONEAD_player_wrapper';
    ONEAD.wrapper_multiple = {
        instream: "ONEAD_player_wrapper", // equals to inpage
        inread: "ONEAD_inread_wrapper",
        incover: "ONEAD_incover_wrapper"
    };

    ONEAD.cmd = ONEAD.cmd || [];
    ONEAD.cmd.push(function () {
        ONEAD.ONEAD_slot('div-onead-ad','instream');
        ONEAD.ONEAD_slot('div-incover-ad','incover');
    });

    // 這個函式名稱是固定的，廣告播放完畢會呼叫之
    if ( parent.window.changeADState === undefined ){
        parent.window.changeADState=[];
    }
    parent.window.changeADState.push(function (obj) {
		// if not out-of-screen
		if (!ONEAD.ONEAD_is_above(200)){ // 可知廣告是否超過 browser 顯示範圍， 以控制廣告播放完畢時，不會slideup
			// following is necessary for Firefox (its bug), DON'T remove it
			ONEAD_setfocus();

			if (obj.newstate == 'COMPLETED' || obj.newstate == 'DELETED' ){
			if (ONEAD.play_mode == 'incover'){
				// remove the dimming block
				ONEAD.ONEAD_cleanup(ONEAD.play_mode);
			}else{
				ONEAD.ONEAD_cleanup();
			}
			}
		}
		else {
				if (obj.newstate == 'DELETED' ){

					if (ONEAD.play_mode == 'incover'){
						// remove the dimming block
						ONEAD.ONEAD_cleanup(ONEAD.play_mode);
					}else{
						ONEAD.ONEAD_cleanup();
					}
				}
		}
    });

    if (parent.ONEAD_on_get_response===undefined){
        parent.ONEAD_on_get_response=[];
    }
    parent.ONEAD_on_get_response.push(function (params) {
        // debugger;
        if (params !== null) {
            // debugger;
            if (params.play_mode == 'mobile-incover') {
                slot.style.width = '100vw';
                slot.style.height = '100vh';
                slot.style.margin = '0 auto';
            }else{
                slot.style.width = 'auto';
                slot.style.height = 'auto';
                slot.style.margin = '0 auto';
            }

        }

        if (ONEAD.isip_index != 0) {parent.window.ONEAD_is_window_onload = true;}
    });


if(parent.window.ONEADs===undefined){
    parent.window.ONEADs=[];
}
ONEAD.isip_index = parent.window.ONEADs.length;
parent.window.ONEADs.push(ONEAD);

(function () {
     //var src = 'http://ad-specs.guoshipartners.com/static/js/isip.js';
     var src = '//ad-specs.guoshipartners.com/static/js/isip.js';

    var js = document.createElement('script');
    js.async = true;
    js.onload = function () {
        if (ONEAD.isDfpIframeMode) {
            for (var k in parent.window) {
                if (k.indexOf('ONEAD_') !== -1) {
                    window[k] = parent.window[k];
                }
            }
        }

    };
    js.type = 'text/javascript';
    js.src = src;
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(js, node.nextSibling); // insert after
})();

})();
}
var check_requesting_isip = function(window){
    if ( window.is_requesting_isip !== undefined ){
        if(window.is_requesting_isip){
            setTimeout(function(){
                check_requesting_isip(window.frameElement === null? parent.window: window );
            }, 300);
        }
        else{
             request_isip();
        }
    }
    else{
        request_isip();
    }
}

check_requesting_isip(window.frameElement === null? parent.window: window );
