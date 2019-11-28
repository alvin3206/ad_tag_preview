//WAP文章页分享提交
var xy_wapShare = {
	//提交WAP文章分享--分享事件
	commitEvent : function() {
		var aid = xy_wapShare.getarticleID();
		if (!aid) return;
		
		var url = xy_wapShare.urlRoot + "/event";
		var params = {
			id : aid,
			type : 0,
			eventType : 2,
			channel : 1
		}
		$.ajax({url: url, async:true, dataType:"jsonp", jsonp: 'jsoncallback', cache: true, data:params});

	},
	getarticleID : function() {
		
		if(document.getElementById("DocIDforCount")){
			return document.getElementById("DocIDforCount").value;
  		}
		else 
		{
			var params = window.location.href;
			
			var start = params.lastIndexOf("/c");
			if (start < 0) return "";
			
			var end = params.lastIndexOf(".");
			
			if (end >= 0) {
				var id = params.substring(start+2,end);
				return id;
			} else {
				return "";
			}
		}
	}
}
var src = document.currentScript.src ;
src = src.substring(0,src.lastIndexOf("/",src.lastIndexOf("/")-1)) ;
$(function(){
	$.getScript(src+"/common.js",function(){
		xy_wapShare.urlRoot=xyUrl;  //外网api根地址
	});
	$(".shareArt").click(function(){
		xy_wapShare.commitEvent();
	});
})
