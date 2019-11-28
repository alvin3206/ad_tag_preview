function ltncookies_news(key, value, time_sec){
    var fn = ltncookies || function(){};
    fn(key, value, time_sec);
}

// view control
$(function(){
    //側邊欄選單用
    $('.nav_bar').click(function(){
        $('.mobileMenu').addClass('VB').animate({right: '0px'},100);
        $('body').addClass('opacity');
        $('.maskMM').addClass('VB');
    });
    $('.maskMM, .close').click(function(){
        $('.mobileMenu').removeClass('VB');
        $('.maskMM').removeClass('VB');
        $('body').removeClass('opacity');
    });

    //行動裝置_search 展開
    $('.ltnSearch').click(function(){
        $('.M_LTN_Search').fadeIn(300);
        $('body').css('overflow','hidden');
        //鎖遮罩的touchmove ，使遮罩後方物件不可滑動
        $('.M_LTN_Search').on("touchmove", function(e) {
            return false;
        });
    });
    //行動裝置_search 隱藏
    $('.mobileMask, .search_close').not('form,input').click(function(){
        $('.M_LTN_Search').fadeOut(150);
        $('body').removeAttr('style');
    });

    //圖片放大
    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: { verticalFit: true }
    });

    //桌機版_search 展開
    $('.iconSearch').click(function(){
        $bar = $('.icon').find('.ltnsch_show');
        $bar.fadeIn(100);
        $(".ltnsch_show form input").animate({width:'230px'},300).trigger("focus");
        $bar.siblings("a").hide();
    });
    //桌機版_search 關閉
    $('.ltnsch_show form input').blur(function(){
        $bar = $('.icon').find('.ltnsch_show');
        $bar.fadeOut(100);
        $('.iconSearch').show();
        $bar.siblings("a").show();
    });

    //內文字放大縮小
    $("a.fontsize").click(function() {
        $(this).toggleClass("fontsize2"); //換圖
        $("h1").toggleClass("fs_h1"); //大標
        $(".text h3, .text h4, .text h5, .text h6").toggleClass("subtit"); //次標
        $(".text p").toggleClass("fs_p"); //內文
        $(".text .time").toggleClass("fs_time"); //時間
        $(".text .photoB a div").toggleClass("fs_s"); //圖說

        var fontSizeClass = $(this).hasClass('fontsize2');
        if (fontSizeClass) {
            textsize = 'large';
        } else {
            textsize = 'small';
        }
        try {
            document.cookie = "textsize=" + textsize + ";domain=.ltn.com.tw;path=/";
            window.localStorage["textsize"] = textsize;
        }
        catch (e) {
        }

    });
    $(function () {
        var textsize = window.localStorage["textsize"];
        if (getCookie('textsize') != '') {
            textsize = getCookie('textsize');
        }
        if (textsize == 'large') {
            $("a.fontsize").click();
        }
    });

    /**
    * 取cookie的值
    * @param {string}  name 索引值
    */
    function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" +  name  + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]); return null;
    }

    /* 內廣 */
    $('.ltn_ad').each(function(){
        var adpv = $('<img style="display:none" src="https://cache.ltn.com.tw/app/program/impression.php?ano=' + $(this).attr('data-no') + '&' + new Date().getTime() + '" alt="impression">');
        $('head').append(adpv);
        var url = document.URL.substring(0,(document.URL.indexOf("?")>0) ?document.URL.indexOf("?") : 200);
        $(this).attr('href',$(this).attr('href')+'&source='+url);
    });

    setTimeout(function(){

        if(jQuery.browser.mobile){return;}
        move_sidebar_space();

    }, 300);

});

// 由userAgent判斷是否為手持裝置
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
var cookies_m = new cookies_admin_mode('m.ltn.com.tw');
if(cookies_m.isPC()){
    document.write("<meta name='ltn:device' content='P' />"); /*電腦版*/
}else{
    document.write("<meta name='ltn:device' content='M' />"); /*手機版*/
}
function cookies_admin_mode(mobile_key){
    this.write = function (value){
        document.cookie=mobile_key+'='+value+';domain=.ltn.com.tw;path=/';
    };
    this.read = function(){
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var res = "";
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = parts.shift();
            var cookie = parts.join('=');
            if (mobile_key && mobile_key === name) {
                res = cookie;
                break;
            }
        }
        return res;
    };
    this.isPC = function(){
        // 此判斷僅適用於有RWD的頁面
        return $(window).width() > 828;
    }
}


/**
 * 右側下方留白太多, 需移動右側區塊去填滿
 */
function move_sidebar_space() {

    var obj1129 = $('.contentAll');

    var s2a = {
        'height': function(){
            var h = $('section.content940').height();
            if(obj1129.length==1){
                h += obj1129.height();
            }
            return h;
        },
        'offset': function(){
            if(obj1129.length==1){
                return obj1129.offset();
            }else{
                return $('section.content940').offset();
            }
        }
    };
    var s1 = new scorllobj("section.content940", "#right_blake");
    var s2 = new scorllobj(s2a, "#door");
    //var s2 = new scorllobj(".content", "#door");

    $(window).on('scroll.sidebar', function () {
        var winScroll = $(window).scrollTop(),
            windowsH = $(window).height();
        s1.run(winScroll, windowsH);
        s2.run(winScroll, windowsH);
    });

    function scorllobj(obj_left, obj_right) {

        var obj = {
            left: (typeof(obj_left)=='string') ? $(obj_left) : obj_left,
            right: $(obj_right)
        };

        var actType = '';

        this.run = function (winScroll, windowsH) {

            var containerH = obj.left.height(),
                primaryH = obj.left.height(),
                sidebarH = obj.right.height(),
                beginPos = obj.left.offset().top;

            if (sidebarH > primaryH) { return; }
            var runType = 'C';
            var pH = sidebarH + beginPos;
            if (pH > windowsH) {
                runType = 'A';
            } else if (pH < windowsH) {
                runType = 'B';
            }

            if (runType == 'A') {
                if (winScroll + windowsH > sidebarH + beginPos && winScroll + windowsH < primaryH + beginPos) {
                    if (actType == 'A1') { return; }
                    var fix = winScroll + windowsH - (beginPos + sidebarH);
                    obj.right.attr("style", "position:fixed; bottom:0px;");
                    actType = 'A1';
                }
                if (winScroll + windowsH > sidebarH + beginPos && winScroll + windowsH >= primaryH + beginPos) {
                    if (actType == 'A2') { return; }
                    var fix = primaryH - sidebarH;
                    obj.right.attr("style", "position:relative; top:" + fix + "px;")
                    actType = 'A2';
                }
                if (winScroll + windowsH < sidebarH + beginPos) {
                    if (actType == 'A3') { return; }
                    obj.right.attr("style", "position:relative; bottom:auto;")
                    actType = 'A3';
                }
            }

            if (runType == 'B') {
                if (winScroll > beginPos && winScroll + sidebarH < beginPos + primaryH) {
                    if (actType == 'B1') { return; }
                    var fix = winScroll - beginPos;
                    obj.right.attr("style", "position:fixed; top:0px;")
                    actType = 'B1';
                }
                if (winScroll > beginPos && winScroll + sidebarH >= beginPos + primaryH) {
                    if (actType == 'B2') { return; }
                    var fix = primaryH - sidebarH;
                    obj.right.attr("style", "position:relative; top:" + fix + "px;")
                    actType = 'B2';
                }
                if (winScroll <= beginPos) {
                    if (actType == 'B3') { return; }
                    obj.right.attr("style", "position:relative; bottom:auto;")
                    actType = 'B3';
                }
            }
        }
    }
}


// 處理縮圖圖片橫圖滿版 開始
$(function () {
    $(".listS_h").find("img").one("load", function () {
        listS_w($(this));
    }).each(function () {
        if (this.complete) {
            $(this).trigger("load");
        }
    });
    $(window).on("resize", function () {
        $(".listS_w").addClass('listS_h').removeClass('listS_w');
        $(".listS_h").find("img").each(function () {
            listS_w($(this));
        });
    });
});
function listS_w($o){
    var $pr = $o.parent('.listS_h');
    // 尚未顯示的圖片不處理
    if ($o.is(':hidden')) { return; }
    // 取得外框寬高
    var div_width = $pr.outerWidth();
    var div_height = ($pr.outerHeight() > 10) ? $pr.outerHeight() : div_width * 2 / 3;
    if ($o.height() / $o.width() > div_height / div_width) {
        $o.css({
            'height': 'auto',
            'width': '100%',
            'marginLeft': 0
        });
        return;
    }
    // 清除橫圖樣式
    $o.css({
        'height': div_height,
        'width': 'auto',
        'max-width': 'unset'
    });
    // 取得圖片寬度及計算位移
    var p_width = $o.width();
    var	p_margin_left = p_width / 2 - div_width / 2;
    $o.css({
        'marginLeft': -p_margin_left
    });
    $pr.addClass('listS_w').removeClass('listS_h');
}
// 處理縮圖圖片橫圖滿版 結束
