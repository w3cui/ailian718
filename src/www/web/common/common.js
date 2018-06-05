!(function($wui) {
    jQuery.fn.isChildAndSelfOf = function(b) {
        return (this.closest(b).length > 0);
    };
    $wui
        .uses(["layer"])
        .directive('ui-banner', function() {
            return {
                scope: {
                    config: "=config",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    var _id = 'ui_banner_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();

                    $($element).attr("id", _id);

                    $scope.config = $scope.config || {preNext:true};
                    $scope.config.name = "#" + _id;
                    $wui.banner($scope.config)
                }
            }
        })
        .directive('ui-hover', function() {
            return {
                scope: {
                    list: "list",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    $($element).find($scope.list).hover(function(){
                        $($element).find($scope.list).removeClass("cur");
                        $(this).addClass("cur");
                        $(this).addClass("active");
                    },function(){
                        $(this).removeClass("active");
                    })
                }
            }
        }).directive('ui-login', function() {
            return {
                template:function(data){
                    return '<div class="g-login-pop g-pop active" id="xglogin">'+
                           '    <div class="m-mask"></div>'+
                           '    <div class="m-box ">'+
                           '        <a href="#" class="link-close"></a>'+
                           '        <div class="form-box">  '+
                           '            <form name="LoginForm" method="post" action="/reg/login.php" onsubmit="return InputCheck(this)">'+
                           '            <div class="title-bar">帐号登录</div>                   '+
                           '            <div id="errMsg" class="error-msg"></div>                   '+
                           '            <div class="input-optimize">                        '+
                           '                <input type="text" id="loginInputUname" name="account">                     '+
                           '                <i class="clear-text"></i>                      '+
                           '                <i class="icon-deco icon-acco"></i>                     '+
                           '                <div class="placeholder" style="display: none;">用户名/手机号</div>                   '+
                           '            </div>                  '+
                           '            <div class="input-optimize">                        '+
                           '                <input type="password" class="hidden">                      '+
                           '                <input type="password" id="loginPassword" name="password">                      '+
                           '                <i class="icon-deco icon-pass"></i>                     '+
                           '                <div class="placeholder" style="display: none;">密码</div>                    '+
                           '            </div>                                  '+
                           '            <input type="submit" name="submit" class="login-btn" value="登录" id="loginSubmit">'+
                           '            <div class="bottom-bar">'+
                           '                <a href="javascript:;" >忘记密码</a>&nbsp;&nbsp;<a>|</a>&nbsp;&nbsp;'+
                           '                <a href="javascript:;" class="ui-reg" >注册新帐号</a>                '+
                           '            </div>  '+
                           '            </form>'+
                           '        </div>  '+
                           '    </div>'+
                           '</div>';
                },
                scope: {
                    list: "list",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    $($element).on("click",function(){
                        var _this = this;
                        $("body").append($el.template());
                        $(".g-pop .link-close").unbind("click").on("click",function(){
                            $(this).parents(".g-pop").removeClass("active").remove();
                        });
                        $(".g-pop .ui-reg").unbind("click").on("click",function(){
                            $(_this).parents(".top").find("*[ui-reg]").click();
                        });
                        
                    });
                }
            }
        })
        .directive('ui-reg', function() {
            return {
                template:function(data){
                    return '<div class="g-register-pop g-pop active" id="xgregister">'+
                            '            <div class="m-mask"></div>'+
                            '            <div class="m-box m-register-box">'+
                            '                <a href="#" class="link-close"></a>'+
                            '                <h2 class="title-bar">欢迎注册溪谷游戏平台帐号<span id="notice"></span></h2>'+
                            '                <div class="tab-trigger-bar">'+
                            '                            <a href="#" class="user-trigger" data-target="mUsernameRegisterPop">'+
                            '                        注册用户名帐号'+
                            '                        <span class="arrow"></span>'+
                            '                    </a>'+
                            '                    <a href="#" class="phone-trigger active" data-target="mPhoneRegisterPop">'+
                            '                        注册手机帐号'+
                            '                        <span class="arrow"></span>'+
                            '                    </a>'+
                            '                </div>'+
                            '                <div class="form-box">'+
                            '                    <!-- 手机注册 -->'+
                            '                    <div class="m-phone-register register-tab-box active" id="mPhoneRegisterPop">'+
                            '                        <form action="" id="mPhoneRegisterFormPop">'+
                            '                        <div>'+
                            '                            <label for="">手机号码</label>'+
                            '                            <div class="input-optimize">'+
                            '                                <input name="account" placeholder="请输入您的手机号码" type="text" id="registerPhonePop">'+
                            '                                <span class="error-msg"></span>'+
                            '                                <i class="icon-error"></i>'+
                            '                                <i class="icon-correct"></i>'+
                            '                            </div>'+
                            '                        </div>'+
                            '                        <div>'+
                            '                            <a href="#" class="get-checkcode disabled" id="getSafeCodePop">免费获取安全码</a>'+
                            '                            <span class=""></span>'+
                            '                        </div>'+
                            '                        <div>'+
                            '                            <label for="">安全码</label>'+
                            '                            <div class="input-optimize">'+
                            '                                <input type="text" name="vcode" placeholder="请输入安全码" id="registerSafeCodePop">'+
                            '                                <span class="error-msg"></span>'+
                            '                            </div>'+
                            '                        </div>'+
                            '                        <div>'+
                            '                    <label for="">密码</label>'+
                            '                    <div class="input-optimize">'+
                            '                    <input type="password" name="password" placeholder="placeholder" id="registerPhonePassPop">'+
                            '                    <span class="error-msg"></span>'+
                            '                    </div>'+
                            '                </div>'+
                            '                    <div>'+
                            '                    <a class="checkbox-optimize active">'+
                            '                    <i class="icon-agree" id="registerByPhoneAgreePop"></i>'+
                            '                    <input type="hidden" name="" value="">'+
                            '                    </a>'+
                            '                    <span href="#" id="registerByPhoneAgreeTxtPop" class="agree-txt active">我已阅读并同意《<a href="/index.php?s=/Article/agreement.html" target="_blank">溪谷手游用户注册协议</a>》'+
                            '                    </span>'+
                            '                    </div>'+
                            '                    <input type="submit" class="register-btn" value="注册" id="registerByPhoneSubmitPop">'+
                            '                </form>'+
                            '            </div>'+
                            '            <!-- 手机注册END -->'+
                            '            <!-- 账注册 -->'+
                            '            <div class="m-username-register register-tab-box" id="mUsernameRegisterPop">'+
                            '                <form action="/reg/reg.php" method="post" id="mNameRegisterFormPop">'+
                            '                    <div>'+
                            '                        <label for="">帐号</label>'+
                            '                        <div class="input-optimize">'+
                            '                            <input type="text" name="username" placeholder="6~30位数字、字母或下划线" id="userNameByNamePop">'+
                            '                            <i class="icon-error"></i>'+
                            '                            <i class="icon-correct"></i>'+
                            '                            <span class="error-msg"></span>'+
                            '                        </div>'+
                            '                    </div>'+
                            '                    <div>'+
                            '                        <label for="">设置密码</label>'+
                            '                        <div class="input-optimize">'+
                            '                            <input type="password" name="password" placeholder="6~30位数字、字母或特殊字符组成" id="userPassPop">'+
                            '                            <span class="error-msg"></span>'+
                            '                        </div>'+
                            '                    </div>'+
                            '                    <div>'+
                            '                        <label for="">确认密码</label>'+
                            '                        <div class="input-optimize">'+
                            '                            <input type="password" name="repassword" id="userConfirmPasssPop">'+
                            '                            <span class="error-msg"></span>'+
                            '                        </div>'+
                            '                    </div>'+
                            '                    <div class="checkcodeInput">'+
                            '                        <label for="">验证码</label>'+
                            '                        <div class="input-optimize">'+
                            '                            <input type="text" name="verify" id="registerNameVcodePop">'+
                            '                            <img src="/index.php?s=/Member/verify" alt="" class="checkcode">'+
                            '                            <span class="error-msg"></span>'+
                            '                        </div>'+
                            '                    </div>'+
                            '                    <div>'+
                            '                        <span class="checkbox-optimize active">'+
                            '                            <i class="icon-agree" id="registerByNameAgreePop"></i>'+
                            '                            <input type="hidden" name="" value="">'+
                            '                        </span>'+
                            '                        <span id="registerByNameAgreeTxtPop" class="agree-txt active">我已阅读并同意《<a href="" target="_blank">赛尔手游用户注册协议</a>》</span>'+
                            '                        <span class="agreeError"></span>'+
                            '                    </div>'+
                            '                    <input type="submit" name="submit" class="register-btn" value="注册" id="registerByNameSubmitPop">'+
                            '                </form>'+
                            '            </div>'+
                            '        </div>'+
                            '        <div id="registerPopErr" class="registerpop-error"></div>'+
                            '        <div class="box-bar">'+
                            '            <span class="has-account">'+
                            '                已有帐号？<a href="#" id="imeLogin" class="ime-login">立即登录</a>'+
                            '            </span>'+
                            '        </div>'+
                            '    </div>'+
                            '</div>';
                },
                scope: {
                    type: "type",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    $($element).on("click",function(){
                        $("body").append($el.template({}));
                        $(".g-pop .link-close").unbind("click").on("click",function(){
                            $(this).parents(".g-pop").removeClass("active").remove();
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