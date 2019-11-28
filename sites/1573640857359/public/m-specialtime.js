function timeago(date)
{   
	//var date=document.getElementById("time1").innerHTML;
	
	//var dateTimeStamp = new Date(date).getTime(); //safari and ie cant work with this
	var dateTimeStamp = moment(date,'YYYY-MM-DD HH:mm:ss'); //use moment to work at all browser
	//alert(dateTimeStamp + "\n" + dateTimeStamp2);
    var minute = 1000 * 60;    
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime(); 
	
	//alert(now);
	//console.log(now)
    var diffValue = now - dateTimeStamp;
	
    if(diffValue < 0)
	{
        return;
    }
	
    var minC = diffValue/minute;  
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
	
	//alert(minC + "\n" + hourC + "\n" + dayC + "\n" + weekC + "\n" + monthC);
	
    if(monthC >= 1 && monthC <= 12)
		{result = " " + parseInt(monthC) + "月前"}
	else if(weekC >= 1 && weekC <= 4)
		{result = " " + parseInt(weekC) + "周前"}
	else if(dayC >= 1 && dayC <= 30)
		{result = " " + parseInt(dayC) + "天前";}
	else if(hourC >= 1 && hourC <= 24)
		{result = " " + parseInt(hourC) + "小时前"}
	else if(minC >= 1 && minC <= 60)
		{result =" " + parseInt(minC) + "分钟前"}
	else if(diffValue >= 0 && diffValue <= minute)
		{result = "刚刚"}
	else 
	{
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}

currentIndex = 0;

function getaid()
{
	n = $("#articlenum articleID").length;
	
	if(currentIndex >= n)
	{ 
		return;
	}
	
	aid = $("#articlenum articleID").eq(currentIndex).text();
	
	var url = 'https://www.sinchew.com.my/app_if/getArticleCountInfo?cid=1';
	  $.ajax ({
		url:url,
		data:"aid="+aid,
		type:'GET',
		async: false,
		cache: true,
		dataType:'json',
		success:function(data)
		{	
			var id = data.id;
			var clicknum = data.click_count;
			var sharenum = data.share_count;
			var disnum = data.comment_count;

			$('#clicknum #spid' + aid).html(clicknum);
			$('#sharenum #spid' + aid).html(sharenum);
			$('#disnum #spid' + aid).html(disnum);
			
			currentIndex ++;
			getaid();
		}		
	}) 
}

window.onload=function()
{
	var dirindex = $("#dirnum p").length;
	for (i=0 ;i < dirindex ;i++){
		advert(i);
	}
	
	n = $("#time showtime").length;
	for (i=0 ;i < n ;i++)
	{
		date = $("#time showtime").eq(i).text();
		$("#time showtime").eq(i).text(timeago(date));
	}
	
	getaid();
	
	myFav.init();

}

function gethotarticle(huatiid,columnappend,huatiamount)
{
	if(huatiid == null)
	{
		//do nothing
	}
	else if(huatiid == "")
	{
		//do nothing
	}
	else
	{
		var url = 'https://www.sinchew.com.my/app_if/webTopicsByGroup?siteID=1';
		  $.ajax ({
			url:url,
			data:{"page":"0","groupID":huatiid},
			type:'GET',
			async: false,
			cache: true,
			dataType:'text',
			success:function(data)
			{	 
				datalist = JSON.parse(data).list;
				
				//如果现有话题数量 少于需求话题数量 选择现有话题数量 这样就不会出现js报错
				var compare = (datalist.length < huatiamount)  ?  datalist.length : huatiamount;
				
				for(var i=0;i<compare;i++)
				{
					var title = datalist[i].title;
					var publishtime = datalist[i].publishtime;
					var topicID = datalist[i].topicID;
					if (parseInt(topicID)) //topicID 有数字
					{
						document.getElementById(columnappend).style.display = "inline-block";
						$("#"+ columnappend).append("<div class='m-menu-son2'><a style='color:#cd2026;' href='https://www.sinchew.com.my/pad/col/node_147.html?topicId=" + topicID + "'>" + title + "</a></div>");
					}
				}
			}		
		}) 
	}
}

function gettopten(columnappend,huatiamount)
{
	var url = 'https://www.sinchew.com.my/app_if/topics?siteID=1&page=0';
	  $.ajax ({
		url:url,
		//data:{"page":"0","groupID":'1'},
		type:'GET',
		async: false,
		cache: true,
		dataType:'text',
		success:function(data)
		{	 
			datalist = JSON.parse(data).list;
			
			//如果现有话题数量 少于需求话题数量 选择现有话题数量 这样就不会出现js报错
			var compare = (datalist.length < huatiamount)  ?  datalist.length : huatiamount;
			
			for(var i=0;i<compare;i++)
			{
				var title = datalist[i].title;
				var publishtime = datalist[i].publishtime;
				var topicID = datalist[i].topicID;
				if (parseInt(topicID)) //topicID 有数字
				{
					//document.getElementById(columnappend).style.display = "inline-block";
					$("#"+ columnappend).append("<div class='toptenlist' style='color:red;'>" + (i+1) + ". <a href='https://www.sinchew.com.my/pad/col/node_147.html?topicId=" + topicID + "'>" + title + "</a></div><hr class='toptenhr'>");
				}
			}
		},
		error:function(data)
		{
			document.getElementById(columnappend).style.display = "inline-block";
			$("#"+ columnappend).append(data);
		}
	}) 
}

function gethuatipicBig(huatiid,columnappend,huatiamount)
{
	var url = 'https://www.sinchew.com.my/app_if/webTopicsByGroup?siteID=1';
	  $.ajax ({
		url:url,
		data:{"page":"0","groupID":huatiid},
		type:'GET',
		async: false,
		cache: true,
		dataType:'text',
		success:function(data)
		{	 
			datalist = JSON.parse(data).list;
			for(var i=0;i<huatiamount;i++)
			{
				var picBig = datalist[i].picBig;
				var publishtime = datalist[i].publishtime;
				var topicID = datalist[i].topicID;
				if (parseInt(topicID)) //topicID 有数字
				{
					document.getElementById(columnappend).style.display = "inline-block";
					$("#"+ columnappend).append("<div class='m-menu-son2' style='color:red;'><a href='https://www.sinchew.com.my/pad/col/node_147.html?topicId=" + topicID + "'>" + picBig + "</a></div>");
				}
			}
		}		
	}) 
}

function headerhottopic(huatiid,columnappend,huatiamount)
{
	var url = 'https://www.sinchew.com.my/app_if/webTopicsByGroup?siteID=1';
	  $.ajax ({
		url:url,
		data:{"page":"0","groupID":huatiid},
		type:'GET',
		async: false,
		cache: true,
		dataType:'text',
		success:function(data)
		{	 
			datalist = JSON.parse(data).list;
			
			//如果现有话题数量 少于需求话题数量 选择现有话题数量 这样就不会出现js报错
			var compare = (datalist.length < huatiamount)  ?  datalist.length : huatiamount;
			
			for(var i=0;i<compare;i++)
			{
				var title = datalist[i].title;
				var publishtime = datalist[i].publishtime;
				var topicID = datalist[i].topicID;
				
				if(i == (compare -1)) 
					var zz ="last-hr";
				else 
					var zz = "";
				
				var zzztime = publishtime.substring(0, 10);
				
				if (parseInt(topicID)) //topicID 有数字
				{
					//document.getElementById(columnappend).style.display = "inline-block";
					$("#"+ columnappend).append("<div class='header-top-topic' ><a href='https://www.sinchew.com.my/pad/col/node_147.html?topicId=" + topicID + "'>" + title + "</a><div class='top-left-hottopic-time'>" + zzztime + "</div></div><hr class='top-left-hottopic-hr' id='" + zz + "'>");
				}
			}
		}		
	}) 
}
