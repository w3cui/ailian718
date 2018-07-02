/**
 *  - v1.0.0  License By 
 * 研发技术中心-技术研发部 
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","jquery.validate.min"],a):a(jQuery)}(function(a){var e="";a.extend(a.validator.messages,{required:e+"必填",remote:e+"请修正此栏位",email:e+"请输入有效的电子邮件",url:e+"请输入有效的网址",date:e+"请输入有效的日期",dateISO:e+"请输入有效的日期 (YYYY-MM-DD)",number:e+"请输入正确的数字",digits:e+"只能输入数字",creditcard:e+"请输入有效的信用卡号码",equalTo:e+"你的输入不相同",extension:e+"请输入有效的后缀",maxlength:a.validator.format(e+"最多 {0} 个字"),minlength:a.validator.format(e+"最少 {0} 个字"),rangelength:a.validator.format(e+"请输入长度为 {0} 至 {1} 之间的字串"),range:a.validator.format(e+"请输入 {0} 至 {1} 之间的数值"),max:a.validator.format(e+"请输入不大于 {0} 的数值"),min:a.validator.format(e+"请输入不小于 {0} 的数值")})});