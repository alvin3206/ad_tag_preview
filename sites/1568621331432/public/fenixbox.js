$(document).ready(function (){
    $('.fenixbox').fenixBox();

    $(window).resize(function () {
        $('#fenixbox img').css('max-height', $(window).height() - 50);
        $('#fenixbox')
            .css({
                'top': parseInt($(window).height() / 2 - ($('#fenixbox').height() / 2)),
                'left': parseInt($(window).width() / 2 - ($('#fenixbox').width() / 2))
            });
        $('#fenixbox-overlay i')
            .css({'top': parseInt($(window).height() / 2), 'left': parseInt(($(window).width() / 2) - 20)});
    });
});

(function($){

    $.fn.fenixBox = function(){

        function removeFenixBox(){
            $('#fenixbox-overlay, #fenixbox').fadeOut(500, function(){ $(this).remove(); });
        }

        this.click(function(){

            // Display overlay
            $('<div id="fenixbox-overlay"></div>')
                .css({
                    'top': '"' + $(document).scrollTop() + '"',
                    'opacity': '0',
                    'cursor': 'pointer'
                })
                .animate({'opacity': '0.7'}, 'slow')
                .appendTo('body')
                .click(function(){
                    removeFenixBox();
                });

            // Add font-awesome load icon.
            $('<i></i>')
                .addClass('fa fa-spinner fa-pulse fa-3x fenixbox-loader')
                .css({'top': parseInt($(window).height() / 2), 'left': parseInt(($(window).width() / 2) - 20)})
                .appendTo('#fenixbox-overlay');

            // Add and hide the box the image shows in
            $('<div id="fenixbox"></div>')
                .hide()
                .appendTo('body');

            // Create and load image
            $('<img>')
                .attr('src', $(this).attr('src'))
                .load(function(){
                    $('#fenixbox img').css('max-height', $(window).height() - 50);
                    $('#fenixbox')
                        .css({
                            'top': parseInt($(window).height() / 2 - ($('#fenixbox').height() / 2)),
                            'left': parseInt($(window).width() / 2 - ($('#fenixbox').width() / 2))
                        })
                        .slideDown();
                })
                .appendTo('#fenixbox');

            $('<i></i>')
                .addClass('fa fa-times-circle fa-3x fenixbox-exit')
                .insertAfter('#fenixbox img')
                .click(function(){
                    removeFenixBox();
                });

            if($(this).attr('title')){
                $('<span></span>')
                    .text($(this).attr('title'))
                    .css({
                        //'width': parseInt($('#fenixbox').width() - 20)
                        'width': parseInt($('#fenixbox').width() )
                    })
                    .addClass('fenixbox-title')
                    .insertAfter('#fenixbox img');
            }

            // 新增點選圖片可[顯示/隱藏]圖說的功能
            $('#fenixbox').find('img').click(function(){
                $('.fenixbox-title').fadeToggle(200);
            });

        });
    };

}(jQuery));
