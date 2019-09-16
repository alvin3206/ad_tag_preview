

//logo_ettoday =======================================
(function(){
	var etLogoRightNow = new Date();
	var etLogoStartTime = new Date(2019, 9-1, 13, 0, 0, 0); // 結束時間 (年,月(0-11),日,時,分,秒)
	var etLogoEndTime = new Date(2019, 9-1, 15, 23, 59, 59); // 結束時間 (年,月(0-11),日,時,分,秒)
	var etLogoSrc = "https://static.ettoday.net/style/ettoday2017/images/logo/moon-2019.gif"; //圖檔路徑
	
	if (etLogoRightNow > etLogoStartTime && etLogoRightNow < etLogoEndTime) {
		//上檔期間-節慶Logo
		document.write('<a href="http://www.ettoday.net/?from=logo" title="回首頁"><img src="'+etLogoSrc+'" border="0" alt="ETtoday 新聞雲"/></a>');
	}else{
		//下檔期間-預設Logo
		document.write('<a href="http://www.ettoday.net/?from=logo" title="回首頁"><img src="//static.ettoday.net/style/ettoday2017/images/logo_ettoday.png" border="0" alt="ETtoday 新聞雲"/></a>');
	}
})();





