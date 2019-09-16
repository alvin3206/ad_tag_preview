//20160630：修正新聞內頁的iframe影片自適應
//if (et_iframe_ele == undefined) { // 防止重覆載入執行多次

	// CSS 修正
	// 直影音比例 100 : 177 = %數 : X
	var css = '.et_iframevideo{ position: relative; padding-top: 0px; height: 0; overflow: hidden;} .et_iframevideo{ padding-bottom: 56.25%; } .et_iframevideo iframe, .et_iframevideo object, .et_iframevideo embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%;} .instagram-media{ margin-bottom:15px!important;} .et_googledoc iframe{ width:100%; }.et_verticalvideo{position: relative; width:50%; height: 0; overflow: hidden; left:50%; transform: translateX(-50%)} .et_verticalvideo{ padding-bottom: 88.5%; } .et_verticalvideo iframe, .et_iframevideo object, .et_verticalvideo embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%;} ',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);	

	//video//////////////////////////////////
	//facebook.com/plugins/post.php"
	var et_iframe_ele = '\
	[src*="youtube.com"],\
	[src*="livestream.com"],\
	[src*="ettoday.net/source/tools/stream_player/"],\
	[src*="ettoday.net/source/tools/player/"],\
	[src*="goo.gl"],\
	[src*="facebook.com/plugins/video.php"],\
	[src*="player.vimeo.com"],\
	[src*="twitter.com"],\
	[src*="vlog.xuite.net/embed/"],\
	[src*="embed.ted.com"]\
	';

	// 判斷來源ettoday.net/tools/是否是直影音
	var et_tools = '[src*="ettoday.net/tools/"]';
	var $iframe = $('iframe');

	//et-tools-video
	var et_toolvideo = $iframe.filter(et_tools);
	if(et_toolvideo.length){
	  $.each(et_toolvideo, function(i, value) {
	  		var $el = $(et_toolvideo[i]);
		  	if($el.width() > $el.height()){ // 橫
		  		$el.wrap('<div class="et_iframevideo" />');
		  	}else{
		  		$el.wrap('<div class="et_verticalvideo" />');
		  	}
		});
	}

	//others
	var et_iframevideo = $iframe.filter(et_iframe_ele);
	if(et_iframevideo.length){
	  $(et_iframevideo).wrap('<div class="et_iframevideo" />');
	}

	//google.doc
	$iframe.filter('[src*="docs.google.com"]').wrap('<div class="et_googledoc" />');
//}