var tempWidth;

$(function() {
    tempWidth = $(window).width();
    //月曆
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd',//文字輸入框顯示格式
        showOtherMonths: true,
        selectOtherMonths: true,
        inline: true,
        showButtonPanel: true,
        currentText: "",
        closeText: "",//close文字
        dayNamesMin: ["S","M","T","W","T","F","S"],//月曆星期顯示方式
        monthNames: ["1月 ‧","2月 ‧","3月 ‧","4月 ‧","5月 ‧","6月 ‧",
            "7月 ‧","8月 ‧","9月 ‧","10月 ‧","11月 ‧","12月 ‧"], // 月份
        beforeShow: function (input, inst) {//顯示月曆後
            var w = $(window).width();
            var pickerLeft = (w-290)/2;
            setTimeout(function () {
                if (inst.id == 'start_time_m' || inst.id == 'end_time_m') {
                    inst.dpDiv.css({
                        'left': pickerLeft + 'px',
                        'top': 120 + 'px'//175
                    });
                }
                $('#closex,#ui-datepicker-div:before').click(function(){
                    $('#ui-datepicker-div').fadeOut(300);
                });
                $('#ui-datepicker-div').css('z-index',4000);
                // $("#ui-datepicker-div").before('<div class="da-mask"></div>');
                $(".maskMM").appendTo($("#ui-datepicker-div"));
            }, 0);
        },

        onChangeMonthYear: function (input, inst) {//改變日期時
            setTimeout(function () {
                $('#closex,#ui-datepicker-div:before').click(function(){
                    $('#ui-datepicker-div').fadeOut(300);
                });
            }, 0);
        },

        onSelect: function(dateText, inst) {
            var hide_input_name = $('#' + inst.id).attr('name');

            $('#' + hide_input_name).val(dateText);
        },
        onClose: function (input, inst) {//改變日期時
            var name = $(this).attr('name');
            var date = $(this).val();
            $("input[name='" + name + "']").val(date);
            setTimeout(function () {
                $('.da-mask').hide();
            }, 0);
        },
    });

    //手機和電腦的搜尋欄位同時更新
    $("input[name='keyword']").change(function(){
        var keyword = $(this).val();
        $("input[name='keyword']").val(keyword);

    });
});
var search_for_all_news = function()
{
    var keyword = $('#qs').val();

    if (!checkKeyword(keyword)) {
        return false;
    }

    var start = $('#start_time_m').val();
    var end = $('#end_time_m').val();

    if (checkTime(start, end)) {
        submit();
    } else {
        return false;
    }
}

function checkKeyword(keyword)
{
    if (keyword.trim() == '') {
        alert('請輸入關鍵字');
        return false;
    }

    var reg = /\s+/g;
    keyword = keyword.trim().replace(reg,' ');

    if (keyword.length > 50) {
        alert('關鍵字數過長');
        return false;
    }

    var res = keyword.split(" ");

    for (var key in res) {
        if (res[key].length < 2) {
            alert('每個關鍵字請超過兩個字');
            return false;
        }
    }

    if (res.length > 3) {
        alert('請勿超過三個關鍵字');
        return false;
    }
    return true;
}

function checkTime(start, end) {
    if (start.trim() == '' && end.trim() == '') {
        return true;
    }
    //如果是展開狀態判斷是否有開始時間/結束時間
    if (start.trim() == '') {
        alert('請選擇查詢時間');
        return false;
    }

    if (end.trim() == '') {
        alert('請選擇查詢時間');
        return false;
    }

    var start_time = new Date(start).getTime();
    var end_time = new Date(end).getTime();

    if (start_time > end_time) {
        alert('時間區間有誤');
        return false;
    }

    if (end_time > start_time) {
        if ((end_time - start_time) / 86400000 > 91) {
            alert('選擇區間最長三個月');
            return false;
        }
    }
    return true;
}
$(window).resize(function(){
    if (($(window).width() > 1100 && tempWidth <= 1100) || ($(window).width() <= 1100 && tempWidth > 1100) ) {
        $('.M_LTN_Search').css('display', 'none');
        $('#ui-datepicker-div').css('display', 'none');
    }
    tempWidth = $(window).width();
});