/** lwj-v MIT License By  */
 // 合并打包配置
wui.define(function(exports){
  var cache = wui.cache;
  wui.config({
    dir: cache.dir.replace(/js\/dest\/$/, '')
  });
  exports('wui.all', wui.v);
});
