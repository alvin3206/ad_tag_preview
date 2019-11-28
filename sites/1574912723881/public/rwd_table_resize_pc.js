// 文中表格調整
function rwd_table_resize_pc(parent) {
    var content_width = $(parent).width();// 文寬
    var table_width = $('table').width();// 表格寬
	if (table_width > content_width) {
		$(parent + ' table').each(function() {
            $('<div class="xscroll"></div>').insertBefore('table');
            $('.text > table').appendTo('.xscroll');
		});
	}
}
