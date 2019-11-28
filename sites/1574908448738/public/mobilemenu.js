$(function(){
    $('.nav_bar').click(function(){
        if ($('.mobileMenu').hasClass('mobileMenu_left')) {
            $('.mobileMenu').addClass('VB').animate({left:"0px"},50);
        } else {
            $('.mobileMenu').addClass('VB').animate({right:"0px"},50);
        }
        $('body').addClass('opacity');
		$('.maskMM').addClass('VB').fadeIn(350);
    });
    $('.maskMM, .close').click(function(){
        if ($('.mobileMenu').hasClass('mobileMenu_left')) {
            $('.mobileMenu').removeClass('VB').animate({left: "-200px"}, 50);
        } else {
            $('.mobileMenu').removeClass('VB').animate({right: "-200px"}, 50);
        }
		$('.maskMM').removeClass('VB');
        $('body').removeClass('opacity');
    });

})
