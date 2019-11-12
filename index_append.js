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

    // insert by alvin
    document.querySelectorAll("#confirmMapping")[0].addEventListener("click", function() {

      dfpAreaShow = false;
      console.log("submit");
      var dfpDropNo = document.getElementById("dfpDrop");
      var dfpNoResult = dfpDropNo.options[dfpDropNo.selectedIndex].value;
      var ppsDropNo = document.getElementById("ppsDrop");
      var ppsNoResult = ppsDropNo.options[ppsDropNo.selectedIndex].value;
      for (var g = 0; g < gptNumber; g++) {
        if ($("[id*='div-gpt']").hasClass("gpt_highlight")) {
          console.log("unhighlight");
          $("[id*='div-gpt']:eq(" + g + ")").removeClass("gpt_highlight");
        }
      }

      for (var m = 0; m < ppsNumber; m++) {
        console.log(dfpNoResult);



        if (ppsTagList[m].crid === ppsNoResult) {
          // document.querySelectorAll("[id*='div-gpt']")[dfpNoResult].innerHTML = ppsTagList[m].tag;
          // eval(ppsTagList[m].tag);

          // render after rom changes
          // var speed = 10,
          //   i = 0,
          //   limit = 1;
          // setTimeout(function loop() {


          // work!
          $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe']").html("");
          // document.querySelectorAll("[id*='div-gpt']")[dfpNoResult].innerHTML = ppsTagList[m].tag;
          $("[id*='div-gpt']:eq(" + dfpNoResult + ")").addClass("gpt_highlight");
          var gpt_iframe = $("[id*='div-gpt']:eq(" + dfpNoResult + ") div[id*='google_ads_iframe']").attr("id");
          eval(ppsTagList[m].tag + gpt_iframe + ppsTagList[m].tag_append);



          //   if (i <= limit) {
          //     setTimeout(loop, speed);
          //   }
          // }, speed);
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






var ppsTagList = [
  {
  crid: '14663',
  name: '垂直旋轉魔術方塊',
  tag: 'window.ppsCreatives=window.ppsCreatives||[];window.ppsCreatives.push({creativeId:"14663",layoutId:"vertical_rolling_cube",dpId:"21",targetId:"cr-14663",templateKey:"vertical-rolling-cube",version:"2",editVersion:-1,width:300,height:250,assets:[{"type":"IMAGE","key":"side2","src":"https://ads-cdn.tenmax.io/creative/2019/10/17/14663-side2.jpg?cb=1571282954660"},{"type":"IMAGE","key":"side4","src":"https://ads-cdn.tenmax.io/creative/2019/10/17/14663-side4.jpg?cb=1571282954688"},{"type":"IMAGE","key":"side3","src":"https://ads-cdn.tenmax.io/creative/2019/10/17/14663-side3.jpg?cb=1571282954672"},{"type":"OBJECT","key":"__PARAMETERS__","content":"{\\"rotateDirection\\":\\"upSideDown\\",\\"rotateDelay\\":\\"1.5\\",\\"rotateSpeed\\":\\"0.8\\",\\"iconLocation\\":\\"rightTop\\",\\"iconBackgroundStyle\\":\\"black\\"}"},{"type":"TEXT","key":"name","content":"垂直旋轉魔術方塊_demo勿動"},{"type":"URL","key":"landingPage","content":"https://www.tenmax.io/"},{"type":"URL","key":"landingPage4","content":"https://www.tenmax.io/"},{"type":"URL","key":"landingPage3","content":"https://www.tenmax.io/"},{"type":"URL","key":"landingPage2","content":"https://www.tenmax.io/"},{"type":"VIDEO","key":"side1","src":"https://ads-media-cdn.tenmax.io/asset-8c672efd-163b-4ef4-8e92-fdfed6147bf1/794edfa.mp4?sv=2017-04-17&sr=c&si=5f811678-3109-4e2e-afb9-a56819ac2fe4&sig=PMEtheFmWDcjbKH%2BjU27gq6AM2d7wR0fHAaZmWOYyXc%3D&se=2118-05-11T03%3A29%3A15Z","params":"{\\"controlBar\\":\\"unmute-button-top-left\\"}"}],config:{"classes":["mobile"]},customScript:"",defaultAutoplay:true});(function(a,e){var d=document.createElement("ins");d.className="ppstudio";for(var r in e)d.setAttribute(r,e[r]);(a.body||a).appendChild(d);var s=document.createElement("script");s.src="https://ads-cdn.tenmax.io/code/ppstudio.js";s.async="async";document.body.appendChild(s)})(document.getElementById("',
  tag_append: '"),{"data-pps-target-id":"cr-14663"});',
},
{
  crid: '14471',
  name: '行動置底摩天輪 - 三圖蓋版',
  tag: 'window.ppsCreatives=window.ppsCreatives||[];window.ppsCreatives.push({creativeId:"14471",layoutId:"mobile_bottom_carousel_spin",dpId:"110",targetId:"cr-14471",templateKey:"mobile-bottom-carousel-spin",version:"2",editVersion:-1,width:320,height:568,assets:[{"type":"IMAGE","key":"content-1-bg","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-content-1-bg.png?cb=1568086077732"},{"type":"IMAGE","key":"content-1-fg","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-content-1-fg.png?cb=1568086077722"},{"type":"IMAGE","key":"content-2-bg","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-content-2-bg.png?cb=1568086077763"},{"type":"IMAGE","key":"content-2-fg","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-content-2-fg.png?cb=1568086077752"},{"type":"IMAGE","key":"content-3-bg","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-content-3-bg.png?cb=1568086077801"},{"type":"IMAGE","key":"content-3-fg","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-content-3-fg.png?cb=1568086077791"},{"type":"IMAGE","key":"interstitial-1","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-interstitial-1.jpg?cb=1568086077827"},{"type":"IMAGE","key":"interstitial-2","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-interstitial-2.jpg?cb=1568086077848"},{"type":"IMAGE","key":"interstitial-3","src":"https://ads-cdn.tenmax.io/creative/2019/09/10/14471-interstitial-3.jpg?cb=1568086077866"},{"type":"OBJECT","key":"__PARAMETERS__","content":"{}"},{"type":"OBJECT","key":"__TRACKINGS__","content":"[{\\"type\\":\\"viewable\\",\\"src\\":\\"%%SSP_VIEWABLE_IMPRESSION_URL_UNESC%%\\"},{\\"type\\":\\"viewable\\",\\"src\\":\\"%%VIEWABLE_IMPRESSION_URL_UNESC%%\\"},{\\"type\\":\\"viewable\\",\\"src\\":\\"%%ADX_VIEWABLE_IMPRESSION_URL_UNESC%%\\"},{\\"type\\":\\"impression\\",\\"content\\":\\"<!-- TenMax retargeting Event -->\\\\n<script>\\\\n\\\\n!function(e,t,n,a,o,s,c){e.tpq||(o=e.tpq=function(){o.callMethod?o.callMethod.apply(o,arguments):o.queue.push(arguments)},o.queue=[],o.callMethods=[],s=t.createElement(n),c=t.getElementsByTagName(n)[0],s.async=!0,s.src=a,c.parentNode.insertBefore(s,c))}(window,document,\\\\\\"script\\\\\\",\\\\\\"https://t.tenmax.io/js/loader.js\\\\\\",\\\\\\"tpq\\\\\\");\\\\n\\\\ntpq("init", "066083601869");\\\\ntpq("track", "PageView");\\\\ntpq("trackCustom", "retargeting", {\\\\\\"tag_id\\\\\\":\\\\\\"134418680883\\\\\\"});\\\\n</scr"+"ipt>\\\\n<!-- End TenMax retargeting Event -->\\"}]"},{"type":"TEXT","key":"name","content":"行動置底摩天輪 - 三圖蓋版demo"},{"type":"URL","key":"interstitial-landing-1","content":"https://www.tenmax.io/"},{"type":"URL","key":"interstitial-landing-3","content":"https://www.tenmax.io/"},{"type":"URL","key":"interstitial-landing-2","content":"https://www.tenmax.io/"},{"type":"VAST","key":"VAST","content":"[]"}],config:{"classes":["mobile"]},customScript:"tenmax_eco.js?cb=1573559620924",defaultAutoplay:true});(function(a,e){var d=document.createElement("ins");d.className="ppstudio";for(var r in e)d.setAttribute(r,e[r]);(a.body||a).appendChild(d);var s=document.createElement("script");s.src="https://ads-cdn.tenmax.io/code/ppstudio.js";s.async="async";document.body.appendChild(s)})(document.getElementById("',
  tag_append: '"),{"data-pps-target-id":"cr-14471"});',
},
// {
//   crid: '14780',
//   name: '行動直式下推 - 圖+圖',
//   tag: 'window.ppsCreatives=window.ppsCreatives||[];window.ppsCreatives.push({creativeId:"14780",layoutId:"mobile_vertical_expand_image",dpId:"2",targetId:"cr-14780",templateKey:"mobile-vertical-expand",version:"2",editVersion:-1,width:300,height:250,assets:[{"type":"IMAGE","key":"banner","src":"https://ads-cdn.tenmax.io/creative/2019/11/05/14780-banner.png?cb=1572940185976"},{"type":"IMAGE","key":"content","src":"https://ads-cdn.tenmax.io/creative/2019/11/05/14780-content.jpg?cb=1572940185989"},{"type":"OBJECT","key":"__PARAMETERS__","content":"{\\"backgroundColor\\":\\"\\",\\"autoExpand\\":\\"on\\",\\"timeoutThreshold\\":\\"500\\"}"},{"type":"TEXT","key":"name","content":"alvin test"},{"type":"URL","key":"bannerLandingPage","content":"https://tenmax.io"},{"type":"URL","key":"expandLandingPage","content":"https://tenmax.io"}],config:{"classes":["mobile"]},customScript:"tenmax.js?cb=1573469172398",defaultAutoplay:true});(function(a,e){var d=document.createElement("ins");d.className="ppstudio";for(var r in e)d.setAttribute(r,e[r]);(a.body||a).appendChild(d);var s=document.createElement("script");s.src="https://ads-cdn.tenmax.io/code/ppstudio.js";s.async="async";document.body.appendChild(s)})(document.getElementById("',
//   tag_append: '"),{"data-pps-target-id":"cr-14780"});',
// },
// {
//   crid: '14578',
//   name: '行動置底 - 影+圖2.0',
//   tag: 'window.ppsCreatives=window.ppsCreatives||[];window.ppsCreatives.push({creativeId:"14578",layoutId:"mobile_bottom_expanding_v2_better_ad",dpId:"2",targetId:"cr-14578",templateKey:"bottom-320x50-better-ad",version:"2",editVersion:-1,width:320,height:50,assets:[{"type":"IMAGE","key":"bottom","src":"https://ads-cdn.tenmax.io/creative/2019/10/01/14578-bottom.jpg?cb=1569905290814"},{"type":"OBJECT","key":"__PARAMETERS__","content":"{\\"countDownSeconds\\":\\"0\\",\\"showMain\\":\\"true\\",\\"hideBottom\\":\\"true\\",\\"closeAll\\":\\"false\\",\\"closeBtnPosLeft\\":\\"false\\",\\"heightPercentage\\":\\"25\\",\\"heightPercentageOnlyChrome\\":\\"false\\",\\"transparentBackground\\":\\"true\\"}"},{"type":"TEXT","key":"name","content":"行動置底-影+圖2.0"},{"type":"URL","key":"landingPage","content":"https://www.tenmax.io"},{"type":"VAST","key":"VAST","content":"[]"},{"type":"VIDEO","key":"main","src":"https://ads-media-cdn.tenmax.io/asset-bdf01a63-bc87-404a-a47b-b50e95a68188/1823dbb.mp4?sv=2017-04-17&sr=c&si=d0ab0984-9503-4ead-aa03-982beb24f7a3&sig=%2ByMXxzIZxe0DVkmF1s80Ma6sTshbv4wmjuxuuN2V3d0%3D&se=2118-04-25T04%3A48%3A10Z","params":"{\\"controlBar\\":\\"unmute-button-top-left\\"}"}],config:{"classes":["mobile"]},customScript:"tenmax.js?cb=1573558668202",defaultAutoplay:true});(function(a,e){var d=document.createElement("ins");d.className="ppstudio";for(var r in e)d.setAttribute(r,e[r]);(a.body||a).appendChild(d);var s=document.createElement("script");s.src="https://ads-cdn.tenmax.io/code/ppstudio.js";s.async="async";document.body.appendChild(s)})(document.getElementById("',
//   tag_append: '"),{"data-pps-target-id":"cr-14578"});',
// }
];

var ppsNumber = ppsTagList.length;

// var gptNumber = document.querySelectorAll("[id*='div-gpt']").length;

document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].addEventListener("click", function() {
  gptNumber = document.querySelectorAll("[id*='div-gpt']").length;
  console.log(gptNumber);
  document.querySelector("span.badge").innerHTML = gptNumber;
  // document.querySelector(".message-dest").innerHTML = "DFP 廣告空間：" + gptNumber;

  // for (var i = 0; i < gptNumber; i++) {
  if (($("[id*='div-gpt']").hasClass("gpt_highlight")) && dfpAreaShow == false) {
    console.log("no addClass");
  } else if (($("[id*='div-gpt']").hasClass("gpt_highlight"))) {
    $("[id*='div-gpt']").addClass("gpt_highlight");
  } else {
    $("[id*='div-gpt']").addClass("gpt_highlight");
    for (var i = 0; i < gptNumber; i++) {
      // if(document.querySelectorAll("[id*='div-gpt']")[0].textContent != "DFP 廣告空間 0")
      document.querySelectorAll("[id*='div-gpt']")[i].append("DFP 廣告空間 " + i);

      // document.querySelectorAll("[id*='div-gpt']")[i].textContent = "DFP 廣告空間 "+ i;
      $("#dfpDrop").append('<option value="' + i + '">' + '廣告空間 ' + i + '</option>');
    }
    for (var j = 0; j < ppsNumber; j++) {
      $("#ppsDrop").append('<option value="' + ppsTagList[j].crid + '">' + ppsTagList[j].name + '</option>');
    }
    $("#dfpDrop option:eq(0)").attr("selected","selected");
    $("#ppsDrop option:eq(0)").attr("selected","selected");


  }
  dfpAreaShow = true;
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
