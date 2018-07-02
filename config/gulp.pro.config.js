
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

let env;

module.exports = (pkg) => {
	env = pkg.env;
	let filelist = env.taskName;
	var data = [];
	filelist.map((value, key) => {
		data.push(mod(value, pkg));
	})
	return data;
};

let mod = (filename, pkg) => ({
	name: "", //
	filename: filename, // 模块的文件名
	// package项目配置
	version: pkg.version,
	env,
	// 配置
	exports: {
		css: env.src + filename + "/",
		less: env.src + filename + "/",
		dest: env.dest + filename + "/",
		src: env.src + filename + "/"
	},
	// 文件压缩格式
	copeFormat($data) {
		var data = [];
		[...this.env.images, ...this.env.mv, ...this.env.font].forEach((word) => data.push($data.css + '/**/*' + word));
		return data;
	},
	// 监听文件类型
	wat() {
		return [
			this.exports.css + '**/*.js',
			this.exports.css + '**/*.css',
			this.exports.less + '**/*.less'
		];
	},
	// 初始化命令
	init($myApp) {
		gulp.task(filename + "Minify", () => {
			$myApp.minify(this.exports.dest + "/", this.exports);
		});
		$myApp.copyCss(filename + "Copy_css", this.exports);
		$myApp.allLess(filename + "All_less", this.exports);
		$myApp.watchTask(filename + "Watch", this.exports);
		$myApp.removeuse(filename + "Use", this.exports);
		$myApp.version(filename + "Version",this.exports);

	},
	// 发布命令绑定
	dev($myApp) {
		return [filename + "Build", (cb) => {
			runSequence(filename + "Copy_css",filename + "All_less",filename + "Version", "pluginCopy" , filename + "Minify",filename + "Use", cb);
		}];
	},
	// 监听创建
	watch($myApp) {
		let watchdata = [filename + 'Watch', filename + "All_less"];
		return [filename, ['webserver',...watchdata], (cb) => {
			gulp.watch(this.wat(),
				watchdata);
		}];
	}
});