!function(e,a){if(!(window.ivsPlayerInfo||e.location.href.indexOf("ivs=disabled")>0)){var s,i,t={},r="",c="",n="7.2.1910301156",d=function(e,a){return decodeURIComponent(e.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(a).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))};if((r=a.currentScript||a.querySelector("script[src*='js/ivsnload_v1.']"))&&null!=r&&(s=(c=r.src).substr(0,c.indexOf("js/ivsnload_v1.")),!(c.indexOf("?")<0)&&(t.apiKey=d(c,"key"),t.wId=d(c,"wid"),t.vId=d(c,"vid"),t.env=d(c,"env"),t.apiKey&&t.wId))){t.account=t.wId.substr(0,8),t.env=t.env?t.env.toLowerCase():"prod",window.ivsPlayerInfo={ivsApiKey:t.apiKey,ivsWidgetID:t.wId,ivsVideoID:t.vId,ivsDomain:t.env},t.vId&&(window.ivsPlayerInfo.ivsVideoID=t.vId);var o=(t.account,"7");if(i=d(e.location.search,"ivsnver")||o,n=i+n.substr(n.indexOf("."),n.length),!a.getElementById("ivs-widget-"+t.wId)){var p=a.createElement("div");p.id="ivs-widget-"+t.wId,r.parentNode.insertBefore(p,r.nextSibiling)}var l=function(a,s,i,t,r){var c=a.createElement(s),n=a.getElementsByTagName(s)[0];for(var o in"img"===s&&(n=a.getElementsByTagName("body").lastElementChild),t)c[o]=t[o];if(("script"===s||"link"===s)&&(c.charset="utf-8",r&&(c.onload=r),"false"!==d(e.location.search,"ivsscriptpreload"))){var p=t.href||t.src;if(p){var l=a.createElement("link");l.href=p,l.rel="preload",l.as=i.indexOf("script")>=0?"script":"style",a.head.appendChild(l)}if("link"===s&&i.indexOf("script")>=0)return}"script"===s&&("true"===d(e.location.search,"ivsscriptdefer")&&(c.defer=!0),"true"===d(e.location.search,"ivsscriptasync")&&(c.async=!0)),"iframe"===s?a.body.appendChild(c):n?n.parentNode.insertBefore(c,n):a.head.appendChild(c)};if("3"===i){var v=a.getElementById("ivs-widget-"+t.wId),f=t.apiKey;if(!t.apiKey||"x0hySnavrT3936DPoxM078G09pqdXVG53pwvnw3K"==t.apiKey)switch(t.account){case"f2de0a86":case"439a7c64":f="5f5883c5d281f88e140b49c401e5094d";break;case"441850eb":f="e48e3f141bc2312a579dc37f38e655bf";break;case"5e38a739":f="a8d717c1a0c875a294c0278b29fb9424";break;case"6bd2db2b":f="503dc018d623511c7c41cae673334e98";break;case"ac37dab5":f="26c101c9bfa05a572e6c9145c733bc9a";break;case"5538f8d4":f="3417de65d36df189d8992b40c31c4628";break;case"763e9270":f="d52ab655ffac53d7f87ce76e3d07f4bd";break;case"19b6025e":f="f7ce9b3c96499f99cb3ff4473d7cf232";break;case"b40fba01":f="7d1a94cff79086091ad6c7dd2e316802";break;case"5d9e8c26":f="74c32676cdb29808238374d5413e9c80"}v.innerHTML='<ivs-video api-key="'+f+'" id="ivsplayer001"></ivs-video><ivs-playlist type="carousel" widget-id="'+t.wId+'" ivs-video-id="ivsplayer001"></ivs-playlist>',l(a,"script","text/javascript",{src:"https://player.ivideosmart.com/ivsplayer/v3/sp-tools.bundle.js"})}else if("6"===i||"7"===i){var y,m;if(s)y=s+"style/player_v"+i+".10301156.css",m=s+"js/player_v"+i+".10301156.js";else if(e.location.href.indexOf("test-kompas")>0)y="https://s3-ap-southeast-1.amazonaws.com/player.ivideosmart.com/kompas/ivideosense/player/style/player_v"+i+".10301156.css",m="https://s3-ap-southeast-1.amazonaws.com/player.ivideosmart.com/kompas/ivideosense/player/js/player_v"+i+".10301156.js";else if("prod"==t.env)y="https://player.ivideosmart.com/ivideosense/player/style/player_v"+i+".10301156.css",m="https://player.ivideosmart.com/ivideosense/player/js/player_v"+i+".10301156.js";else if("staging"==t.env)y="https://s3-ap-southeast-1.amazonaws.com/player.ivideosmart.com/staging/ivideosense/player/style/player_v"+i+".10301156.css",m="https://s3-ap-southeast-1.amazonaws.com/player.ivideosmart.com/staging/ivideosense/player/js/player_v"+i+".10301156.js";else{if("dev"!=t.env)return;y="https://dev.ad2engage.com/player/plugin/style/player_v"+i+".css",m="https://dev.ad2engage.com/player/plugin/js/player_v"+i+".js"}var g=d(e.location.search,"ivsnplayercss");g&&(y=g);var h=d(e.location.search,"ivsnplayerjs");h&&(m=h),Math.random()<.1&&l(a,"script","text/javascript",{src:"//d2wy8f7a9ursnm.cloudfront.net/v4/bugsnag.min.js"},function(){var e=function(){switch(t.env){case"prod":return"production";case"dev":return"development";case"staging":return"staging"}}();window.bugsnagClient=bugsnag({apiKey:"0c3a4199ced9194dae790eee6cdd7165",appVersion:n,releaseStage:e,beforeSend:function(e){for(var a=0;a<e.stacktrace.length;a++)if(/ivideosense\/player\/js\/player_v/g.test(e.stacktrace[a].file))return!0;return!1}})}),l(a,"link","text/css",{href:y,rel:"stylesheet"}),l(a,"script","text/javascript",{src:m}),l(a,"img","image/gif",{src:"https://sync.search.spotxchange.com/partner?source=224626&sync_limit=7",style:"display:none !important"}),l(a,"iframe","text/javascript",{src:"https://cdn.aralego.net/ucfad/cookie/sync.html",style:"display:none"})}}}}(window,document);