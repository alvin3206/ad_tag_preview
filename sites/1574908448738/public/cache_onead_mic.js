var site_cate = function () {
    var c = location.hostname.replace('.ltn.com.tw', '');
    switch (c.toLowerCase()) {
        case 'm':
            try { return 'm'+location.pathname.split("/")[2]; }catch(e){}
            return 'mnews'
            break;
        case 'ec':
            return 'mbusiness';
            break;
        default:
			return 'm' + c + '';
    }
};
var TestSite = (function(){
    return (location.hostname=='10.1.1.35' || location.hostname=='iservice.ltn.com.tw') ? true : false;
})();

var ONEAD_FRONT = {
    is_mobile : (function(){
        var ua = navigator.userAgent.toLowerCase();
        var is_iphone = ua.indexOf("iphone") > -1;
        var is_ipad = ua.indexOf("ipad") > -1;
        var is_ipod = ua.indexOf("ipod") > -1;
        var is_android = ua.indexOf("android") > -1;
        var is_mobile = false;

        if (is_iphone || is_ipod || is_ipad || is_android) {
            is_mobile = true;
        }

        return is_mobile;
    })()
    ,show : (function(){
        return window.show_onead_mic || true;
    })()
}

if(ONEAD_FRONT.is_mobile === true && ONEAD_FRONT.show===true){

    request_isip = function(resolve){
        window.is_requesting_isip = true;
        var ONEAD = {};
        window.ONEAD = ONEAD;
        ONEAD.isDfpMode = true;
        (function () {

        var slot = document.getElementById('oneadMICTag');

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

        ONEAD.channel = 21; // 自由時報電子報
        ONEAD.volume = 0.02; // range is 0 to 1 (float)
        ONEAD.slot_limit = {width: 960, height: 420};
        // optional(s)
        ONEAD.slot_limit_multiple = {
            inread: {
                width: 634,
                height: 390
            }
        };

        ONEAD.response_freq = {
            start: 1,
            step: 1
        };

        ONEAD.category = site_cate();

        ONEAD.response_freq_multiple = {
            "mobile-incover": "1"
        };

        ONEAD.uid = "1000054";
        ONEAD.external_url = "//onead.onevision.com.tw/";
        if(TestSite){
            ONEAD.category = "-1"
            ONEAD.uid = "1000037";
            ONEAD.external_url = "//demo.onead.com.tw/";
        }
        ONEAD.wrapper = 'ONEAD_player_wrapper';
        ONEAD.wrapper_multiple = {
            instream: "ONEAD_player_wrapper", // equals to inpage
            inread: "ONEAD_inread_wrapper",
            incover: "ONEAD_incover_wrapper"
        };

        ONEAD.cmd = ONEAD.cmd || [];
        ONEAD.cmd.push(function () {
            ONEAD.ONEAD_slot('div-incover-ad','mobile-incover');
        });

        // 這個函式名稱是固定的，廣告播放完畢會呼叫之
        if ( parent.window.changeADState === undefined ){
            parent.window.changeADState=[];
        }
        parent.window.changeADState.push(function (obj) {
            if (obj.newstate == 'COMPLETED' || obj.newstate == 'DELETED') {//this is IP
                if (ONEAD.play_mode == 'incover') {
                    // remove the dimming block
                     ONEAD.ONEAD_cleanup(ONEAD.play_mode);
                } else {
                     ONEAD.ONEAD_cleanup();
                }

                setTimeout(function () {
                    slot.style.display = 'none';
                }, 400);
            }
        });

        if (parent.ONEAD_on_get_response===undefined){
            parent.ONEAD_on_get_response=[];
        }
        parent.ONEAD_on_get_response.push(function (params) {
            // debugger;
            if (params !== null) {
                slot.style.width = 'auto';
                slot.style.height = 'auto';
                slot.style.margin = '0 auto';
                // 自由時報 O客製邏輯 do nothing;
                if (params.play_mode == 'mobile-incover') {
                    //do nothing;

                }
            } else {
                // 沒 OneAD 廣告，呼叫自由時報 DFP
                NotOneAD = true;
                call_dfp();
                return false;
            }

            if (ONEAD.isip_index != 0) {parent.window.ONEAD_is_window_onload = true;}
        });


        if(parent.window.ONEADs===undefined){
            parent.window.ONEADs=[];
        }
        ONEAD.isip_index = parent.window.ONEADs.length;
        parent.window.ONEADs.push(ONEAD);


            ( function () {
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
                    window.is_requesting_isip = false;
                    resolve();
                };
                js.type = 'text/javascript';
                js.src = src;
                var node = document.getElementsByTagName('script')[0];
                node.parentNode.insertBefore(js, node.nextSibling); // insert after
				//$(function(){call_dfp();});
            })();

        })();

    }

    var check_requesting_isip = function (window) {
        var resolve = function () {
            window.ONEAD_request_queue.shift();
            if (ONEAD_request_queue.length !== 0) {
                // window.is_requesting_isip = true;
                window.ONEAD_check_requesting_isip(window.frameElement === null ? parent.window : window);
            }
        }
        var request_isip = window.ONEAD_request_queue[0];
        request_isip(resolve);
    }
    window.ONEAD_request_queue = window.ONEAD_request_queue == undefined ? [] : window.ONEAD_request_queue;
    if(window.ONEAD_request_queue.length == 0 && window.ONEAD_check_requesting_isip !==undefined && window.is_requesting_isip == false){
        window.ONEAD_request_queue.push(request_isip);
        window.ONEAD_check_requesting_isip(window.frameElement === null ? parent.window : window);
    }else{
        window.ONEAD_request_queue.push(request_isip);
    }
    if (window.ONEAD_check_requesting_isip === undefined) {
        window.ONEAD_check_requesting_isip = check_requesting_isip;
        window.ONEAD_check_requesting_isip(window.frameElement === null ? parent.window : window);

    }

}