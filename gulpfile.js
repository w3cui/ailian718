var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var csso = require('gulp-csso');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var header = require('gulp-header');
var webserver = require("gulp-webserver");
// var babel = require("gulp-babel");
// var removeUseStrict = require("gulp-remove-use-strict");

var jsonEditor = require("gulp-json-editor");
var override = require('gulp-rev-css-url');
var cssver = require('gulp-make-css-url-version');
var makeUrlVer = require('gulp-make-css-url-version-extend');
// var base64 = require('gulp-base64');


var pkg = require('./package.json');
var config = require('./config/gulp.pro.config.js')(pkg);
var base64 = require('gulp-base64');

gulp.task('webserver', function() {
    gulp.src("./build/ydsc/") // 服务器目录（./代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
        livereload: true, // 启用LiveReload，去掉f5刷新的痛点
        open: true, // 服务器启动时自动打开网页
        port: 3010
    }));
});

var $myApp = {
	compress: false,
	data: config,
	"note": [
		'/**\n * <%= pkg.name %> - v<%= pkg.version %> <%= pkg.license %> License By \n * <%= pkg.description %> \n */\n<%= js %>', {
			pkg: pkg,
			js: ""
		}
	],
	minify(dest, $data) {
		//JS 压缩copy
		gulp.src([$data.css + '**/*.js', '!' + $data.css + '**/*.min.js'])
			// .pipe(babel({  
			//          presets: ['es2015']
			//      }))			
			.pipe(uglify())
			.pipe(header.apply(null, $myApp.note))
			//.pipe(rename({suffix: '.min'}))  
			.on('error', (e) => {
				console.log(e + "1");
			})
			.pipe(gulp.dest(dest));
	},
	removeuse($name, $data) {
		//拷贝IMG CSS
		gulp.task($name, () => {
			//copy原生CSS文件,IMG文件
			gulp.src([$data.css + "/**/*.min.js"])
				.pipe(gulp.dest($data.dest));

		});
	},
	copyCss($name, $data) {
		//拷贝IMG CSS
		gulp.task($name, () => {
			//copy原生CSS文件,IMG文件
			gulp.src(this.data[0].copeFormat($data))
				.pipe(gulp.dest($data.dest));
			// console.log('!' + $data.dest + '**/*.min.css');
			gulp.src([$data.css + '**/*.css', '!' + $data.dest + '**/*.min.css', '!' + $data.dest + 'css/plugin/*'])
				// .pipe(cssver({
				//            useDate: true
				//        }))
				.pipe(makeUrlVer({
					useDate: true
				}))
				// .pipe(base64({
				// 	baseDir: "build",
				// 	extensions: ['png','jpg'],
				// 	maxImageSize: 20 * 1024, 
				// 	debug: false 
				// }))
				.pipe(minifycss())
				.pipe(header.apply(null, $myApp.note))
				.pipe(gulp.dest($data.dest));
		});

	},
	allLess($name, $data) {
		//编译LESS
		gulp.task($name, () => {
			gulp.src([$data.less + '**/*.less',
					'!' + $data.less + '**/less_public/*.less',
					'!' + $data.less + '**/_*.less'
				])
				.pipe(less({
					compress: $myApp.compress
				}))
				.pipe(cssver({
					useDate: true
				}))
				
				.pipe(minifycss())
				.pipe(header.apply(null, $myApp.note))
				.on('error', (e) => {
					console.log(e);
				})
				.pipe(gulp.dest($data.dest))
		});
	},
	//生成网站版本号
	version($name, $data) {
		gulp.task($name, function() {
			gulp.src($data.src + "static.json")
				.pipe(jsonEditor(function(json) {
					var data = new Date();
					var getNum = function(num){
						if(num<10){
							return "0"+num;
						}
						return num;
					};
					json.version = data.getFullYear()+""+getNum(data.getMonth()+1)+""+getNum(data.getDate())+""+getNum(data.getHours())+""+getNum(data.getMinutes()) ;
					return json; // must return JSON object. 
				}))
				.pipe(gulp.dest($data.dest));
		});
	},
	watchTask($name, $data) {
		gulp.task($name, () => {
			gulp.src([$data.css + '/**/*.css', $data.css + '/**/*.js'])
				// .pipe(babel({  
				//          presets: ['es2015']  
				//      }))
				.on('error', (e) => {
					console.log(e);
				})
				.pipe(gulp.dest($data.dest));
		});
	}
};


var dest = pkg.env.dest; // 发布目录 
var src = pkg.env.src; // 原文件目录
var srcPlugin = src + "plugin/",
	destPlugin = dest + "plugin/";

//插件发布
gulp.task('pluginCopy', () => {
	//copy原生CSS文件,IMG文件

	gulp.src([srcPlugin + "**/*.js", '!' + srcPlugin + '**/*.min.js'])
		.pipe(uglify())
		.pipe(gulp.dest(destPlugin), (event) => {
			console.log(event);
		});

	gulp.src([srcPlugin + "**/*.css", '!' + srcPlugin + '**/*.min.css'])
		.pipe(minifycss())
		.pipe(gulp.dest(destPlugin));

	gulp.src([srcPlugin + '**/*.jpg', srcPlugin + '**/*.png', srcPlugin + '**/*.svg', srcPlugin + '**/*.gif', srcPlugin + '**/*.swf', srcPlugin + '**/*.eot', srcPlugin + '**/*.ttf', srcPlugin + '**/*.woff'])

		.pipe(gulp.dest(destPlugin), (event) => {
			console.log(event);
		});

});

$myApp.data.map((value, key) => {
	// 初始化基础命令
	value.init($myApp);
	// 发布脚步
	gulp.task(...value.dev($myApp));
	//自动编译
	gulp.task(...value.watch($myApp));
});



// // 全站编译
// gulp.task('default', gulpDefault);