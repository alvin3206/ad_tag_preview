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
  crid:'14348',
  name:'桌機橫幅下推影左圖右',
  tag: '<script id="pps-script-14348" data-width="970" data-height="250" data-click-url="%%CLICK_URL_UNESC%%" data-cache-buster="%%CACHEBUSTER%%" data-dsp-script="" src="https://tenmaxsgads.blob.core.windows.net/holder/14348_ecd31ee439a7.js?cb=1568639403369"></script><ins class="ppstudio" data-pps-target-id="cr-14348"></ins><script async src="https://ads-cdn.tenmax.io/code/ppstudio.js"></script>',
}];

var ppsNumber = ppsTagList.length;

// var gptNumber = document.querySelectorAll("[id*='div-gpt']").length;

document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].addEventListener("click", function() {
  var gptNumber = document.querySelectorAll("[id*='div-gpt']").length;
  console.log(gptNumber);
  document.querySelector("span.badge").innerHTML = gptNumber;
  // document.querySelector(".message-dest").innerHTML = "DFP 廣告空間：" + gptNumber;

  // for (var i = 0; i < gptNumber; i++) {
  if (!($( "[id*='div-gpt']" ).hasClass("gpt_highlight"))) {
    $("[id*='div-gpt']").addClass("gpt_highlight");
  }
  for (var i = 0 ; i < gptNumber ; i++) {
    document.querySelectorAll("[id*='div-gpt']")[i].textContent = "DFP 廣告空間 "+ i;
    $("#dfpDrop").append('<option value="' + i + '">' + '廣告空間 ' + i + '</option>');
  }
  for (var j = 0 ; j < ppsNumber ; j++) {
    $("#ppsDrop").append('<option value="' + ppsTagList[j].crid + '">' + ppsTagList[j].name + '</option>');
  }
});



document.querySelectorAll("#confirmMapping")[0].addEventListener("click", function() {
  var dfpDropNo = document.getElementById("dfpDrop");
  var dfpNoResult = dfpDropNo.options[dfpDropNo.selectedIndex].value;
  var ppsDropNo = document.getElementById("ppsDrop");
  var ppsNoResult = ppsDropNo.options[ppsDropNo.selectedIndex].value;
  for (var m = 0 ; m < ppsNumber ; m++) {
    if (ppsTagList[m].crid === ppsNoResult) {
      document.querySelectorAll("[id*='div-gpt']")[dfpNoResult].innerHTML = ppsTagList[m].tag;
    }
  }

});
