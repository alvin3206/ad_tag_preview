/*
需要變數
et_token
kindf_name
*/

// 中華 start
/*
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
var scripts = document.getElementsByTagName("script"),
jssrc = scripts[scripts.length-1].src;
jspath = jssrc.substring(0,jssrc.lastIndexOf("/")+1);
uxd = et_token;  // 填寫區塊；使用者唯一識別
document.write("<script src=" + jspath + "ettodaydmpimg?uxd=" + uxd + "><\/script>");
*/
// 中華 end

// 果實 start
/*
(function () {
  var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
  s.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//ad-specs.guoshipartners.com/static/js/onead-pixel.min.js?_t=" + Math.floor((new Date).getTime() / 300000);
  el.parentNode.insertBefore(s, el);
})();

var onead_pixel = onead_pixel || [];
onead_pixel.push({
  uid: "1000019",
  sessionid: et_token,  // 填寫區塊；使用者唯一識別
  accountid: "",
  category: kindf_name                     // 填寫區塊：分類的英文名稱
});
*/
// 果實 end
