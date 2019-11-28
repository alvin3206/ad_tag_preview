(function(){

	window.hideClose = function() {$('.banner_close').remove();};
	window.closeAD = function() {$('.splash').remove();};
	window.call_dfp = function(){googletag.cmd.push(function() {googletag.display('ad-H1');});};

	$(document).on("closeAD", function() {
		window.closeAD();
	}).on("hideClose", function() {
		window.hideClose();
	});

	$(document).on('click', '.splash, .banner_close', function(e){
		e.preventDefault();
		e.stopPropagation();
		window.closeAD();
	});

	googletag.cmd.push(function() {
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			var slotElementId = event.slot.getSlotElementId();
			if (slotElementId === "ad-H1") {
				setTimeout(function(){$('.banner_close').show();},2000);
				if (event.isEmpty) {
					return (typeof call_onead ==="function") ? call_onead() : true;
				}
				if( window.innerHeight > 460 ){
					var paddingTop = (( window.innerHeight-460 )/2-10);
					$('.splash').css("padding-top", paddingTop).show();
					$('.banner_close').css("top", paddingTop);
				}
			}
		});

		googletag.enableServices();
	});

	//$(function(){call_dfp();});

})();
