/**
 *  - v1.0.0  License By 
 * 研发技术中心-技术研发部 
 */
!function(t){jQuery.fn.isChildAndSelfOf=function(t){return this.closest(t).length>0},t.uses(["layer"]).directive("ui-chart",function(){return{uses:["https://gw.alipayobjects.com/os/antv/assets/f2/3.1.3/f2.js"],scope:{type:"type",prop:"prop",content:"content",url:"url",help:"help"},link:function(t){var e=t.scope,i=t.element,n=[{x:"1",y:e.prop}],o="chart_"+Math.floor(100*Math.random()).toString()+(new Date).getTime().toString();$(i).html('<canvas width="100" height="100" id="'+o+'"></canvas>');var l=new F2.Chart({id:o,width:$(i).width(),height:$(i).height(),pixelRatio:window.devicePixelRatio});return l.source(n,{y:{max:100,min:0}}),l.axis(!1),l.tooltip(!1),l.coord("polar",{transposed:!0,innerRadius:1.4,radius:1.4}),l.guide().arc({start:[0,0],end:[1,99.99],top:!1,style:{lineWidth:6,stroke:"#f5f5f5"}}),l.guide().html({position:["50%","50%"],html:'<div class="ui-chart"><p>'+e.content+'</p><span>本月出错次数<br/><a target="_blank" href="'+e.url+'">?</a></span></div>'}),l.interval().position("x*y").size(6).color([e.prop<25?"#18B933":e.prop>=25&&e.prop<50?"#FF7800":"#F72239"]).animate({appear:{duration:1200,easing:"cubicIn"}}),l.render(),!!e.help&&void $(i).find(".ui-chart a").mouseover(function(t){var n=wui.layer.tips(e.help,$(this),{tips:[1,"#000"]});$(i).find(".ui-chart a").mouseout(function(t){wui.layer.close(n)})})}}}).directive("ui-chart2",function(){return{uses:["http://cdn.bootcss.com/circliful/1.2.0/js/jquery.circliful.js"],scope:{type:"type",prop:"prop",content:"content",url:"url",help:"help"},link:function(t){var e=t.scope,i=t.element,n=([{x:"1",y:e.prop}],"chart_"+Math.floor(100*Math.random()).toString()+(new Date).getTime().toString()),o=e.prop<25?"#18B933":e.prop>=25&&e.prop<50?"#FF7800":"#F72239";$(i).html('<div id="'+n+'" data-dimension="120" data-text="'+e.content+'" data-width="6"  data-percent="'+e.prop+'" data-fgcolor="'+o+'" data-bgcolor="#f5f5f5"></div>'),$("#"+n).circliful()}}}).directive("ui-tips2",function(){return{uses:["layer"],scope:{title:"title",tips:"tips"},link:function(t){var e=t.scope,i=t.element;$(i).mouseover(function(t){var n=wui.layer.tips(e.title,$(this),{tips:e.tips||[1,"#000"]});$(i).mouseout(function(t){wui.layer.close(n)})})}}}).directive("ui-tips",function(){return{template:function(t){return'<div class="single_table_select single_table_select2"><div class="center"><p class="lower"></p>'+t+"</div></div>"},uses:["layer"],scope:{item:"title",on:"on",deviation:"deviation"},link:function(t){var e=t.scope,i=t.element,n=t.template(t.scope.item),o="ui_select_"+Math.floor(100*Math.random()).toString()+(new Date).getTime().toString(),l=o+"_click";$(i).attr("id",l),n=$(n).attr("id",o),$(i).unbind(e.on||"mouseover").on(e.on||"mouseover",function(){$(".single_table_select2").remove(),0==$("#"+o).length&&$("body").append(n);var t=this;$("#"+o).css({left:$(t).offset().left+$(t).outerWidth()/2-$("#"+o).outerWidth()/2,top:$(t).offset().top-$("#"+o).outerHeight()-20,"margin-left":e.deviation||0,opacity:1}).find("a").on("click",function(){e.item[$(this).index()-1].selected=!0;var t=this;$("#"+o).find("a").removeClass("active"),$(this).addClass("active"),$.each(e.item,function(i,n){e.item[i].selected=$(t).index()==i}),$("#"+o).remove()}),$("body").unbind("mouseover").on("mouseover",function(t){$(t.target).isChildAndSelfOf(i)||$(t.target).isChildAndSelfOf("#"+o)||$("#"+o).remove()})})}}}).directive("ui-copy",function(){return console.log(t),{uses:["../../../js/clipboard.min.js"],scope:{item:"title"},link:function(t){var e=t.scope,i=t.element,n="ui_select_"+Math.floor(100*Math.random()).toString()+(new Date).getTime().toString(),o=$(i).html();$(i).hover(function(){$(this).html("点击复制<i class='ov_h' id='"+n+"'>"+e.item+"</i>")},function(){$(this).html(o)}),$(i).attr("id",n);var l=new Clipboard("#"+n);l.on("success",function(t){$(t.trigger).html("复制成功"),t.clearSelection()}),l.on("error",function(t){layer.msg("复制失败，请升级或更换浏览器后重新复制！",{time:2e3}),t.clearSelection()})}}}).directive("ui-select",function(){return{template:function(t){return'<div class="single_table_select"><div class="center"><p class="dewo"></p>'+function(){var e="";return $.each(t,function(t,i){e=e+'<a class="'+(i.selected?"active":"")+'" >'+i.text+"</a>"}),e}()+"</div></div>"},uses:["layer"],scope:{item:"=item",change:"=change",on:"on",deviation:"deviation"},link:function(t){var e=t.scope,i=t.element,n=t.template(t.scope.item),o="ui_select_"+Math.floor(100*Math.random()).toString()+(new Date).getTime().toString();n=$(n).attr("id",o),$(i).unbind(e.on||"click").on(e.on||"click",function(){0==$("#"+o).length&&$("body").append(n);var t=$(i).outerWidth()<70?70:$(i).outerWidth();$("#"+o).css({left:$(i).offset().left,top:$(i).offset().top+$(i).outerHeight(),"min-width":t,"margin-left":e.deviation||0}).find("a").on("click",function(){e.item[$(this).index()-1].selected=!0;var t=this;$("#"+o).find("a").removeClass("active"),$(this).addClass("active"),$.each(e.item,function(i,n){e.item[i].selected=$(t).index()==i}),$("#"+o).remove(),e.change(e.item[$(this).index()-1],i)}),$("body").unbind("mouseover").on("mouseover",function(t){$(t.target).isChildAndSelfOf(i)||$(t.target).isChildAndSelfOf("#"+o)||$("#"+o).remove()})})}}}).directive("ui-banner",function(){return{scope:{config:"=config"},link:function(e){var i=e.scope,n=e.element,o="ui_banner_"+Math.floor(100*Math.random()).toString()+(new Date).getTime().toString();$(n).attr("id",o),i.config=i.config||{},i.config.name="#"+o,t.banner(i.config)}}}).directive("ui-showhide",function(){return{scope:{tab:"tab",cent:"cent",on:"on"},link:function(t){var e=t.scope,i=t.element,n=0;$(i).on(e.on||"click",function(){return!n&&(n=1,setTimeout(function(){n=0},400),$(this).parent().find(">*").removeClass("active"),$(this).addClass("active"),void $(e.cent).toggle(300))})}}}).directive("ui-tab",function(){return{scope:{show:"show",active:"active",on:"on"},link:function(t){var e=t.scope,i=t.element;$(i).find(">*").unbind(e.on||"click").on(e.on||"click",function(){return"undefined"==typeof $(this).attr("disabled")&&($(this).parent().find(">*").removeClass("active"),$(this).addClass("active"),$(e.show).find(">*").removeClass("active").hide(),void $(e.show+" >*:eq("+$(this).index()+")").addClass("active").show())})}}}).directive("ui-rolling",function(){return{scope:{time:"time"},link:function(t){var e=t.scope,i=t.element,n=$(t.element).length,o=1,l=!1;setInterval(function(){return!l&&($(i).animate({top:"-"+$(i).find("li:eq("+o+")").outerHeight()+"px"},"slow",function(){var t=$(this).find("li:first-child");$(this).append(t),$(this).removeAttr("style")}),void(o=n==o?1:o+1))},e.time||5e3);$(i).hover(function(){l=!0},function(){l=!1})}}}).directive("ui-msgimg",function(){return{template:function(t){return'<div class="single_table_select"><div class="center" style="padding:5px;text-align: center; width:100px; height:100px;  border-radius: 5px; "><p class="lower"></p><img  height="100" src="'+t+'" style=" max-width:100%; display:block; margin:auto;" /></div></div>'},uses:["layer"],scope:{on:"on",deviation:"deviation",img:"img"},link:function(t){var e=t.scope,i=t.element,n=t.template(t.scope.img),o="ui_select_"+Math.floor(100*Math.random()).toString()+(new Date).getTime().toString();n=$(n).attr("id",o),$(i).unbind(e.on||"mousemove").on(e.on||"mousemove",function(){0==$("#"+o).length&&$("body").append(n);var t=$(i).outerWidth()<70?70:$(i).outerWidth();$("#"+o).css({left:$(i).offset().left-50,top:$(i).offset().top-125,"min-width":t,"margin-left":e.deviation||0}),$("body").unbind("mouseover").on("mouseover",function(t){$(t.target).isChildAndSelfOf(i)||$(t.target).isChildAndSelfOf("#"+o)||$("#"+o).remove()})})}}}),t.banner=function(t){function e(t){if(1==i.mode)$(i._this+" ul.ullit").find("li:eq("+t+") img").attr("src",$(i._this+" ul.ullit").find("img:eq("+t+")").attr("urlsrc")),$(i._this+" ul.ullit").find("li").fadeOut(400),$(i._this+" ul.ullit").find("li:eq("+t+")").stop(!0,!1).fadeIn(400,function(){i._pd=!1});else{var e=-t*o;void 0!=i.preroll?($(i._this+" ul.ullit").append("<li style='width:"+o+"px;'>"+$(i._this+" ul.ullit li:first").html()+"</li>"),$(i._this+" ul.ullit").stop(!0,!1).animate({left:"-"+o+"px"},300,function(){$(this).css("left","0px"),$(i._this+" ul.ullit li:first").remove(),i._pd=!1})):($(i._this+" ul.ullit").find("li:eq("+t+") img").attr("src",$(i._this+" ul.ullit").find("img:eq("+t+")").attr("urlsrc")),$(i._this+" ul.ullit").stop(!0,!1).animate({left:e},300,function(){i._pd=!1}))}if(i.ulodd)if(t>=l&&(t=0),t<0&&(t=l),$(i._this+" .ulodd a").stop(!0,!1).removeClass("ayes").eq(t).stop(!0,!1).addClass("ayes"),t>4){var n=(t-4)*$(i._this+" div.ulodd a").width()+17;$(i._this+" div.ulodd a").animate({left:"-"+n},300)}else{var n=0;$(i._this+" div.ulodd a").animate({left:"-"+n},300)}}var i=[];i._this=t.name,i.preNext=t.addlit,i.ulodd=t.preNext,i.mode=t.mode,i.preroll=t.roll,i._pd=!1,i.time=t.time?t.time:3e3;var n,o=$(i._this).find("ul.ullit li").width(),l=$(i._this).find(" ul.ullit li").length,s=0,r="";if(1==l)return $(i._this).find("ul.ullit li").css({width:o,display:"block"}),!1;if(i.ulodd&&0==$(i._this+" div.ulodd").length){r+="<div class='ulodd'>";for(var a=0;a<l;a++)r+="<a class='compng'></a>";r+="</div>"}i.preNext&&0==$(i._this+" a.preNext").length&&(r+="<a class='preNext pre compng'><i/></i></a><a class='preNext next compng'><i/></i></a>"),$(i._this).append(r),1==i.mode||$(i._this+" ul.ullit li").css("width",o),i.ulodd&&$(i._this+" .ulodd a").click(function(){clearInterval(n),s=$(""+i._this+" .ulodd a").index(this),e(s)}).eq(0).trigger("click"),1==i.mode?$(i._this+" ul.ullit").css({"z-index":"1"}):$(i._this+" ul.ullit").css("width",o*l),$(i._this).hover(function(){clearInterval(n)},function(){n=setInterval(function(){s++,s>=l&&(s=0),e(s)},i.time)}).trigger("mouseleave"),i.preNext&&($(i._this).hover(function(){$(".preNext").fadeIn("slow")},function(){$(".preNext").removeAttr("style")}),$(i._this+" .preNext").hover(function(){$(this).stop(!0,!1).animate({opacity:"0.7"},300)},function(){$(this).stop(!0,!1).animate({opacity:"1"},300)}),$(i._this+" .pre").click(function(){return!i._pd&&(i._pd=!0,s-=1,s<0&&(s=l-1),e(s),void clearInterval(n))}),$(i._this+" .next").click(function(){return!i._pd&&(i._pd=!0,s+=1,s>=l&&(s=0),e(s),void clearInterval(n))}))}}(wui);