/**
 *  - v1.0.0  License By 
 * 研发技术中心-技术研发部 
 */
!function(win){"use strict";win.$app=win.$app?win.$app:function(e){return $app.API.init(e)},$app.API=$app.API||new Array,$app.ieEs5=!!document.addEventListener,$app.appUrl=new Array,$app.appUrl.DEV_HOST="",win.$plugin=win.$plugin?win.$plugin:new Array,win.$plugin.MAIN_HOST=$app.appUrl.MAIN_HOST,$app.API=new function(){this.init=function(e){var a=e?e:function(){},t=setInterval(function(){"object"==typeof layer&&($app.layer=wui.layer=layer,$app.layer.msg=function(e,a){a=a?a:2e3,$(".icon_msg").addClass("up");var t='<div class="icon_msg">'+e+"</div>";$("body").append(t),$(".icon_msg").css({left:"50%","margin-left":"-"+($(".icon_msg").width()/2+10)+"px","margin-top":"-"+($(".icon_msg").height()/2+10)+"px"}),setTimeout(function(){$(".icon_msg").addClass("active"),setTimeout(function(){$(".icon_msg").addClass("up"),setTimeout(function(){$(".icon_msg").remove()},500)},a)},400)},a(),clearInterval(t))},500);return $app},this.init(),this.v="v1",this.loadJS=function(e,a){var t=this;switch(typeof e){case"object":var i=e.length,n=1;$.each(e,function(e,s){var c=document.getElementsByTagName("head")[0],o=document.createElement("script");o.src=s+"?"+t.v;var r=!1;o.onload=o.onreadystatechange=function(){if(!(r||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState)){if(r=!0,n>=i)return a();n++,o.onload=o.onreadystatechange=null,c.removeChild(o)}},c.appendChild(o)});break;default:var s=document.getElementsByTagName("head")[0],c=document.createElement("script");c.src=e+"?"+t.v;var o=!1;c.onload=c.onreadystatechange=function(){o||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(o=!0,a(),c.onload=c.onreadystatechange=null,s.removeChild(c))},s.appendChild(c)}},this.getCookie=function(e){var a,t=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(a=document.cookie.match(t))?unescape(a[2]):null},this.setCookie=function(e,a){var t=1,i=new Date;i.setTime(i.getTime()+24*t*60*60*1e3),document.cookie=e+"="+escape(a)+";expires="+i.toGMTString()},this.ajax=function(e,a,t){t=t?t:function(){};var i=this;e.url=this.urlRandom(e.url),e.type=e.type?e.type:"post",e.dataType=e.dataType?e.dataType:"json",e.data=e.data?e.data:{},e.error=e.error?e.error:function(e){layer.closeAll("loading"),i.messages(e,function(){}),t()},e.success=function(e){layer.closeAll("loading"),i.messages(e,function(){a(e)})},$.ajax(e)},this.urlRandom=function(e){return e.indexOf("?")!=-1?e+"&t="+Math.random():e+"?t="+Math.random()},this.messages=function($data,callback){function messages(e){return e.code>0?($.each(e.messages,function(e,a){text=text+a.$srvmessage+" "}),setTimeout(function(){var e=$app.layer.msg(text,3e3);$(".layui-layer-msg").unbind("click").click(function(){$app.layer.close(e)})},200),!1):void callback()}var text="";if("undefined"!=typeof $data.status){switch($data.status){case 0:$app.layer.msg("您没有权限访问接口！");break;case 404:$app.layer.msg("404页面地址错误！");break;case 500:"<"==$data.responseText[0]?layer.open({title:"您接口又报错了！",shadeClose:!0,shade:.8,area:["90%","90%"],content:$data.responseText}):$app.layer.msg(messages(eval("("+$data.responseText+")")));break;case 405:"<"==$data.responseText[0]?layer.open({title:"您接口又报错了！",shadeClose:!0,shade:.8,area:["90%","90%"],content:$data.responseText}):$app.layer.msg(messages(eval("("+$data.responseText+")")));break;case 422:case 422:$app.layer.msg(messages(eval("("+$data.responseText+")")));break;case 401:window.location.href="/login?returnUrl="+window.location.href;break;case void 0:messages($data);break;default:messages(eval("("+$data.responseText+")"))}return!1}messages($data)},this.floating=function(){return{accAdd:function(e,a){var t,i,n;try{t=e.toString().split(".")[1].length}catch(s){t=0}try{i=a.toString().split(".")[1].length}catch(s){i=0}return n=Math.pow(10,Math.max(t,i)),(this.accMul(e,n)+this.accMul(a,n))/n},accSub:function(e,a){return this.accAdd(e,-a)},accMul:function(e,a){var t=0,i=e.toString(),n=a.toString();try{t+=i.split(".")[1].length}catch(s){}try{t+=n.split(".")[1].length}catch(s){}return Number(i.replace(".",""))*Number(n.replace(".",""))/Math.pow(10,t)}}}},win.$api=$app.API,win.$api.__HOST__=$app.appUrl.MAIN_HOST,win.$api.ajax=$app.API.ajax,win.$api.loadJS=$app.API.loadJS,wui.uses(["layer","swiper","validate"]).directive("ui-maxheight",function(){return{scope:{correct:"correct"},link:function(e){var a=e.scope;$(e.element).css({"max-height":$(window).height()+parseInt(a.correct)})}}}).directive("ui-dragload",function(){return{scope:{callback:"~callback"},link:function(e){function a(e){$(window).scroll(function(){var a=$(e).offset().top+$(e).height();return!n&&void($(window).scrollTop()+$(window).height()>=a&&(n=!n,i.callback(e,t)))})}function t(){n=!n}var i=e.scope;a($(e.element));var n=!1}}}).directive("ui-share",function(){return{scope:{type:"type",title:"title",description:"desc",pic:"pic",url:""},link:function(e){var a={},t=e.scope,i=e.element;a.isData=function(e){return!(!e||""==e)},a.config=function(e){return{title:this.isData(t.title)?t.title:$("title").html(),description:this.isData(t.description)?t.description:$("meta[name='description']").attr("content"),pic:this.isData(t.pic)?t.pic:$("img").attr("src"),url:this.isData(t.url)?t.url:window.location.href,JDKapi:{weibo:{key:"",href:"http://service.weibo.com/share/share.php"},qq:{key:"",href:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"},weixin:{key:"",href:""}}}},a.isStartUp=function(e,a){var n=i,s=this;"box"!=t.type||e?$(".share-list").find("*[data-key]").unbind("click").click(function(e){s.showApi($(this).data("key"),s.config($(n).parents("*[ui-share]")))}):$(n).unbind("click").click(function(){s.shareBox(n)})},a.shareBox=function(e){var e=this.config($(e)),a=this;$app.layer.open({type:1,title:"分享到：",skin:"layui-layer-share",shadeClose:!0,content:'<div ui-share class="share-list" data-title="'+e.title+'" data-description="'+e.description+'" data-pic="'+e.pic+'" data-url="'+e.url+'"><i class="iconfont icon-weibo" data-key="weibo"></i><i class="iconfont icon-kongjian" data-key="kongjian"></i><i class="iconfont icon-weixin" data-key="weixin"></i></div>',success:function(e,t){a.isStartUp("box",$(".layui-layer-share"))}})},a.showApi=function(e,a){switch(e){case"weibo":window.open(a.JDKapi.weibo.href+"?url="+a.url+"&title="+a.title+"&searchPic="+a.pic);break;case"kongjian":window.open(a.JDKapi.qq.href+"?url="+a.url+"&title="+a.title+"&pics="+a.pic);break;case"weixin":if(wui.device().weixin)return $("body").append('<div class="weixin-share"><img src="'+$app.appUrl.MAIN_HOST+'aojia/wap/common/images/weixin.png" /></div>').find(".weixin-share").unbind("click").click(function(e){$(".weixin-share").remove()}),!1;wui.loadAll({uses:["https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js"]},function(){$app.layer.open({type:1,title:"扫一扫",skin:"layui-layer-code",anim:2,area:["90%","280px"],shadeClose:!0,content:'<div class="codebox" style="padding:20px;text-align: center;"></div><p style="font-size:14px; color:#555; text-align: center; height:50px;">扫描二维码分享到朋友圈！</p>',success:function(e,t){$(".layui-layer-code .codebox").qrcode({width:"140",height:"140",text:a.url})}})})}},a.isStartUp()}}}).directive("ui-search",function(){return{scope:{url:"url",openurl:"openurl"},link:function(e){var a=e.scope,t=$('<div class="header_search off" ui-maxheight data-correct="-50"></div>'),i=function(){var e=$app.API.getCookie("searchCommodity");if(!e)return"<span>暂无搜索记录！</span>";e=e.split("|");var t="";return $.each(e,function(e,i){t+=""!=i?"<a href='"+a.openurl+"?keyword="+i+"'>"+i+"</a>":""}),e=t}();$(e.element).unbind("click").on("click",function(){var e=function(){var e="<span>暂无热门关键词！</span>";return $app.layer.load(),$app.API.ajax({url:a.url,type:"GET",dataType:"json",async:!1},function(t){if(t.result){var i="";$.each(t.result,function(e,t){i+=""!=t?"<a href='"+a.openurl+"?keyword="+t+"'>"+t+"</a>":""}),e=i}}),e}(),n='<div class="header_pr"><header class="icon_header"><a class="iconfont icon-close"></a><div class="search"><div class="icon_search"><input type="text" placeholder="输入您需要的商品名称"></div></div><a class="iconfont icon-sousuo"></a></header></div><div class="header_bg"></div><div class="appMain">\t<dl class="search_tab col-mar"><dt>搜索记录</dt><dd>'+i+'</dd></dl><div class="hr ov_h"></div><dl class="search_tab col-mar"><dt>热门搜索</dt><dd>'+e+"</dd></dl>\t</div>";t=t.html(n),$("body").append(t),$("html").addClass("no"),$(".header_search .icon-close").unbind("click").on("click",function(){$(".header_search").addClass("no").removeClass("off"),setTimeout(function(){$(".header_search").removeClass("no").addClass("off"),$("html").removeClass("no"),$(".header_search").remove()},600)}),$(".header_search .icon-sousuo").unbind("click").on("click",function(){var e=$(".header_search input").val();if(""==e)return $app.layer.msg("请添加搜索内容！"),!1;var t=$app.API.getCookie("searchCommodity")||"";$app.API.setCookie("searchCommodity",t+"|"+e),window.location.href=a.openurl+"?keyword="+e})})}}}).directive("ui-active",function(){return{scope:{el:"el"},link:function(e){var a=e.scope;$(e.element).on("click",function(){$(this).parents(a.el).toggleClass("active")})}}})}(window);