var ppsTagList = [{
  crid: '14348',
  name: '桌機橫幅下推影左圖右',
  tag: '<script id="pps-script-14348" data-width="970" data-height="250" data-click-url="%%CLICK_URL_UNESC%%" data-cache-buster="%%CACHEBUSTER%%" data-dsp-script="" src="https://tenmaxsgads.blob.core.windows.net/holder/14348_ecd31ee439a7.js?cb=1568639403369"></script><ins class="ppstudio" data-pps-target-id="cr-14348"></ins><script async src="https://ads-cdn.tenmax.io/code/ppstudio.js"></script>',
}, {
  crid: '14431',
  name: '垂直旋轉魔術方塊',
  tag: 'window.ppsCreatives=window.ppsCreatives||[];window.ppsCreatives.push({creativeId:"14431",layoutId:"vertical_rolling_cube",dpId:"2",targetId:"cr-14431",templateKey:"vertical-rolling-cube",version:"2",editVersion:-1,width:300,height:250,assets:[{"type":"IMAGE","key":"side2","src":"https://ads-cdn.tenmax.io/creative/2019/09/04/14431-side2.jpg?cb=1567585505869"},{"type":"IMAGE","key":"side4","src":"https://ads-cdn.tenmax.io/creative/2019/09/04/14431-side4.jpg?cb=1567585505895"},{"type":"IMAGE","key":"side3","src":"https://ads-cdn.tenmax.io/creative/2019/09/04/14431-side3.jpg?cb=1567585505882"},{"type":"OBJECT","key":"__PARAMETERS__","content":"{\"rotateDirection\":\"upSideDown\",\"rotateDelay\":\"1.5\",\"rotateSpeed\":\"0.8\",\"iconLocation\":\"rightTop\"}"},{"type":"TEXT","key":"name","content":"垂直旋轉魔術方塊_demoforeco"},{"type":"URL","key":"landingPage","content":"https://www.tenmax.io/"},{"type":"URL","key":"landingPage4","content":"https://www.tenmax.io/"},{"type":"URL","key":"landingPage3","content":"https://www.tenmax.io/"},{"type":"URL","key":"landingPage2","content":"https://www.tenmax.io/"},{"type":"VIDEO","key":"side1","src":"https://ads-media-cdn.tenmax.io/asset-0bc54310-281f-40d1-a373-38e480a0a943/8445b00.mp4?sv=2017-04-17&sr=c&si=744af0b0-59ba-41a0-986c-466ec92bf4e3&sig=258sMw8MP0Lal6nod19i0wb1qOwAwjldFcjGFBhZrn0%3D&se=2118-03-29T08%3A25%3A05Z","params":"{\"controlBar\":\"unmute-button-bottom-right\"}"}],config:{"classes":["mobile"]},customScript:"tenmax.js?cb=1568731588422",defaultAutoplay:true});(function(a,e){var d=document.createElement("ins");d.className="ppstudio";for(var r in e)d.setAttribute(r,e[r]);(a.body||a).appendChild(d);var s=document.createElement("script");s.src="https://ads-cdn.tenmax.io/code/ppstudio.js";s.async="async";document.body.appendChild(s)})(document.querySelectorAll("[id*=\'div-gpt\']")[m],{"data-pps-target-id":"cr-14431"});',
}];

var ppsNumber = ppsTagList.length;


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
      console.log(dfpNoResult,ppsNoResult);
      for (var m = 0; m < ppsNumber; m++) {
        if (ppsTagList[m].crid === ppsNoResult) {
          // document.querySelectorAll("[id*='div-gpt']")[dfpNoResult].innerHTML = ppsTagList[m].tag;
          // eval(ppsTagList[m].tag);

          // render after rom changes
          document.querySelectorAll("[id*='div-gpt'] div iframe")[dfpNoResult].contentWindow.document.querySelector("body").innerHTML = ppsTagList[m].tag;
          // document.querySelectorAll("[id*='div-gpt'] div iframe")[m].innerHTML = ppsTagList[dfpNoResult].tag;
          document.querySelectorAll("[id*='div-gpt'] div iframe")[dfpNoResult].contentWindow.location.reload(true);
          // render after rom changes
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