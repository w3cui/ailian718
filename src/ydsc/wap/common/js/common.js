/*
 *	@tql 2017/03/13
 *
 */
!(function(win) {
	"use strict";
	win.$app = win.$app ? win.$app : function($m) {
		return $app.API.init($m);
	};

	// 构建公用库
	$app.API = $app.API || new Array(); //基础方法
	// ieEs5 判断当前是否支持es5语法
	$app.ieEs5 = document.addEventListener ? true : false;

	//获取公用js路径
	$app.appUrl = new Array();
	$app.appUrl.MAIN_HOST = $("script").last().attr("src").match(/(http|https):\/\/([^\/]+)\//)[0];
	$app.appUrl.DEV_HOST = ""; //调试接口域名

	// 构建插件目录路径
	win.$plugin = win.$plugin ? win.$plugin : new Array();
	win.$plugin.MAIN_HOST = $app.appUrl.MAIN_HOST;

	$app.API = new function() {
		this.init = function($m) {
			// 初始化需要注入的方法
			var callback = $m ? $m : function() {};
			var setLayer = setInterval(function() {
				if (typeof layer == "object") {
					$app.layer = wui.layer = layer;
					$app.layer.msg = function($text, $time) {
						$time = $time ? $time : 2000;
						$(".icon_msg").addClass("up");
						var tql = '<div class="icon_msg">' + $text + '</div>';
						$("body").append(tql);
						$(".icon_msg").css({
							"left": "50%",
							"margin-left": "-" + ($(".icon_msg").width() / 2 + 10) + "px",
							"margin-top": "-" + ($(".icon_msg").height() / 2 + 10) + "px",
						});

						setTimeout(function() {
							$(".icon_msg").addClass("active");
							setTimeout(function() {
								$(".icon_msg").addClass("up");
								setTimeout(function() {
									$(".icon_msg").remove();
								}, 500);
							}, $time);
						}, 400);
					};
					callback();
					clearInterval(setLayer);
				}
			}, 500);
			return $app;
		};
		this.init();
		this.v = "v1"; //版本号
		this.loadJS = function(url, callback) {
					var $this = this;
					switch (typeof url) {
						case "object":
							var urlLength = url.length,
								defLength = 1;
							$.each(url, function(i, url) {
								var head = document.getElementsByTagName("head")[0];
								var script = document.createElement("script");
								script.src = url + "?" + $this.v;
								var done = false;
								script.onload = script.onreadystatechange = function() {
									if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
										done = true;
										if (defLength >= urlLength) {
											return callback();
										}
										defLength++;
										script.onload = script.onreadystatechange = null;
										head.removeChild(script);
									}
								};
								head.appendChild(script);
							});
							break;
						default:
							var head = document.getElementsByTagName("head")[0];
							var script = document.createElement("script");
							script.src = url + "?" + $this.v;
							var done = false;
							script.onload = script.onreadystatechange = function() {
								if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
									done = true;
									callback();
									script.onload = script.onreadystatechange = null;
									head.removeChild(script);
								}
							};
							head.appendChild(script);

					}

				};
		//读取cookie
		this.getCookie = function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		};
		//写入cookie
		this.setCookie = function(name, value) {
			var Days = 1;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		};
		//Ajax封装
		this.ajax = function(dataObj, callback, error) {
			error = error ? error : function() {};
			var $this = this;
			dataObj.url = this.urlRandom(dataObj.url);
			dataObj.type = dataObj.type ? dataObj.type : "post";
			dataObj.dataType = dataObj.dataType ? dataObj.dataType : "json";
			dataObj.data = dataObj.data ? dataObj.data : {};
			dataObj.error = dataObj.error ? dataObj.error : function(data) {
				layer.closeAll('loading');
				$this.messages(data, function() {});
				error();
			};
			dataObj.success = function(data) {
				layer.closeAll('loading');
				$this.messages(data, function() {
					callback(data)
				});
			};
			$.ajax(dataObj);
		};
		this.urlRandom = function(url){
			if (url.indexOf("?") != -1) {
				return url + "&t=" +  Math.random();
			}else{
				return url + "?t=" +  Math.random();
			}
		};
		// 统一验证处理
		this.messages = function($data, callback) {
				var text = "";
				if (typeof $data.status != "undefined") {
					switch ($data.status) {
						case 0:
							$app.layer.msg("\u60a8\u6ca1\u6709\u6743\u9650\u8bbf\u95ee\u63a5\u53e3\uff01");
							break;
						case 404:
							$app.layer.msg("\u0034\u0030\u0034\u9875\u9762\u5730\u5740\u9519\u8bef\uff01");
							break;
						case 500:
							if ($data.responseText[0] == "<") {
								layer.open({
									title: '\u60a8\u63a5\u53e3\u53c8\u62a5\u9519\u4e86\uff01',
									shadeClose: true,
									shade: 0.8,
									area: ['90%', '90%'],
									content: $data.responseText //iframe的url
								});
							} else {
								$app.layer.msg(messages(eval("(" + $data.responseText + ")")));
							}

							break;
						case 405:
							if ($data.responseText[0] == "<") {
								layer.open({
									title: '\u60a8\u63a5\u53e3\u53c8\u62a5\u9519\u4e86\uff01',
									shadeClose: true,
									shade: 0.8,
									area: ['90%', '90%'],
									content: $data.responseText //iframe的url
								});
							} else {
								$app.layer.msg(messages(eval("(" + $data.responseText + ")")));
							}

							break;
						case 422:
						case 422:
							$app.layer.msg(messages(eval("(" + $data.responseText + ")")));
							break;
						case 401:
							window.location.href = "/login?returnUrl=" + window.location.href;
							break;
						case undefined:
							messages($data);
							break;
						default:
							messages(eval("(" + $data.responseText + ")"));
					}
					return false;
				}
				messages($data);

				function messages(_$data) {
					if (_$data.code > 0) {
						$.each(_$data.messages, function(index, val) {
							text = text + val.$srvmessage + " ";
						});
						setTimeout(function() {
							var messagesindex = $app.layer.msg(text, 3000);
							$(".layui-layer-msg").unbind('click').click(function() {
								$app.layer.close(messagesindex);
							});
						}, 200);

						return false;
					} else {
						callback();
					}
				}
			}
			// 浮点数计算
		this.floating = function() {
			return {
				// 加
				accAdd: function(arg1, arg2) {
					var r1, r2, m;
					try {
						r1 = arg1.toString().split(".")[1].length
					} catch (e) {
						r1 = 0
					}
					try {
						r2 = arg2.toString().split(".")[1].length
					} catch (e) {
						r2 = 0
					}
					m = Math.pow(10, Math.max(r1, r2))
					return (this.accMul(arg1, m) + this.accMul(arg2, m)) / m;
				},
				// 减
				accSub: function(arg1, arg2) {
					return this.accAdd(arg1, -arg2);
				},
				// 乘
				accMul: function(arg1, arg2) {
					var m = 0,
						s1 = arg1.toString(),
						s2 = arg2.toString();
					try {
						m += s1.split(".")[1].length
					} catch (e) {}
					try {
						m += s2.split(".")[1].length
					} catch (e) {}
					return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
				}
			};
		};
	};

	// 兼容木头来了编辑
	win.$api = $app.API;
	win.$api.__HOST__ = $app.appUrl.MAIN_HOST;
	win.$api.ajax = $app.API.ajax;
	win.$api.loadJS = $app.API.loadJS;
	
	wui.uses(['layer', 'swiper', 'validate'])

	.directive('ui-maxheight', function() {
		return {
			scope: {
				correct: 'correct',
			},
			link: function(el) {
				var scope = el.scope;
				$(el.element).css({
					"max-height": $(window).height() + parseInt(scope.correct)
				});
			}
		};
	})


	.directive('ui-dragload', function() {
		return {
			scope: {
				callback: '~callback',
			},
			link: function(el) {
				var scope = el.scope;
				dragLoad($(el.element));
				var scrollMsg = false;

				function dragLoad(t) {
					$(window).scroll(function() {
						var $top = $(t).offset().top + $(t).height();
						if (scrollMsg) return false;
						if ($(window).scrollTop() + $(window).height() >= $top) {
							scrollMsg = !scrollMsg;
							scope.callback(t, scroll);
						}
					});
				};

				function scroll() {
					scrollMsg = !scrollMsg;
				};
			}
		};
	})

	/***
	 * 分享
	 * 指令@name => ui-share
	 * data-type => box  弹窗分享 
	 * 对应配置
	 */
	.directive('ui-share', function() {
		return {
			scope: {
				type: 'type',
				title: 'title',
				description: 'desc',
				pic: "pic",
				url: "",
			},
			link: function(el) {
				var $$original = {},
					scope = el.scope,
					_dom = el.element;
				// 判断是否配置了 分享数据k
				$$original.isData = function($name) {
					return $name && $name != "" ? true : false;
				};
				//动态构建config配置
				$$original.config = function($this) {
					return {
						title: this.isData(scope.title) ? scope.title : $("title").html(),
						description: this.isData(scope.description) ? scope.description : $("meta[name='description']").attr("content"),
						pic: this.isData(scope.pic) ? scope.pic : $("img").attr("src"),
						url: this.isData(scope.url) ? scope.url : window.location.href,
						JDKapi: {
							"weibo": {
								"key": "",
								"href": "http://service.weibo.com/share/share.php"
							},
							"qq": {
								"key": "",
								"href": "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
							},
							"weixin": {
								"key": "",
								"href": ""
							}
						}
					}
				};
				$$original.isStartUp = function(isbox, boxThis) {
					var $this = _dom,
						$$this = this,
						$uioriginal = [];
					if (scope.type == "box" && !isbox) {
						$($this).unbind('click').click(function() {
							$$this.shareBox($this);
						});
					} else {
                        $('.icon_share').find("*[data-key]").unbind('click').click(function(event) {
							$$this.showApi($(this).data("key"), $$this.config($($this).parents("*[ui-share]")));
						});
					}
				};
				$$original.shareBox = function($this) {
					var $this = this.config($($this));
					var $$this = this;
					$app.layer.open({
						type: 1,
						title: "\u5206\u4eab\u5230\uff1a",
						skin: 'layui-layer-share', //样式类名
						shadeClose: true, //开启遮罩关闭
						content: '<div ui-share class="share-list" data-title="' + $this.title + '" data-description="' + $this.description + '" data-pic="' + $this.pic + '" data-url="' + $this.url + '">' +
							'<i class="iconfont icon-weibo" data-key="weibo"></i>' +
							'<i class="iconfont icon-kongjian" data-key="kongjian"></i>' +
							'<i class="iconfont icon-weixin1" data-key="weixin"></i>' +
							'</div>',
						success: function(layero, index) {
							$$this.isStartUp("box", $(".layui-layer-share"));
						}
					});
				};
				$$original.showApi = function($name, $config) {
					switch ($name) {
						case "weibo":
							window.open($config.JDKapi.weibo.href + "?url=" + $config.url + "&title=" + $config.title + "&searchPic=" + $config.pic);
							break;
						case "kongjian":
							window.open($config.JDKapi.qq.href + "?url=" + $config.url + "&title=" + $config.title + "&pics=" + $config.pic);
							break;
						case "weixin":
							if (wui.device().weixin) {
								$("body").append('<div class="weixin-share"><img src="' + $app.appUrl.MAIN_HOST + 'aojia/wap/common/images/weixin.png" /></div>').find(".weixin-share").unbind('click').click(function(event) {
									/* Act on the event */
									$(".weixin-share").remove();
								});
								return false;
							}
							wui.loadAll({
								uses: [$app.appUrl.MAIN_HOST + "plugin/qrcode/qrcode.js", $app.appUrl.MAIN_HOST + "plugin/qrcode/jquery.qrcode.js"]
							}, function() {
								$app.layer.open({
									type: 1,
									title: "\u626b\u4e00\u626b",
									skin: 'layui-layer-code', //样式类名
									anim: 2,
									area: ['90%', "280px"],
									shadeClose: true, //开启遮罩关闭
									content: '<div class="codebox" style="padding:20px;text-align: center;"></div><p style="font-size:14px; color:#555; text-align: center; height:50px;">\u626b\u63cf\u4e8c\u7ef4\u7801\u5206\u4eab\u5230\u670b\u53cb\u5708\uff01</p>',
									success: function(layero, index) {
										$('.layui-layer-code .codebox').qrcode({
											width: "140",
											height: "140",
											text: $config.url
										});
									}
								});
							});
							break;
					};
				};
				$$original.isStartUp();
			}
		};
	})

	/***
	 * 搜索
	 * 指令@name => ui-search
	 * 对应配置
	 */
	.directive('ui-search', function() {
		return {
			scope: {
				url: 'url',
				openurl: "openurl"
			},
			link: function(el) {
				var scope = el.scope;
				var tplSearch = $('<div class="header_search off" ui-maxheight data-correct="-50"></div>');

				var tplTab = (function() {
					var searchCommodity = $app.API.getCookie("searchCommodity");
					if (!searchCommodity) return '<span>暂无搜索记录！</span>';
					searchCommodity = searchCommodity.split('|');
					var html = "";
					$.each(searchCommodity, function(index, val) {
						html = html + (val != "" ? "<a href='" + scope.openurl + "?keyword=" + val + "'>" + val + "</a>" : "");
					});
					searchCommodity = html;
					return searchCommodity;
				})();

				$(el.element).unbind('click').on("click", function() {
					var tplTabNew = (function() {
						var ret = '<span>暂无热门关键词！</span>';
						$app.layer.load();
						$app.API.ajax({
							url: scope.url,
							type: "GET",
							dataType: "json",
							async: false,
						}, function(data) {
							if (!data.result) return;
							var html = ""
							$.each(data.result, function(index, val) {
								html = html + (val != "" ? "<a href='" + scope.openurl + "?keyword=" + val + "'>" + val + "</a>" : "");
							});
							ret = html;
						});
						return ret;
					})();

					var tplMain = '<div class="header_pr">' +
						'<header class="icon_header">' +
						'<a class="iconfont icon-close"></a>' +
						'<div class="search">' +
						'<div class="icon_search">' +
						'<input type="text" placeholder="输入您需要的商品名称">' +
						'</div>' +
						'</div>' +
						'<a class="iconfont icon-sousuo"></a>' +
						'</header>' +
						'</div>' +
						'<div class="header_bg"></div>' +
						'<div class="appMain">	' +
						'<dl class="search_tab col-mar">' +
						'<dt>搜索记录</dt>' +
						'<dd>' + tplTab + '</dd>' +
						'</dl>' +
						'<div class="hr ov_h"></div>' +
						'<dl class="search_tab col-mar">' +
						'<dt>热门搜索</dt>' +
						'<dd>' + tplTabNew + '</dd>' +
						'</dl>	' +
						'</div>';
					tplSearch = tplSearch.html(tplMain);
					$("body").append(tplSearch);
					$("html").addClass('no');
					$(".header_search .icon-close").unbind('click').on("click", function() {
						$(".header_search").addClass('no').removeClass('off');
						setTimeout(function() {
							$(".header_search").removeClass('no').addClass('off');
							$("html").removeClass('no');
							$(".header_search").remove();
						}, 600);
					});
					$(".header_search .icon-sousuo").unbind('click').on("click", function() {
						var keyword = $(".header_search input").val();
						if (keyword == "") {
							$app.layer.msg("请添加搜索内容！");
							return false;
						}
						var searchCommodity = $app.API.getCookie("searchCommodity") || "";
						$app.API.setCookie("searchCommodity", searchCommodity + "|" + keyword);
						window.location.href = scope.openurl + "?keyword=" + keyword;
					});

				});
				
			}
		};
	});



})(window);