//FB youtube嵌入影音畫面調整 桌機版
function video_resize_pc(parent) {
	if ($(parent + ' p iframe').length > 0) {
		$(parent + ' p iframe').each(function() {
			var video_src = $(this).attr('src');
			if (video_src.match('facebook.com/plugins/video.php') != null) {

			}
			if (video_src.match('youtube.com') != null) {
				var width = $(this).parents('p').width();
				$(this).parent().addClass('v_container');
			}
		});
	}
}
