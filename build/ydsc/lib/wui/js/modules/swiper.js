/**
 *  - v1.0.0  License By 
 * 研发技术中心-技术研发部 
 */
!function(i,n){"use strict";n.swiper=function(i){return i.init=function(i,n,e){return this.el=i,this.scope=n,this.scope.config=this.scope.config?this.scope.config:{pagination:".swiper-pagination",paginationClickable:".swiper-pagination",nextButton:".swiper-button-next",prevButton:".swiper-button-prev"},this.dir=e,this.scope.config.onInit=function(n){$(i).addClass("opacity1")},this.service()},i.service=function(){var i=new Swiper(this.el,this.scope.config);return i},i}({}),n.directive("ui-swiper",function(){return{uses:["plugin/swiper/js/swiper.js"],addcss:["plugin/swiper/swiper.css"],scope:{config:"=config",callback:"~complete"},link:function(i){var n=i.scope,e=i.fn.swiper,e=e.init(i.element,n,i.fn.cache.dir+"plugin/swiper/");"undefined"!=typeof n.config.initialSlide&&$(i.element).find(".swiper-slide:eq("+(n.config.initialSlide||0)+")").addClass("active"),n.callback&&n.callback(e)}}})}(window,wui);