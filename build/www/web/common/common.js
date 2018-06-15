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
                           '            <form name="LoginForm" method="post" onsubmit="return wui.reg.setLogin(this)" >'+
                           '            <div class="title-bar">帐号登录</div>                   '+
                           '            <div id="errMsg" class="error-msg"></div>                   '+
                           '            <div class="input-optimize">                        '+
                           '                <input type="text"  name="username">                     '+
                           '                <i class="clear-text" style="display:none;"></i>                      '+
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
                        $element = $el.element,
                        $template = $($el.template());
                    var _id = 'ui_login_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();
                        $template.attr("id", _id);
                    $($element).on("click",function(){
                        var _this = this;
                        $("body").append($template);
                        $(".g-pop .link-close").unbind("click").on("click",function(){
                            $(this).parents(".g-pop").remove();
                            $("#"+_id).remove();
                        });
                        $(".g-pop .ui-reg").unbind("click").on("click",function(){                            
                            $(_this).parents(".top").find("*[ui-reg]").click();
                            $("#"+_id).remove();
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
                            '                    <a href="#" class="phone-trigger active" data-target="mPhoneRegisterPop">'+
                            '                        注册手机帐号'+
                            '                        <span class="arrow"></span>'+
                            '                    </a>'+
                            '                    <a href="#" class="user-trigger" data-target="mUsernameRegisterPop">'+
                            '                        注册用户名帐号'+
                            '                        <span class="arrow"></span>'+
                            '                    </a>'+
                            '                </div>'+
                            '                <div class="form-box">'+
                            '                    <!-- 手机注册 -->'+
                            '                    <div class="m-phone-register register-tab-box active" id="mPhoneRegisterPop">'+
                            '                        <form action="" id="mPhoneRegisterFormPop" onsubmit="return wui.reg.setPhoneReg(this)">'+
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
                            '                            <a href="#" class="get-checkcode " onclick="wui.reg.setSms(this)" id="getSafeCodePop">免费获取安全码</a>'+
                            '                            <span class=""></span>'+
                            '                        </div>'+
                            '                        <div>'+
                            '                            <label for="">安全码</label>'+
                            '                            <div class="input-optimize">'+
                            '                                <input type="text" name="vcode" placeholder="安全码" id="registerSafeCodePop">'+
                            '                                <span class="error-msg"></span>'+
                            '                            </div>'+
                            '                        </div>'+
                            '                        <div>'+
                            '                    <label for="">密码</label>'+
                            '                    <div class="input-optimize">'+
                            '                    <input type="password" name="password" placeholder="密码" id="registerPhonePassPop">'+
                            '                    <span class="error-msg"></span>'+
                            '                    </div>'+ 
                            '                </div>'+
                            '                    <div>'+
                            '                    <label class="checkbox-optimize active">'+
                            '                    <i class="icon-agree" id="registerByPhoneAgreePop"></i>'+
                            '                    <input type="checkbox" name="agree" value="1" checked  >'+
                            '                    </label>'+
                            '                    <span href="#" id="registerByPhoneAgreeTxtPop" class="agree-txt active">我已阅读并同意《<a href="/index.php?s=/Article/agreement.html" target="_blank">溪谷手游用户注册协议</a>》'+
                            '                    </span>'+
                            '                    </div>'+
                            '                    <input type="submit" class="register-btn" value="注册" id="registerByPhoneSubmitPop">'+
                            '                </form>'+
                            '            </div>'+
                            '            <!-- 手机注册END -->'+
                            '            <!-- 账注册 -->'+
                            '            <div class="m-username-register register-tab-box" id="mUsernameRegisterPop">'+
                            '                <form method="post" id="mNameRegisterFormPop" onsubmit="return wui.reg.setNameReg(this)">'+
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
                            '                        <label class="checkbox-optimize active">'+
                            '                            <i class="icon-agree" id="registerByNameAgreePop"></i>'+
                            '                            <input type="checkbox" name="agree" value="1" checked >'+
                            '                        </label>'+
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
                    var $template = $($el.template({}))
                    var _id = 'ui_reg_' + Math.floor(Math.random() * 100).toString() + new Date().getTime().toString();
                    $template.attr("id", _id).addClass('active');
                    $($element).on("click",function(){
                        var _this = this;
                        $("body").append($template);
                        $(".g-pop .link-close").unbind("click").on("click",function(){
                            $(this).parents(".g-pop").remove();
                            $("#"+_id).remove();
                        });
                        $("#"+_id).find(".tab-trigger-bar a").unbind("click").on("click",function(){
                            $("#"+_id).find(".tab-trigger-bar a").removeClass("active");
                            $(this).addClass("active");
                            $("#"+_id).find(".m-register-box .form-box > div").hide();
                            $("#"+_id).find(".m-register-box .form-box > div:eq("+$(this).index()+")").show();
                        });
                        $("#"+_id).find("input[type='checkbox']").unbind("change").on("change",function(){
                            if($(this).prop('checked')){
                                $(this).parent().addClass('active');
                            }else{
                                $(this).parent().removeClass('active');
                            }
                        });

                        $("#"+_id).find(".ime-login").unbind("click").on("click",function(){                            
                            $(_this).parents(".top").find("*[ui-login]").click();
                            $("#"+_id).remove();
                        });

                    }); 

                }
            }
        })
        .directive('ui-game-pay', function() {
            return {
                scope: {
                    url: "url",
                },
                link: function($el) {
                    var $scope = $el.scope,
                        $element = $el.element;
                    $($element).unbind('click').on("click",function(){
                        layer.open({
                          type: 2,
                          title: '充值中心',
                          shadeClose: true,
                          shade: false,
                          maxmin: true, //开启最大化最小化按钮
                          area: ['1000px', '600px'],
                          content: $scope.url
                        });
                    });
                }
            }
        });



    /*登陆注册处理*/
    $wui.reg = {
        ucenterSmsUrl : "/index.php?r=ucenter/sms",
        ucenterLogin : "/index.php?r=ucenter/login",
        ucenterRegister : "/index.php?r=ucenter/register",
        test:{
            phone:/^1[3|4|5|8][0-9]\d{4,8}$/,
            username:/^[0-9A-Za-z_]{6,30}$/,
            password:/^[0-9A-Za-z_]{6,30}$/,
        },
        getLoginRegSms : function(url,data,success){
            var load = layer.load();

            console.log(data,url);
            return $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data,
            })
            .done(function(data) {
                layer.close(load);
                success(data);
            })
            .fail(function() {
                layer.msg("服务器繁忙，请稍后再试");
                success(data);
                layer.close(load);
            });
            
        },
        /*发送手机验证码*/
        setSms:function(_t){
            var phonePop = $("#registerPhonePop").val();
            if($(_t).hasClass("disabled")) return false;
            if(!this.test.phone.test(phonePop)){
                layer.msg("请输入正确的手机号码！")
                return false; 
            }
            var $this = this;
            // 发送成功及交互
            this.setSmsSetInterval = function(_this){
                var sm = 59;
                var set = setInterval(function(){
                    if(sm <=0 ){
                        $(_this).html("免费获取安全码").removeClass('disabled');
                        clearInterval(set);
                        return false;
                    }
                    $(_this).html(sm +"秒后、重新获取").addClass('disabled');
                    sm --;
                },1000)
            }
            // 开始送验证码
            this.getLoginRegSms(this.ucenterSmsUrl,{account:phonePop},function(data){
                $this.setSmsSetInterval(_t);
            });
        },
        // getFormData  统一校验
        getFormData:function(el){
            var isForm = true;
            var ret = {};
            var $this = this;
            var formData = $(el).serializeArray();
            var password = "";
            $.each(formData,function(key, val) {
                if( this.name == "password" ){
                    password = this.value;
                }
                if(this.name == "username" && (this.value == "" || !$this.test.username.test(this.value) ) ){
                    isForm = false;
                    layer.msg("账号不能为空，长度6-32，只能是字母或数字！");
                    return false;
                }else if(this.name == "account" && (this.value == "" || !$this.test.phone.test(this.value) ) ){
                    isForm = false;
                    layer.msg("请输入正确的手机号码！");
                    return false;
                }else if(this.name == "vcode" && this.value == "" ){
                    isForm = false;
                    layer.msg("安全码不能为空！");
                    return false;
                }else if(this.name == "password" && (this.value == "" || this.value.length < 6)){
                    isForm = false;
                    layer.msg("密码不能为空并大于6位！");
                    return false;
                }else if(this.name == "repassword" &&  password != this.value){
                    isForm = false;
                    layer.msg("两次输入的密码不一致！");
                    return false;
                }else if(this.name == "verify" && this.value == ""){
                    isForm = false;
                    layer.msg("验证码不能为空！");
                    return false;
                }
                else if(this.name=="agree"  &&  !$(el).find("input[name='agree']").prop('checked')){
                    layer.msg("请同意注册协议才可以注册账号！");
                    isForm = false;
                    return false;
                }
                ret[this.name] = this.value;
            });
            return [isForm,ret];
        },
        // 手机验证码注册账号
        setPhoneReg:function(el){
            var $this = this;
            var formData = this.getFormData(el);
            // 校验form是否通过验证
            if(formData[0]){
                this.getLoginRegSms(this.ucenterRegister,formData[1],function(data){
                    layer.msg("注册成功！")
                });
            }

            return false;
        },
        // 账号名注册
        setNameReg:function(el){
            var $this = this;
            var formData = this.getFormData(el);

            // 校验form是否通过验证
            if(formData[0]){
                this.getLoginRegSms(this.ucenterRegister,formData[1],function(data){
                    layer.msg("注册成功！")
                });
            }

            return false;
        },
        // 登陆提交
        setLogin:function(el){
            var $this = this;
            var formData = this.getFormData(el);
 
            // 校验form是否通过验证
            if(formData[0]){
                this.getLoginRegSms(this.ucenterLogin,formData[1],function(data){
                    layer.msg("登陆成功！")
                });
            }

            return false;
        }
    };



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