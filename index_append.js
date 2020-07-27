//credit: Draggable Chat Heads By Dronca Raul on https://codepad.co/snippet/draggable-chat-heads-material-chat

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
      // var spaceHeight = $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe'] iframe").attr("height");
      // var spaceWidth = $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe'] iframe").attr("width");
      var spaceWidth = $("iframe[id*='google_ads_iframe_']:eq(" + dfpNoResult + ")").attr("width");
      var spaceHeight = $("iframe[id*='google_ads_iframe_']:eq(" + dfpNoResult + ")").attr("height");

      console.log(spaceHeight + "," + spaceWidth);
      $("#spaceSize").html(spaceWidth + "px * " + spaceHeight + "px");
    });



    document.querySelectorAll("#confirmMapping")[0].addEventListener("click", function() {

      dfpAreaShow = false;
      console.log("submit");
      var dfpDropNo = document.getElementById("dfpDrop");
      var dfpNoResult = dfpDropNo.options[dfpDropNo.selectedIndex].value;

      for (var g = 0; g < gptNumber; g++) {
        if ($("iframe[id*='google_ads_iframe_']").parent().hasClass("gpt_highlight")) {
          console.log("unhighlight");
          $("iframe[id*='google_ads_iframe_']:eq(" + g + ")").parent().removeClass("gpt_highlight");

        }
      }
      // work!
      var spaceWidth = $("iframe[id*='google_ads_iframe_']:eq(" + dfpNoResult + ")").attr("width");
      var spaceHeight = $("iframe[id*='google_ads_iframe_']:eq(" + dfpNoResult + ")").attr("height");
      $("iframe[id*='google_ads_iframe_']:eq(" + dfpNoResult + ")").parent().html("<iframe src='public/append.html' class='adFrame' id='google_ads_iframe_" + dfpNoResult + "' width='" + spaceWidth + "' height=' " + spaceHeight + "'></iframe><span class='spaceTag'> DFP Ad space " + dfpNoResult + "</span>");
      // $("iframe[id*='google_ads_iframe_']:eq(" + dfpNoResult + ")").parent().addClass("gpt_highlight");
      $(".spaceTag").addClass("invisible");

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
  gptNumber = $("iframe[id*='google_ads_iframe_']").length;
  console.log(gptNumber);
  document.querySelector("span.badge").innerHTML = gptNumber;
  if (dfpAreaShow === true) {
    $("iframe[id*='google_ads_iframe_']").parent().addClass("gpt_highlight");
    var tagAdd = $(".spaceTag")[0];
    if (tagAdd) {
      $(".spaceTag").removeClass("invisible");
    } else {
      for (var i = 0; i < gptNumber; i++) {
        $("iframe[id*='google_ads_iframe_']:eq(" + i + ")").parent().append("<span class='spaceTag'> DFP Ad space " + i + "</span>");
        $("#dfpDrop").append('<option value="' + i + '">' + 'Ad space ' + i + '</option>');
        $("#dfpDrop option:eq(0)").attr("selected", "selected");
      }
    }
  }

  dfpAreaShow = true;
});
