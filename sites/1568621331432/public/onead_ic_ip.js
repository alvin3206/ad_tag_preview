
function get_now_category() {
    var _category = '-1';
    try {
        var secA = uri.split('/')[1];
        var secB = uri.split('/')[2];
        if (secA.toLowerCase()=='news') _category = secB;
    } catch (e) {

    }
    return _category;
}

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

    ONEAD.channel =  21; // 自由時報電子報：文章版位
    ONEAD.volume =  0.02; // range is 0 to 1 (float)
    ONEAD.slot_limit = {width: 960, height: 420};
    // optional(s)
    ONEAD.slot_limit_multiple = {
        inread: {
            width: 634,
            height: 390
        }
    };

    ONEAD.followCustom = {
        //size:0.8, // 320px 為基準
        //left: '50px',
        bottom: '0px',
        right:'0%',
        //top:'25%',
        align:'right bottom' // 縮放原點，位置在右下角時需此設定
    };

    ONEAD.response_freq = {
        start: 1,
        step: 1
    };

    ONEAD.category = get_now_category();

    ONEAD.response_freq_multiple = {
        incover: "1,5",
        instream: "1,2,4,7,10,13,16,19"
    };

    ONEAD.uid = "1000054";
    ONEAD.external_url = "https://onead.onevision.com.tw/"; // base_url, post-slash is necessary
    ONEAD.wrapper = 'ONEAD_player_wrapper';
    ONEAD.wrapper_multiple = {
        instream: "ONEAD_player_wrapper", // equals to inpage
        inread: "ONEAD_inread_wrapper",
        incover: "ONEAD_incover_wrapper"
    };

    ONEAD.cmd = ONEAD.cmd || [];
    ONEAD.cmd.push(function () {
        ONEAD.ONEAD_slot('div-incover-ad','incover');
        ONEAD.ONEAD_slot('div-onead-ad','instream');
    });

    // 這個函式名稱是固定的，廣告播放完畢會呼叫之
    if ( parent.window.changeADState === undefined ){
        parent.window.changeADState=[];
    }
    parent.window.changeADState.push(function (obj) {
        // if not out-of-screen
        if (!ONEAD_is_above(200)){ // 可知廣告是否超過 browser 顯示範圍， 以控制廣告播放完畢時，不會slideup
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
