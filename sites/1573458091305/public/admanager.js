var innity_pub=innity_zone=0;function innity_adZone(pub,zone,settings){var version=1;var output=this.get_output();var viewport=this.get_viewport();var prebid={timeout:700};this.syndURL=this.get_protocol()+"//as.innity.com/synd/?";this.keys=[];if(this.syndURL!=""){this.syndURL+="cb="+new Date().getTime();this.append_url("ver",version);this.append_url("pub",pub);this.append_url("zone",zone);this.append_url("output",output);this.append_url("flash",this.get_flash());this.append_url("ios",this.is_ios());this.append_url("url",encodeURIComponent(this.get_url()));settings.width?(this.append_url("width",settings.width),this.append_url("height",settings.height)):(this.append_url("width","*"),this.append_url("height","*"));settings.sub0&&this.append_url("sub0",encodeURIComponent(settings.sub0));settings.channel&&this.append_url("cat",settings.channel);this.collide=false;try{this.collide=top.document.iCollide?true:false;}catch(e){this.collide=document.iCollide?true:false;}this.collide&&this.append_url("collide","1");try{"undefined"!=typeof $sf&&this.append_url("sf","1");}catch(e){}try{this.append_url("vpw",viewport[0]);this.append_url("vph",viewport[1]);}catch(e){}window.gInnity_auctionID=window.gInnity_auctionID||(Math.random().toString(16).substr(8)+"-"+Math.random().toString(16).substr(8));this.append_url("auction",window.gInnity_auctionID);this.get_format_cap();this.do_targeting();this.xdebug();}try{window.gInnity_zone=window.gInnity_zone||{};if(!window.gInnity_zone["z"+zone]){prebid.handler=new innity_postbidWrapper(zone,{});prebid.id=prebid.handler.get_request_id();if(this.syndURL!=""&&pub!=0&&zone!=0){if(output=="js"||output=="js_framed"){innity_pub=pub;innity_zone=zone;settings.innity_pvu?innity_pvu=settings.innity_pvu:"";settings.innity_pcu?innity_pcu=settings.innity_pcu:"";settings.innity_peu?innity_peu=settings.innity_peu:"";settings.innity_balloon_pos?innity_balloon_pos=settings.innity_balloon_pos:"";if(prebid.id){document.write('<ins id="div-innity-'+prebid.id+'" style="display:inline-block;width:'+settings.width+'px;height:'+settings.height+'px;margin:0px;padding:0px;border:0;background-color:transparent;visibility:visible;"></ins>');var self=this;function _write(){var res=prebid.handler.get_bid_response(prebid.id);if(res&&res.result.cpm){self.append_url("prebid",Math.round((parseInt(res.result.cpm)/100)));self.append_url("bidID",prebid.id);}else{self.append_url("prebid","0");}self.write({url:self.syndURL,parentNode:"div-innity-"+prebid.id,zone:zone,width:settings.width,height:settings.height});};window.setTimeout(_write,prebid.timeout);}else{this.write({url:this.syndURL});}}else{innity_write_iframe(this.syndURL,settings);}window.gInnity_zone["z"+zone]=true;}}}catch(e){}};innity_adZone.prototype.amp=function(data){};innity_adZone.prototype.append_url=function(key,value){value&&(this.syndURL+="&"+key+"="+value);};innity_adZone.prototype.is_ios=function(){return /iPad|iPhone|iPod/.test(navigator.userAgent)&& !window.MSStream?1:0;};innity_adZone.prototype.get_flash=function(){var fp=navigator.plugins["Shockwave Flash"];if(fp&&fp.description){return "1";}else if(window.ActiveXObject){for(fp=7;fp<=100;fp++){try{var oFlash=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+fp+"');");if(oFlash){return "1";break;}}catch(e){}}}return "0";};innity_adZone.prototype.get_format_cap=function(){var key="innity.zone.cap.format",res=this.get_store(key),cap=[],now=new Date().getTime()/1000;if(res){res=JSON.parse(res);for(var id in res){res[id]>now&&(cap.push(id));}}0<cap.length&&(cap=cap.join(","),this.append_url("fcap",cap));};innity_adZone.prototype.get_output=function(){try{var isInIframe=self!==top;if(isInIframe){try{return top.document.domain===document.domain?"js":"js_framed";}catch(e){return "js_framed";}}}catch(e){}return "js";};innity_adZone.prototype.get_protocol=function(){return location.protocol.indexOf("https")> -1?"https:":"http:";};innity_adZone.prototype.get_store=function(key){try{return localStorage.getItem(key);}catch(e){return false;}};innity_adZone.prototype.get_url=function(){var loc=window.location;if(loc.ancestorOrigins&&loc.ancestorOrigins.length){loc=loc.ancestorOrigins[loc.ancestorOrigins.length-1];loc=new URL(loc);loc=loc.hostname;}else{try{loc=top.document.domain;}catch(e){loc=document.referrer;try{loc=new URL(loc);loc=loc.hostname;}catch(e){loc=encodeURIComponent(loc);}}}return loc;};innity_adZone.prototype.get_viewport=function(){try{var doc=top.document.documentElement,g=(e=top.document.body)&&top.document.clientWidth&&top.document.clientHeight;}catch(e){var doc=document.documentElement,g=(e=document.body)&&document.clientWidth&&document.clientHeight;}var vp=[];doc&&doc.clientWidth&&doc.clientHeight&&("CSS1Compat"===document.compatMode|| !g)?vp=[doc.clientWidth,doc.clientHeight]:g&&(vp=[doc.clientWidth,doc.clientHeight]);return vp;};innity_adZone.prototype.set_format_cap=function(id,sec){if(id){var key="innity.zone.cap.format",res=this.get_store(key),now=new Date().getTime()/1000,data={};if(res){data=JSON.parse(res);for(var fid in data){data[fid]<now&&(delete data[fid]);}}data[id]=Math.round(now+sec);this.set_store(key,JSON.stringify(data));}};innity_adZone.prototype.set_store=function(key,value){if(value){try{return localStorage.setItem(key,value);}catch(e){}}};innity_adZone.prototype.set_targeting=function(key,value){value&&(this.keys.push(key+"="+value));};innity_adZone.prototype.do_targeting=function(){0<this.keys.length&&(this.append_url("ext",encodeURIComponent(this.keys.join("~"))));};innity_adZone.prototype.write=function(data){if(data&&data.parentNode){var obj={src:"%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin%3A0px%3B%7D%3C%2Fstyle%3E%3Cscript%3EinDapIF%3Dtrue%3Binnity_zone%3D%22"+data.zone+"%22%3B%3C%2Fscript%3E%3Cscript%20src%3D%22%2F%2Fssl-cdn.media.innity.net%2Flib%2Fframe_util.js%22%3E%3C%2Fscript%3E%3C%2Fhead%3E%3Cbody%3E%3Cscript%20charset%3D%22UTF-8%22%20src%3D%22"+data.url+"%22%3E%3C%2Fscript%3E%3C%2Fbody%3E%3C%2Fhtml%3E",width:data.width,height:data.height,el:data.parentNode};return innity_append_iframe(obj);}else{document.write('<scr'+'ipt type="text/javascr'+'ipt" src="'+data.url+'"></scr'+'ipt>');}return;};innity_adZone.prototype.xdebug=function(){var url=document.URL;try{url=top.document.URL;}catch(e){url=document.referrer;}if(navigator.userAgent.toLowerCase().indexOf("innity")>1){var ad=decodeURIComponent((new RegExp("[?|&]innity_force_ad="+"([^&;]+?)(&|#|;|$)").exec(url)||[,""])[1].replace(/\+/g,"%20"))||"";""!=ad&&(this.append_url("innity_force_ad",ad));}};function innity_postbidWrapper(zone,settings){this.zoneInfo=this.get_store("innity.zone."+zone);this.zoneInfo=this.zoneInfo!=null?JSON.parse(this.zoneInfo):"";this.requestID=new Date().getTime()+Math.random().toString(16).substr(2);window[this.requestID]={};this.do_request_bid();};innity_postbidWrapper.prototype.get_store=function(key){try{return localStorage.getItem(key);}catch(e){return false;}};innity_postbidWrapper.prototype.get_request_id=function(){return this.zoneInfo&&new Date().getTime()/1000<this.zoneInfo.expiry?this.requestID:false;};innity_postbidWrapper.prototype.get_bid_response=function(requestID){return window[requestID].res?window[requestID].res:false;};innity_postbidWrapper.prototype.set_apn_id=function(zone,id){if(zone&&id){var data={apnID:id,expiry:Math.round((new Date().getTime()/1000)+604800)};this.set_store("innity.zone."+zone,JSON.stringify(data));}};innity_postbidWrapper.prototype.set_store=function(key,value){if(value){try{return localStorage.setItem(key,value);}catch(e){}}};innity_postbidWrapper.prototype.do_async_req=function(url){var jScript=document.createElement("script");jScript.async=true;jScript.type="text/javascript";jScript.src=url;var el=document.getElementsByTagName("head");el=el.length?el:document.getElementsByTagName("body");if(el.length){el=el[0];el.insertBefore(jScript,el.firstChild);}};innity_postbidWrapper.prototype.do_request_bid=function(){var url=document.URL;try{url=top.document.URL;}catch(e){url=document.referrer;}if(this.zoneInfo){this.do_async_req("//ib.adnxs.com/jpt?callback=innity_postbidWrapper.prototype.do_prebid_callback&callback_uid="+this.requestID+"&psa=0&id="+this.zoneInfo.apnID+"&referrer="+encodeURIComponent(url));}};innity_postbidWrapper.prototype.do_prebid_callback=function(data){data&&(window[data.callback_uid].res=data);};innity_postbidWrapper.prototype.write_prebid_ad=function(id,doc){if(id){var width=window[id].res.result.width,height=window[id].res.result.height;doc.write('<iframe src="'+window[id].res.result.ad+'" width="'+width+'" height="'+height+'" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" scrolling="no" allowtransparency="true"></iframe>');doc.close();doc.defaultView&&doc.defaultView.frameElement&&(doc.defaultView.frameElement.width=width,doc.defaultView.frameElement.height=height);}};function innity_append_iframe(data){if(typeof data=="object"&&data.src){var iframe=document.createElement("iframe");iframe.id=data.zone?"frame-innity-"+Math.random().toString(16).substr(2)+"/"+data.zone:"frame-innity-"+Math.random().toString(16).substr(2);iframe.src="javascript:'<html><body style=\"background:transparent\"></body></html>'";iframe.width=data.width?data.width:0;iframe.height=data.height?data.height:0;iframe.style.width=data.width?data.width+"px":"0px";iframe.style.height=data.height?data.height+"px":"0px";iframe.frameBorder=iframe.marginWidth=iframe.marginHeight=0;iframe.scrolling="no";iframe.style.border="0px none";iframe.style.display="block";try{if(data.el){document.getElementById(data.el).appendChild(iframe);}else{document.getElementsByTagName("body")[0].appendChild(iframe);}var doc=iframe.contentDocument?iframe.contentDocument:(iframe.contentWindow?iframe.contentWindow.document:iframe.document);doc.open();doc.write(decodeURIComponent(data.src));doc.close();return iframe;}catch(e){}}return false;};function innity_write_iframe(url,settings){document.write('<ifr'+'ame'+' id="frame-innity-'+Math.random().toString(16).substr(2)+'"'+' width="'+settings.width+'" height="'+settings.height+'" frameborder="0" src="'+url+'" marginwidth="0" marginheight="0" vspace="0" hspace="0"'+' allowtransparency="true" scrolling="no"></ifr'+'ame>');};function innity_write_feedback(cid,settings){}