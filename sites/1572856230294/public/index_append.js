$(".bubble").draggable();
var isMoving = false;
var isdragging = false;
var chatMode = false;

function closeChat() {
  $(".bubble").css("top", "50%").css("left", "-25px").css("transition", "all 0.5s");
  $(".chat").addClass("bounceout").removeClass("bouncein");
  $(".chat").replaceWith($(".chat").clone(true));
}
$(".bubble").on("click", function() {
  var pos = $(".chat_container").offset();
  if (chatMode) {
    closeChat();
    chatMode = false;
  } else {
    $(".chat").addClass("bouncein").removeClass("bounceout");
    $(".bubble").css("top", (80) + "px").css("left", (pos.left - 30) + "px").css("transition", "all 0.3s");
    $(".chat").replaceWith($(".chat").clone(true));
    chatMode = true;

    // insert by alvin
    document.querySelectorAll("#confirmMapping")[0].addEventListener("click", function() {
      console.log("submit");
      var dfpDropNo = document.getElementById("dfpDrop");
      var dfpNoResult = dfpDropNo.options[dfpDropNo.selectedIndex].value;
      var ppsDropNo = document.getElementById("ppsDrop");
      var ppsNoResult = ppsDropNo.options[ppsDropNo.selectedIndex].value;
      for (var m = 0; m < ppsNumber; m++) {
        if (ppsTagList[m].crid === ppsNoResult) {
          console.log(dfpNoResult,ppsNoResult,m);

            document.querySelectorAll("[id*='div-gpt']")[dfpNoResult].innerHTML = ppsTagList[m].tag;

        }


      }
      document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].click();
    });
    // insert by alvin
  }
});
$(".bubble").mousedown(function() {
  isdragging = false;
});
$(".bubble").mousemove(function() {
  isdragging = true;
  $(this).css("transition", "all 0s");
});
$(".bubble").mouseup(function(e) {
  e.preventDefault();
  var lastY = window.event.clientY;
  var lastX = window.event.clientX;
  var swidth = $(window).width();
  if (isdragging) {
    if (chatMode) {
      chatMode = false;
      closeChat();
    }
    if (lastX > (swidth / 2)) {
      $(this).css("top", lastY).css("left", (swidth - 55) + "px").css("transition", "all 0.4s");
    } else {
      $(this).css("top", lastY).css("left", "-25px").css("transition", "all 0.4s");
    }
  }
});






var ppsTagList = [{
  crid: '14348',
  name: '桌機橫幅下推影左圖右',
  tag: '<script id="pps-script-14348" data-width="970" data-height="250" data-click-url="%%CLICK_URL_UNESC%%" data-cache-buster="%%CACHEBUSTER%%" data-dsp-script="" src="https://tenmaxsgads.blob.core.windows.net/holder/14348_ecd31ee439a7.js?cb=1568639403369"></script><ins class="ppstudio" data-pps-target-id="cr-14348"></ins><script async src="https://ads-cdn.tenmax.io/code/ppstudio.js"></script>',
}, {
  crid: '14431',
  name: '垂直旋轉魔術方塊',
  tag: '<div id="tenmax-pps-video-image-stacking"> <div class="tenmax-pps-ad-video-wrapper tenmax-pps-ad-video-wrapper"> <div id="tenmax-pps-ad-video"> <a href="https://tenmax.io" target="_blank" draggable="false"> <div id="tenmax-video-player" class="video_container mobile" data-rmax-widget-type="video-player"><video src="https://tenmaxsgstatic.blob.core.windows.net/ssp/tenmax%20ad.mp4" playsinline="playsinline" muted="muted"></video> <div class="jumbo-play-btn-overlay playing"> <div><span class="jumbo-play-btn"></span></div> </div> <div class="video_controls volume-off playing"> <div class="control play"> <div><span></span></div> </div> <div class="control pause"> <div><span></span></div> </div> <div class="progress-bar"> <div class="progress-fill" style="width: 19.5997%;"></div> </div> <div class="control volume"> <div><span></span></div> <div class="control volume-slider_container"><input class="volume-slider" type="range" min="0.01" max="1" step="0.01" style="background: linear-gradient(to right, currentcolor 0%, currentcolor 100%, rgb(240, 240, 240) 100%);"></div> </div> <div class="control fullscreen"> <div><span></span></div> </div> </div> <div class="unmute-btn volume-off playing"> <div class="unmute-btn-inner"> <div class="volume"> <div><span></span></div> </div> <div class="label">Tap to Unmute</div> </div> </div> </div> </a> </div> </div> <div id="tenmax-pps-ad-companion" class="companion companion"> <a href="https://tenmax.io" target="_blank" draggable="false"> <img src="https://tenmaxsgads.blob.core.windows.net/creative-sample/600x162.jpg"> </a> </div> </div><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/start?crid=video_overlay_top_full_v2-sample&amp;asset_key=video" style="display: none;"><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/visible?crid=video_overlay_top_full_v2-sample&amp;asset_key=video" style="display: none;"><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/vimpre?crid=video_overlay_top_full_v2-sample" style="display: none;"><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/visible?crid=video_overlay_top_full_v2-sample&amp;asset_key=image" style="display: none;"><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/firstQuartile?crid=video_overlay_top_full_v2-sample&amp;asset_key=video" style="display: none;"><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/midpoint?crid=video_overlay_top_full_v2-sample&amp;asset_key=video" style="display: none;"><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/thirdQuartile?crid=video_overlay_top_full_v2-sample&amp;asset_key=video" style="display: none;"><img src="//ads.tenmax.io/track/7d47d911-fee4-11e9-8aa4-5be36de24051/complete?crid=video_overlay_top_full_v2-sample&amp;asset_key=video" style="display: none;">',
}];

var ppsNumber = ppsTagList.length;

// var gptNumber = document.querySelectorAll("[id*='div-gpt']").length;

document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].addEventListener("click", function() {
  var gptNumber = document.querySelectorAll("[id*='div-gpt']").length;
  console.log(gptNumber);
  document.querySelector("span.badge").innerHTML = gptNumber;
  // document.querySelector(".message-dest").innerHTML = "DFP 廣告空間：" + gptNumber;

  // for (var i = 0; i < gptNumber; i++) {
  if (!($("[id*='div-gpt']").hasClass("gpt_highlight"))) {
    $("[id*='div-gpt']").addClass("gpt_highlight");
    for (var i = 0; i < gptNumber; i++) {
      document.querySelectorAll("[id*='div-gpt']")[i].append("DFP 廣告空間 " + i);
      // document.querySelectorAll("[id*='div-gpt']")[i].textContent = "DFP 廣告空間 "+ i;
      $("#dfpDrop").append('<option value="' + i + '">' + '廣告空間 ' + i + '</option>');
    }
    for (var j = 0; j < ppsNumber; j++) {
      $("#ppsDrop").append('<option value="' + ppsTagList[j].crid + '">' + ppsTagList[j].name + '</option>');
    }
  }

});



// document.querySelectorAll("#confirmMapping")[0].addEventListener("click", function() {
//   console.log("submit");
//   var dfpDropNo = document.getElementById("dfpDrop");
//   var dfpNoResult = dfpDropNo.options[dfpDropNo.selectedIndex].value;
//   var ppsDropNo = document.getElementById("ppsDrop");
//   var ppsNoResult = ppsDropNo.options[ppsDropNo.selectedIndex].value;
//   for (var m = 0 ; m < ppsNumber ; m++) {
//     if (ppsTagList[m].crid === ppsNoResult) {
//       document.querySelectorAll("[id*='div-gpt']")[dfpNoResult].innerHTML = ppsTagList[m].tag;
//     }
//   }
//   document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].click();
// });
