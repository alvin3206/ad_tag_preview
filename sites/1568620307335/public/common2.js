//側選單顯示 主欄滑開 =======================
(function (){	
	var bMenuStatus = 0; //開關狀態
	
	//覆蓋
	$(".side").after( '<div class="side_overlap" style="width:100%; height:1000px; background:#000; margin-left:200px; position:absolute; top:0px; left:0px; z-index:4; display:none;"></div>' );
	

	// fn 選單開
	function fnNav_1Open( event ){

		var winH = $(window).height();

		bMenuStatus = 1;
		
		$(".side").css({display:"block"});	
		$('.wrapper').css({ height:winH, overflow:"hidden"});	
		$(".header").animate({left:200});
		$(".main").animate({left:200, overflow:"hidden"}, function(){
			$(".side_overlap").show().css({"opacity":"0.2"}).animate({"opacity":"0.5"});
		});
		$(".nav_add").css({"left":"200px"}); 
		$(".nav_1_switch #btn_close").show();
		$(".nav_1_switch #btn_open").hide();
		$(".side_inner").css({overflow:"auto"}).scrollTop(0); 
		//event.stopPropagation(); // 阻止事件冒泡
	}
	
	
	// fn 選單關
	function fnNav_1Close( event ){
		bMenuStatus = 0;
		$(".side_overlap").hide();
		$(".wrapper").css({overflow:"visible"});	
		$(".header").animate({left:0},100);
		$(".main").animate({left:0, overflow:"visible"},100);
		$(".nav_add").css({"left":"0px"}); 
		$(".nav_1_switch #btn_close").hide();
		$(".nav_1_switch #btn_open").show();
		$(".side_inner").css({overflow:"hidden"});  
		//event.stopPropagation(); // 阻止事件冒泡 
	}
	
	
	//點開按鈕 fn 選單開
	$(".nav_1_switch #btn_open").on("click", fnNav_1Open);
		
	//點side_overlap fn 選單關
	$(".side_overlap").on("click", function(){
		if( bMenuStatus === 1){fnNav_1Close();}
	});
	
	//手機旋轉 fn 選單關
	$(window).on("orientationchange", function(){
		if( bMenuStatus === 1){fnNav_1Close();}
	});	
	
})(); 


//ET快訊====================
(function (){
    if( $(".text_ticker_1").length > 0 ){

		//無內容 隱藏
		if($(".text_ticker_1 .run .inner a").length === 0){
			$(".text_ticker_1").hide();
		}else{
			$(".header, .main").addClass("size_1");
			$(".text_ticker_1").css({bottom:'44px'});
			if($(".text_ticker_1 .run .inner a").length > 1){ //1則以上才輪播
				var text_ticker_1 = $(".text_ticker_1 .run .inner").bxSlider({ 
					auto:true,
					speed:500,
					pause:3000,
					controls:false, 
					pager:false,
					autoHover:true,
					onSliderLoad:function(){
						$(".text_ticker_1 .run .inner .piece a").show();
					}
				});
			}
		}
    }
    
})(); 


//圖集=========================
(function (){
	$(".gallery_1").find(".piece:not(:has(img))").remove();
	var mySlider_1 = $('.gallery_1 .run .inner').bxSlider({  
		slideWidth:600,
		auto: true,
		pause : 4000,
		autoDelay:3000,
		captions: true,
		randomStart: true,  
		onSliderLoad : function(){
		$('.gallery_1').css({height:"auto"});
		$('.gallery_1 .run .inner .piece img').show();
		}
	});
})(); 





