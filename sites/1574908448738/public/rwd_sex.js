$(document).ready(function() {
    sex();

    if (typeof(article_status) != 'undefined' && article_status == 1) {
        ben_18_show();
    } else {
        ben_18_hide();
    }
    $('#18yesBtn').click(function(){
        ben_18_hide();
    })

    $('#18noBtn').click(function(){
        location.href='https://' + newsServer;
    })

});

var sex = function(){
    var allHeight = $(window).height();
    $('.sexmask').css('height',allHeight + 80)
                 .css('left', '0px');
    $('.sex').css('width', $('.sexmask').css('width'));
}

var re_size_window = function(){
    sex_height = $('.sex_box').height()
    $('.app-wrapper').css({
        'overflow':'hidden',
        'height':sex_height
    })
}

var ben_18_show = function(){
    re_size_window();
    $(window).resize(re_size_window);
    $('.sexmask').show();
    $('.sex').show();
}

var ben_18_hide = function(){
    $(window).resize(function(){
        $('.app-wrapper').css({
            'overflow':'auto',
            'height':'auto'
        })
    });

    $('.sexmask').hide();
    $('.sex').hide();
    $('.app-wrapper').css({
        'overflow':'auto',
        'height':'auto'
    })
}

