var idleAdsLoad = false;
var idleTimer = null;
var idleState = false;

var idleMinute = 5;
var idleSecond = 60 * 1000;
var idleWait = idleMinute * idleSecond;

var idle_ads_slots = [];

$(function() {
	$(window).on('load',function() {
		$('.idle_con ul').mCustomScrollbar();
	});

	$('.idle_con ul').mCustomScrollbar({
		theme:"dark-3"
	});

	var model = document.getElementById('idle-notice');
	window.onclick = function(event) {
		if (event.target == model) {
			idle_hide();
		}
	}

	$('#lightbox-close').click(function() {
		idle_hide();
	});

	$('#lightbox-repeat').click(function() {
		location.reload();
	});

	$('*').bind('mousemove keydown scroll', function () {
		clearTimeout(idleTimer);

		idleState = false;

		idleTimer = setTimeout(function () {
			idleState = true;
			if ($(window).width() > 880) {
				idle_show();
			}
		}, idleWait);
	});
	$(window).resize(function(){
		if ($(window).width() <= 880) {
			$('#idle-notice').hide();
		}
	});
});

var idle_show = function() {
	$('#idle-notice').show();
	
	if((typeof(article_status) != 'undefined') &&
		article_status == 1) {
		idleAds = Array();
	} else {
		if(idleAdsLoad == false) {
			load_idle_ads();
		} else {
			idle_ads_Refresh();
		}
	}
};

var idle_hide = function() {
	idleState = true;
	$('#idle-notice').hide();
};

var idle_ads_Refresh = function() {
    googletag.pubads().refresh(idle_ads_slots);
};

var load_idle_ads = function() {
	googletag.cmd.push(function() {
		for(var key in idleAds) {
			var slot = googletag.defineSlot(idleAds[key][0], idleAds[key][1], idleAds[key][2]).addService(googletag.pubads());
			idle_ads_slots.push(slot);
            //     googletag.display(idleAds[key][2]);
		}
        idle_ads_Refresh();

		googletag.pubads().collapseEmptyDivs();
		googletag.enableServices();
	});
	idleAdsLoad = true;
};

