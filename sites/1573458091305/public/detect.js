var md = new MobileDetect(window.navigator.userAgent);
var ownlocation = document.location.href;

if(md.phone()) //phone
{
	//if url contain column/content will jump to phone
	if(ownlocation.indexOf('/column/') >= 0)
	{
		var res = ownlocation.replace("/column/", "/pad/col/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/content/') >= 0)
	{
		var res = ownlocation.replace("/content/", "/pad/con/");
		window.location.href = res;
	}

	else if(ownlocation.indexOf('/pic/') >= 0)
	{
		var res = ownlocation.replace("/pic/", "/pad/pic/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/attachment/') >= 0)
	{
		var res = ownlocation.replace("/attachment/", "/pad/att/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('my/newsletter') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/newsletter.html';
	}
	else if(ownlocation.indexOf('my/p30challenge') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/p30challenge.html';
	}

	else if(ownlocation.indexOf('my/nation') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/nation.html';
	}
	else if(ownlocation.indexOf('my/world') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/world.html';
	}	
	else if(ownlocation.indexOf('my/business') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/business.html';
	}	
	else if(ownlocation.indexOf('my/opinion') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/opinion.html';
	}	
	else if(ownlocation.indexOf('my/mykampung') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/mykampung.html';
	}	
	else if(ownlocation.indexOf('my/entertainment') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/entertainment.html';
	}	
	else if(ownlocation.indexOf('my/sport') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/sport.html';
	}	
	else if(ownlocation.indexOf('my/life') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/life.html';
	}	
	else if(ownlocation.indexOf('my/pocketimes') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/m/pocketimes.html';
	}	
	


	
	//spec for index
	if(ownlocation.indexOf('my/index.html') >= 0)
	{
		console.log("here");
		var res = ownlocation.replace("/index.html", "/pad/col/index.html");
		window.location.href = res;
	}
	else if(ownlocation == "https://www.sinchew.com.my/")
	{
		var res = ownlocation.replace(ownlocation, "https://www.sinchew.com.my/pad/col/index.html");
		window.location.href = res;
	}


	
}
else if(md.tablet()) //tablet
{
	//special for index
	if(ownlocation.indexOf('https://www.sinchew.com.my/pad/col/index.html') >= 0)
	{
		window.location.href = "https://www.sinchew.com.my/";
	}
	else if(ownlocation.indexOf('/pad/col/') >= 0)
	{
		var res = ownlocation.replace("/pad/col/", "/column/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/pad/con/') >= 0)
	{
		var res = ownlocation.replace("/pad/con/", "/content/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/pad/pic/') >= 0)
	{
		var res = ownlocation.replace("/pad/pic/", "/pic/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/pad/att/') >= 0)
	{
		var res = ownlocation.replace("/pad/att/", "/attachment/");
		window.location.href = res;
	}
		else if(ownlocation.indexOf('/m/newsletter') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/newsletter.html';
	}
	else if(ownlocation.indexOf('/m/p30challenge') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/p30challenge.html';
	}
	else if(ownlocation.indexOf('/m/sarawak') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sarawak.html';
	}
	else if(ownlocation.indexOf('/m/sabah') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sabah.html';
	}	
	else if(ownlocation.indexOf('/m/metro') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/metro.html';
	}
	else if(ownlocation.indexOf('/m/johor') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/johor.html';
	}
	else if(ownlocation.indexOf('/m/perak') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/perak.html';
	}	
	else if(ownlocation.indexOf('/m/northern') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/northern.html';
	}	
	else if(ownlocation.indexOf('/m/sembilan') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sembilan.html';
	}	
	else if(ownlocation.indexOf('/m/melaka') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/melaka.html';
	}	
	else if(ownlocation.indexOf('/m/eastcoast') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/eastcoast.html';
	}	
	else if(ownlocation.indexOf('/m/nation') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/nation.html';
	}	
	else if(ownlocation.indexOf('/m/world') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/world.html';
	}
	else if(ownlocation.indexOf('/m/business') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/business.html';
	}	
	else if(ownlocation.indexOf('/m/opinion') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/opinion.html';
	}	
	else if(ownlocation.indexOf('/m/mykampung') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/mykampung.html';
	}	
	else if(ownlocation.indexOf('/m/entertainment') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/entertainment.html';
	}	
	else if(ownlocation.indexOf('/m/sport') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sport.html';
	}
	else if(ownlocation.indexOf('/m/life') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/life.html';
	}	
	else if(ownlocation.indexOf('/m/pocketimes') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/pocketimes.html';
	}	

		
}
else //desktop
{
	//special for index
	if(ownlocation == "https://www.sinchew.com.my/pad/col/index.html")
	{
		window.location.href = "https://www.sinchew.com.my/";
	}
	
	else if(ownlocation.indexOf('/pad/col/') >= 0)
	{
		var res = ownlocation.replace("/pad/col/", "/column/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/pad/con/') >= 0)
	{
		var res = ownlocation.replace("/pad/con/", "/content/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/pad/pic/') >= 0)
	{
		var res = ownlocation.replace("/pad/pic/", "/pic/");
		window.location.href = res;
	}
	else if(ownlocation.indexOf('/pad/att/') >= 0)
	{
		var res = ownlocation.replace("/pad/att/", "/attachment/");
		window.location.href = res;
	}

	else if(ownlocation.indexOf('/m/newsletter') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/newsletter.html';
	}
	else if(ownlocation.indexOf('/m/p30challenge') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/p30challenge.html';
	}
	else if(ownlocation.indexOf('/m/sarawak') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sarawak.html';
	}	
	else if(ownlocation.indexOf('/m/sabah') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sabah.html';
	}
	else if(ownlocation.indexOf('/m/metro') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/metro.html';
	}	
	else if(ownlocation.indexOf('/m/johor') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/johor.html';
	}	
	else if(ownlocation.indexOf('/m/perak') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/perak.html';
	}	
	else if(ownlocation.indexOf('/m/northern') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/northern.html';
	}	
	else if(ownlocation.indexOf('/m/sembilan') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sembilan.html';
	}	
	else if(ownlocation.indexOf('/m/melaka') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/melaka.html';
	}	
	else if(ownlocation.indexOf('/m/eastcoast') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/eastcoast.html';
	}	
	else if(ownlocation.indexOf('/m/nation') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/nation.html';
	}
	else if(ownlocation.indexOf('/m/world') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/world.html';
	}	
	else if(ownlocation.indexOf('/m/business') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/business.html';
	}	
	else if(ownlocation.indexOf('/m/opinion') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/opinion.html';
	}	
	else if(ownlocation.indexOf('/m/mykampung') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/mykampung.html';
	}
	else if(ownlocation.indexOf('/m/entertainment') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/entertainment.html';
	}		
	else if(ownlocation.indexOf('/m/sport') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/sport.html';
	}	
	else if(ownlocation.indexOf('/m/life') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/life.html';
	}
	else if(ownlocation.indexOf('/m/pocketimes') >= 0)
	{
		window.location.href = 'https://www.sinchew.com.my/pocketimes.html';
	}		
		

}
