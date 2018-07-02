!(function($wui) {
    jQuery.fn.isChildAndSelfOf = function(b) {
        return (this.closest(b).length > 0);
    };
    $wui
        .uses(["layer"])
        .directive('ui-chart', function() {
            return {
                uses: [
                    "https://gw.alipayobjects.com/os/antv/assets/f2/3.1.3/f2.js",
                ],
                scope: {
                    type: 'type', //图标类型
                    prop: 'prop',
                    content: 'content',
                    url: "url",
                    help: "help",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element,
                        data = [{
                            x: '1',
                            y: $scope.prop
                        }];

                    var _id = 'chart_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();

                    $($element).html('<canvas width="100" height="100" id="' + _id + '"></canvas>');
                    var chart = new F2.Chart({
                        id: _id,
                        width: $($element).width(),
                        height: $($element).height(),
                        pixelRatio: window.devicePixelRatio
                    });

                    chart.source(data, {
                        y: {
                            max: 100,
                            min: 0
                        }
                    });
                    chart.axis(false);
                    chart.tooltip(false);
                    chart.coord('polar', {
                        transposed: true,
                        innerRadius: 1.4,
                        radius: 1.4
                    });
                    chart.guide().arc({
                        start: [0, 0],
                        end: [1, 99.99],
                        top: false,
                        style: {
                            lineWidth: 6,
                            stroke: '#f5f5f5'
                        }
                    });
                    chart.guide().html({
                        position: ['50%', '50%'],
                        html: '<div class="ui-chart">' +
                            '<p>' + $scope.content + '</p>' +
                            '<span>本月出错次数<br/><a target="_blank" href="' + $scope.url + '">?</a></span>' +
                            '</div>'
                    });
                    chart.interval()
                        .position('x*y')
                        .size(6)
                        .color([$scope.prop < 25 ? "#18B933" : $scope.prop >= 25 && $scope.prop < 50 ? "#FF7800" : '#F72239'])
                        .animate({
                            appear: {
                                duration: 1200,
                                easing: 'cubicIn'
                            }
                        });
                    chart.render();

                    if (!$scope.help) return false;
                    $($element).find(".ui-chart a").mouseover(function(event) {
                        var lay = wui.layer.tips($scope.help, $(this), {
                            tips: [1, '#000'] //还可配置颜色
                        });
                        $($element).find(".ui-chart a").mouseout(function(event) {
                            wui.layer.close(lay)
                        });
                    });
                }
            }
        }).directive('ui-chart2', function() {
            return {
                uses: [
                    "http://cdn.bootcss.com/circliful/1.2.0/js/jquery.circliful.js"
                ],
                scope: {
                    type: 'type', //图标类型
                    prop: 'prop',
                    content: 'content',
                    url: "url",
                    help: "help",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element,
                        data = [{
                            x: '1',
                            y: $scope.prop
                        }];

                    var _id = 'chart_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();
                    var fgcolor = $scope.prop < 25 ? "#18B933" : $scope.prop >= 25 && $scope.prop < 50 ? "#FF7800" : '#F72239';

                    $($element).html('<div id="' + _id + '" data-dimension="120" data-text="' + $scope.content + '" data-width="6"  ' +
                        'data-percent="' + $scope.prop + '" data-fgcolor="' + fgcolor + '" data-bgcolor="#f5f5f5"></div>');
                    $('#' + _id).circliful();

                }
            }
        }).directive('ui-tips2', function() {
            return {
                uses: [
                    "layer"
                ],
                scope: {
                    title: "title",
                    tips: "tips",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    $($element).mouseover(function(event) {
                        var lay = wui.layer.tips($scope.title, $(this), {
                            tips: $scope.tips || [1, '#000']
                        });
                        $($element).mouseout(function(event) {
                            wui.layer.close(lay)
                        });
                    });
                }
            }
        }).directive('ui-tips', function() {
            return {
                template: function(data) {
                    return '<div class="single_table_select single_table_select2">' +
                        '<div class="center"><p class="lower"></p>' +
                        data +
                        '</div>' +
                        '</div>';
                },
                uses: [
                    "layer"
                ],
                scope: {
                    item: "title",
                    on: "on",
                    deviation: "deviation"
                },
                link: function($el) {

                    var $scope = $el.scope,
                        $element = $el.element,
                        $template = $el.template($el.scope.item);
                    var _id = 'ui_select_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();
                    var _tab = _id + "_click";
                    $($element).attr("id",_tab);
                    $template = $($template).attr("id", _id);
                    
                    $($element).unbind($scope.on || "mouseover").on($scope.on || "mouseover", function() {
                        
                        $(".single_table_select2").remove();
                        if ($("#" + _id).length == 0) {
                            $("body").append($template);
                        }
                        // var _w = $($element).outerWidth() < 70 ? 70 : $($element).outerWidth();
                        
                        var _this = this;
                        $("#" + _id).css({
                            left: $(_this).offset().left + $(_this).outerWidth() / 2 - $("#" + _id).outerWidth() / 2,
                            top: $(_this).offset().top - $("#" + _id).outerHeight() - 20,
                            // "min-width": _w, 
                            "margin-left": $scope.deviation || 0,
                            "opacity":1
                        }).find("a").on("click", function() {
                            $scope.item[$(this).index() - 1].selected = true;
                            var _t = this;
                            $("#" + _id).find("a").removeClass('active');
                            $(this).addClass('active');
                            $.each($scope.item, function(index, el) {
                                $scope.item[index].selected = $(_t).index() == index;
                            });
                            $("#" + _id).remove();
                        });
                        // 隐藏下拉逻辑
                        $("body").unbind("mouseover").on("mouseover", function(event) {
                            if (!$(event.target).isChildAndSelfOf($element) && !$(event.target).isChildAndSelfOf("#" + _id)) {
                                $("#" + _id).remove();
                            }
                        });

                        

                    });

                }
            }
        })
        .directive('ui-copy', function() {
            console.log($wui);
            return {
                uses: [
                    "../../../js/clipboard.min.js"
                ],
                scope: {
                    item: "title"
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    var _id = 'ui_select_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();
                    var name = $($element).html();
                    $($element).hover(function() {                        
                        $(this).html("点击复制<i class='ov_h' id='" + _id + "'>" + $scope.item + "</i>");
                    }, function() {
                        $(this).html(name);
                    });

                    $($element).attr("id",_id);

                    //设置一键复制
                    var clipboard = new Clipboard("#"+_id);

                    clipboard.on('success', function(e) {
                        $(e.trigger).html("复制成功");
                        e.clearSelection();
                    });

                    clipboard.on('error', function(e) {
                        layer.msg('复制失败，请升级或更换浏览器后重新复制！', {
                            time: 2000
                        });
                        e.clearSelection();
                    });

                    
                }
            }
        })
        .directive('ui-select', function() {
            return {
                template: function(data) {
                    return '<div class="single_table_select">' +
                        '<div class="center"><p class="dewo"></p>' + function() {
                            var ret = "";
                            $.each(data, function(index, el) {
                                ret = ret + '<a class="' + (el.selected ? "active" : "") + '" >' + el.text + '</a>'
                            });
                            return ret;
                        }() + '</div>' +
                        '</div>';
                },
                uses: [
                    "layer"
                ],
                scope: {
                    item: "=item",
                    change: "=change",
                    on: "on",
                    deviation: "deviation"
                },
                link: function($el) {

                    var $scope = $el.scope,
                        $element = $el.element,
                        $template = $el.template($el.scope.item);
                    var _id = 'ui_select_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();

                    $template = $($template).attr("id", _id);

                    $($element).unbind($scope.on || "click").on($scope.on || "click", function() {

                        if ($("#" + _id).length == 0) {
                            $("body").append($template);
                        }
                        var _w = $($element).outerWidth() < 70 ? 70 : $($element).outerWidth();

                        $("#" + _id).css({
                            left: $($element).offset().left,
                            top: $($element).offset().top + $($element).outerHeight(),
                            "min-width": _w,
                            "margin-left": $scope.deviation || 0
                        }).find("a").on("click", function() {
                            $scope.item[$(this).index() - 1].selected = true;
                            var _t = this;
                            $("#" + _id).find("a").removeClass('active');
                            $(this).addClass('active');
                            $.each($scope.item, function(index, el) {
                                $scope.item[index].selected = $(_t).index() == index;
                            });
                            $("#" + _id).remove();
                            // 回掉选中结果
                            $scope.change($scope.item[$(this).index() - 1], $element);
                        });
                        // 隐藏下拉逻辑
                        $("body").unbind("mouseover").on("mouseover", function(event) {
                            if (!$(event.target).isChildAndSelfOf($element) && !$(event.target).isChildAndSelfOf("#" + _id)) {
                                $("#" + _id).remove();
                            }
                        });

                    });


                }
            }
        }).directive('ui-banner', function() {
            return {
                scope: {
                    config: "=config",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    var _id = 'ui_banner_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();

                    $($element).attr("id", _id);

                    $scope.config = $scope.config || {};
                    $scope.config.name = "#" + _id;
                    $wui.banner($scope.config)
                }
            }
        }).directive('ui-showhide', function() {
            return {
                scope: {
                    tab: "tab",
                    cent: "cent",
                    on: "on"
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    var set = 0;
                    $($element).on($scope.on || "click", function() {
                        if (set) {
                            return false;
                        }
                        set = 1;
                        setTimeout(function() {
                            set = 0;
                        }, 400);
                        $(this).parent().find(">*").removeClass('active');
                        $(this).addClass('active');
                        $($scope.cent).toggle(300);
                    });
                }
            }
        }).directive('ui-tab', function() {
            /*tab切换*/
            return {
                scope: {
                    show: "show",
                    active: "active",
                    on: "on"
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    $($element).find(">*").unbind($scope.on || "click").on($scope.on || "click", function() {
                        if (typeof($(this).attr("disabled")) != "undefined") {
                            return false;
                        }
                        $(this).parent().find(">*").removeClass('active');
                        $(this).addClass('active');
                        $($scope.show).find('>*').removeClass('active').hide();
                        $($scope.show + ' >*:eq(' + $(this).index() + ')').addClass('active').show();
                    });
                }
            }
        }).directive('ui-rolling', function() {
            return {
                scope: {
                    time: "time"
                },
                link: function($el) {

                    var $scope = $el.scope,
                        $element = $el.element,
                        $num = $($el.element).length,
                        $index = 1,
                        isSet = false;

                    var set = setInterval(function() {
                        if (isSet) return false;
                        $($element).animate({
                            top: "-" + $($element).find("li:eq(" + $index + ")").outerHeight() + "px"
                        }, "slow", function() {
                            var li = $(this).find("li:first-child");
                            $(this).append(li);

                            $(this).removeAttr('style');
                        });
                        $index = $num == $index ? 1 : $index + 1;
                    }, $scope.time || 5000);

                    $($element).hover(function() {
                        isSet = true;
                    }, function() {
                        isSet = false;
                    });
                }
            }
        }).directive('ui-msgimg', function() {
            return {
                template: function(img) {
                    return '<div class="single_table_select">' +
                        '<div class="center" style="padding:5px;text-align: center; width:100px; height:100px;  border-radius: 5px; "><p class="lower"></p>' +
                        '<img  height="100" src="' + img + '" style=" max-width:100%; display:block; margin:auto;" />' +
                        '</div>' +
                        '</div>';
                },
                uses: [
                    "layer"
                ],
                scope: {
                    on: "on",
                    deviation: "deviation",
                    img: "img"
                },
                link: function($el) {

                    var $scope = $el.scope,
                        $element = $el.element,
                        $template = $el.template($el.scope.img);
                    var _id = 'ui_select_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();

                    $template = $($template).attr("id", _id);

                    $($element).unbind($scope.on || "mousemove").on($scope.on || "mousemove", function() {

                        if ($("#" + _id).length == 0) {
                            $("body").append($template);
                        }
                        var _w = $($element).outerWidth() < 70 ? 70 : $($element).outerWidth();

                        $("#" + _id).css({
                            left: $($element).offset().left - 50,
                            top: $($element).offset().top - 125,
                            "min-width": _w,
                            "margin-left": $scope.deviation || 0
                        });

                        // 隐藏下拉逻辑
                        $("body").unbind("mouseover").on("mouseover", function(event) {
                            if (!$(event.target).isChildAndSelfOf($element) && !$(event.target).isChildAndSelfOf("#" + _id)) {
                                $("#" + _id).remove();
                            }
                        });

                    });


                }
            }
        });



    $wui.banner = function(o) {
        var bannthis = [];
        bannthis._this = o.name, //选中幻灯片名称
            bannthis.preNext = o.addlit, //下标显示点点切换false表示显示
            bannthis.ulodd = o.preNext, //左右切换按钮 是否显示 false表示显示
            bannthis.mode = o.mode, //切换方式false表示左右切换this表示淡入淡出
            bannthis.preroll = o.roll;
        bannthis._pd = false;
        bannthis.time = o.time ? o.time : 3000;
        var sWidth = $(bannthis._this).find("ul.ullit li").width();
        var len = $(bannthis._this).find(" ul.ullit li").length;
        var index = 0;
        var picTimer;
        var btn = "";
        //for( var i=0;i<=$(bannthis._this + " ul.ullit").find("img").length;i++ ){
        //$(bannthis._this + " ul.ullit").find("img:eq("+ i +")").attr("src",$(bannthis._this + " ul.ullit").find("img:eq("+ i +")").attr("urlsrc"));
        //};
        if (len == 1) {
            $(bannthis._this).find("ul.ullit li").css({
                "width": sWidth,
                "display": "block"
            });
            return false;
        }
        if (bannthis.ulodd && $(bannthis._this + " div.ulodd").length == 0) { //判断是否出现点点选项
            btn += "<div class='ulodd'>";
            for (var i = 0; i < len; i++) {
                btn += "<a class='compng'></a>";
            }
            btn += "</div>";
        }
        if (bannthis.preNext && $(bannthis._this + " a.preNext").length == 0) { //判断是否出现上一页或下一页
            btn += "<a class='preNext pre compng'><i/></i></a><a class='preNext next compng'><i/></i></a>"
        }
        $(bannthis._this).append(btn);
        if (bannthis.mode == true) {} else {
            $(bannthis._this + " ul.ullit li").css("width", sWidth);
        }

        if (bannthis.ulodd) {
            $(bannthis._this + " .ulodd a").click(function() {
                clearInterval(picTimer);
                index = $("" + bannthis._this + " .ulodd a").index(this);
                showPics(index);
            }).eq(0).trigger("click");
        }
        if (bannthis.mode == true) {
            $(bannthis._this + " ul.ullit").css({
                //"width":sWidth,
                //"position":"relative",
                "z-index": "1"
            });
        } else {
            $(bannthis._this + " ul.ullit").css("width", sWidth * (len));
        }

        $(bannthis._this).hover(function() {
            clearInterval(picTimer);
        }, function() {
            picTimer = setInterval(function() {
                index++;
                if (index >= len) {
                    index = 0;
                }
                showPics(index);


            }, bannthis.time);
        }).trigger("mouseleave");

        if (bannthis.preNext) {
            //上一页、下一页按钮透明度处理
            $(bannthis._this).hover(function() {
                $(".preNext").fadeIn("slow");
            }, function() {
                $(".preNext").removeAttr("style");
            });
            $(bannthis._this + " .preNext").hover(function() {
                $(this).stop(true, false).animate({
                    "opacity": "0.7"
                }, 300);
            }, function() {
                $(this).stop(true, false).animate({
                    "opacity": "1"
                }, 300);
            });

            //上一页按钮
            $(bannthis._this + " .pre").click(function() {
                if (bannthis._pd) {
                    return false;
                };
                bannthis._pd = true;
                index = index - 1;
                if (index < 0) {
                    index = len - 1;
                }
                showPics(index);
                clearInterval(picTimer);
            });

            //下一页按钮
            $(bannthis._this + " .next").click(function() {
                if (bannthis._pd) {
                    return false;
                };
                bannthis._pd = true;
                index = index + 1;
                if (index >= len) {
                    index = 0;
                }
                showPics(index);
                clearInterval(picTimer);
            });
        }

        function showPics(index) {
            if (bannthis.mode == true) {
                $(bannthis._this + " ul.ullit").find("li:eq(" + index + ") img").attr("src", $(bannthis._this + " ul.ullit").find("img:eq(" + index + ")").attr("urlsrc"));
                $(bannthis._this + " ul.ullit").find("li").fadeOut(400); //.animate({"opacity":"0","filter":"alpha(opacity=0)","-moz-opacity":"0"},800);
                $(bannthis._this + " ul.ullit").find("li:eq(" + index + ")").stop(true, false).fadeIn(400, function() {
                    bannthis._pd = false;
                }); //.animate({"opacity":"1","filter":"alpha(opacity=100)","-moz-opacity":"1"},800);

            } else {
                var nowLeft = -index * sWidth;
                if (bannthis.preroll != undefined) {
                    $(bannthis._this + " ul.ullit").append("<li style='width:" + sWidth + "px;'>" + $(bannthis._this + " ul.ullit li:first").html() + "</li>");

                    $(bannthis._this + " ul.ullit").stop(true, false).animate({
                        "left": "-" + sWidth + "px"
                    }, 300, function() {
                        $(this).css("left", "0px");
                        $(bannthis._this + " ul.ullit li:first").remove();
                        bannthis._pd = false;
                    });
                } else {
                    $(bannthis._this + " ul.ullit").find("li:eq(" + index + ") img").attr("src", $(bannthis._this + " ul.ullit").find("img:eq(" + index + ")").attr("urlsrc"));
                    $(bannthis._this + " ul.ullit").stop(true, false).animate({
                        "left": nowLeft
                    }, 300, function() {
                        bannthis._pd = false;
                    });
                }

            }
            if (bannthis.ulodd) {
                if (index >= len) {
                    index = 0;
                }
                if (index < 0) {
                    index = len;
                }
                $(bannthis._this + " .ulodd a").stop(true, false).removeClass("ayes").eq(index).stop(true, false).addClass("ayes");
                if (index > 4) {
                    var _left = (index - 4) * $(bannthis._this + " div.ulodd a").width() + 17;
                    $(bannthis._this + " div.ulodd a").animate({
                        "left": "-" + _left
                    }, 300);
                } else {
                    var _left = 0;
                    $(bannthis._this + " div.ulodd a").animate({
                        "left": "-" + _left
                    }, 300);
                }
            }

        }
    }
})(wui);