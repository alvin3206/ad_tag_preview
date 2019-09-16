//FB youtube嵌入影音畫面調整 桌機版
function video_resize_pc(parent) {
	if ($(parent + ' p iframe').length > 0) {
		$(parent + ' p iframe').each(function() {
			var video_src = $(this).attr('src');
			if (video_src.match('facebook.com/plugins/video.php') != null) {
				var origin_width = $(this).attr('width');
				var origin_height = $(this).attr('height');
				if (origin_height > origin_width) {
					var width = 400;
					$(this).width(width).height(width*1.7777);
				} else {
					var width = $(this).parents('p').width();
					$(this).width(width).height(width/1.7777);
				}
			}
			if (video_src.match('youtube.com') != null) {
				var width = $(this).parents('p').width();
				$(this).width(width).height(width/1.7777);
			}
		});
	}
}