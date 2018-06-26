/**
 *  - v1.0.0  License By 
 * 研发技术中心-技术研发部 
 */
!function(e,t){t.directive("ui-layer",function(){return{template:"<div ui-attr selecteda='---ui-attr内嵌组件---'>我是第一个组件：</div>",scope:{string:"selecteda",object:"=list"},link:function(e){var t=e.scope,i=$(e.template).append("（我是属性值："+t.string+")");e.element.append(i)}}}).directive("ui-attr",function(){return{template:"<div>我是第二个组件：</div>",scope:{string:"selecteda",object:"=list"},link:function(e){var t=e.scope,i=$(e.template).append("（我是属性值："+t.string+")");e.element.append(i)}}})}(window,wui);