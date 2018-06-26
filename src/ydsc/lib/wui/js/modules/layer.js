/** lwj-v MIT License By  */
 !(function(win, wui) {
	"use strict";
	/**
	 * 弹窗插件依赖注入
	 */
	win.layer = {}
	win.layer.host = wui.cache.dir+"plugin/layer/";
	wui.loadAll({
		uses: ["plugin/layer/layer.js"]
	}, function() {
		wui.layer = layer;
	});
	

})(window, wui);