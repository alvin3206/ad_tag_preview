$(".bubble").draggable();
var isMoving = false;
var isdragging = false;
var chatMode = false;
var dfpAreaShow = true;
var gptNumber = 0;

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

    $('#dfpDrop').on('change', function() {
      var dfpDropNo = document.getElementById("dfpDrop");
      var dfpNoResult = dfpDropNo.options[dfpDropNo.selectedIndex].value;
      var spaceHeight = $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe'] iframe").attr("height");
      var spaceWidth = $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe'] iframe").attr("width");
      console.log(spaceHeight + "," + spaceWidth);
      $("#spaceSize").html(spaceWidth + "px * " + spaceHeight + "px");
    });



    document.querySelectorAll("#confirmMapping")[0].addEventListener("click", function() {

      dfpAreaShow = false;
      console.log("submit");
      var dfpDropNo = document.getElementById("dfpDrop");
      var dfpNoResult = dfpDropNo.options[dfpDropNo.selectedIndex].value;

      for (var g = 0; g < gptNumber; g++) {
        if ($("[id*='div-gpt']").hasClass("gpt_highlight")) {
          console.log("unhighlight");
          $("[id*='div-gpt']:eq(" + g + ")").removeClass("gpt_highlight");
        }
      }
          // work!
          var spaceHeight = $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe'] iframe").attr("height");
          var spaceWidth = $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe'] iframe").attr("width");
          $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe']").html("<iframe src='public/append.html' class='adFrame' width='" + spaceWidth + "' height=' " + spaceHeight + "'></iframe>");
          $("[id*='div-gpt']:eq(" + dfpNoResult + ")").addClass("gpt_highlight");

      document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].click();

    });
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

document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].addEventListener("click", function() {
  gptNumber = document.querySelectorAll("[id*='div-gpt']").length;
  console.log(gptNumber);
  document.querySelector("span.badge").innerHTML = gptNumber;

  if (($("[id*='div-gpt']").hasClass("gpt_highlight")) && dfpAreaShow == false) {

    console.log("no addClass");

  } else if (($("[id*='div-gpt']").hasClass("gpt_highlight"))) {

    $("[id*='div-gpt']").addClass("gpt_highlight");

  } else {

    $("[id*='div-gpt']").addClass("gpt_highlight");

    for (var i = 0; i < gptNumber; i++) {

      document.querySelectorAll("[id*='div-gpt']")[i].append("DFP Ad space " + i);
      $("#dfpDrop").append('<option value="' + i + '">' + 'Ad space ' + i + '</option>');
    }
    $("#dfpDrop option:eq(0)").attr("selected","selected");
  }
  dfpAreaShow = true;
});
