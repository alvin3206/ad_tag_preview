//突發直播js=============================================================================

//initialize
$(function(){
    if ($.cookie('liveShowClose') == null) {
        $.cookie("liveShowClose", 0, { expires: 1 , path:"/" , domain: "ettoday.net" });
    }
});

//close btn
$(function(){
    $('#etnews_live_player .close').click(function(){        
        $('#etnews_live_player').remove();        
        ga("AllWeb.send", "event", "開框關閉鈕",""+$(this).attr('href')+"");//trackevent
        var date = new Date();
        var minutes = 60;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        $.cookie("liveShowClose", 1, { expires: date , path:"/" , domain: "ettoday.net" });        
    })
});

//vod close btn
$(function(){
	if ($.cookie("liveShowClose")==1) {
		$('#ettoday_channel_frame').remove();
		$('.live_title').remove();
	}
	$(function(){
		$('.live_btn_close').click(function () {
			$('#ettoday_channel_frame').remove();
			$('.live_title').remove();
			var date = new Date();
			var minutes = 60;
			date.setTime(date.getTime() + (minutes * 60 * 1000));                                    
			$.cookie("liveShowClose", 1, { expires: date , path:"/" , domain: "ettoday.net" });
		});         
	});
});	

//load play video
$(function(){
    if ($.cookie('liveShowClose')==1) {
        $('#etnews_live_player').remove();        
    } else {
        $('#etnews_live_player').css('display','flex');
    }
});

//for hinet CDN call
if (window.addEventListener) {
    window.addEventListener ("message", receive, false);
} else {
    if (window.attachEvent) {
        window.attachEvent("onmessage",receive, false);
    }
}

function receive(event){
    var data = event.data;
    if(typeof(window[data.func]) == "function"){
        window[data.func].call(null, data.params[0], data.params[1]);
    }
}

function videoMessage(vid,title){
    $("#video_title").text(title);
    // $("#video_title").attr('href' , "//boba.ettoday.net/videonews/"+vid);
    // $("#video_url").attr('href' , "//boba.ettoday.net/videonews/"+vid);
}


//slide sidemenu
// $(function(){
//     var etLiveVideo = $('#etnews_live_player .box_2');
//     etLiveVideo.find('.slidmenu').click(function(){
//         $(this).toggleClass('move');
//     })
// })



//video_list
$(function(){
  (function(){
    if( $(".video_list").length === 0 ) return;   

    //video iframe toggle
    var $videoLinks = $('#etnews_live_player .video_list a.piece');
    var $videoBox = $('#etnews_live_player .box_2 #video');
    var $videoIframe = $videoBox.find('iframe');
    var $videoTitle = $('#etnews_live_player .btitle');
    

    var pre_src = $videoIframe.attr('src');
    var pre_title = $videoTitle.text();
    var pre_url = $videoTitle.find('a').attr('href');
    var pre_poster = $videoBox.data('poster');
    var pre_id = $videoBox.data('id');

    $('#etnews_live_player .video_list a.piece').click(function(e){
       e.preventDefault();

       var aSrc = $(this).attr('href');
       var aTitle = $(this).find('h3').text();
       var aUrl = $(this).find('h3').data('url');
       var aPoster = $(this).find('img').attr('src');
       var aid = $(this).data('id');       

       $videoIframe.attr('src', aSrc);
       $videoTitle.html('<a href="'+ aUrl +'" target="_blank">'+ aTitle +'</a>');
       $videoBox.data('poster', aPoster);

       $(this).attr('href', pre_src);
       $(this).find('h3').html(pre_title);
       $(this).find('h3').data('url', pre_url);
       $(this).find('img').attr('src', pre_poster);
       $(this).data('id', pre_id);

       pre_src = aSrc;
       pre_title = aTitle; 
       pre_url = aUrl;
       pre_poster = aPoster;
       pre_id = aid;
    });
  })();
})

//運動雲標題改色
$(function(){
	if (document.domain == 'sports.ettoday.net'){
		$('.live_title a').css("color","white");
	}
});
