STEP1. Gulp

1. 作为开发依赖安装gulp
```Shell
npm i gulp
```

2. 在根目录创建gulpfile.js
```js
var gulp = require('gulp')

gulp.task('default', function () {
	console.log('default task')
})
```

3. 运行gulp
```Shell
npx gulp
```

STEP2. Babel

1. 作为开发依赖安装Babel
```Shell
npm i @bebel/core gulp-babel
npm i -g @babel/cli
```

2. 安装babel插件，使用转换 ES2015+ 的 env preset
```shell
npm i @babel/preset-env
```

3. 配置babel.config.js或.babelrc
```js
{
  const presets = [
  	["@babel/env", {
  		targets: {
  			chrome: "67",
  			safari: "11.1"
  		},
  		useBuiltIns: "usage"
  	}]
  ];
  
  module.exports = { presets };
}
```
```
{
  "presets": ["@babel/env"]
}
```
[https://babel.docschina.org/](https://babel.docschina.org/)

4. 在task中配置使用babel
```js
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
```

> 目前为止，所做的只是能够通过gulp调用babel转义ES6，如果需要打包资源还需要打包工具-browserify、webpack、rollup等；但是这些工具多少都有
> 与gulp重复的功能，比如通过插件他们都可以实现转义、压缩、合并等
> 目前在我看来，开发 library 项目比较适合使用browserify（正如其名，浏览器化；做的就是把node风格的模块适配到浏览器可执行。不需要考虑非代码资源的打包工作），
> 而webpack则适合开发大型单页应用，对所有资源进行打包管理
> 至于管理系统等常用的传统动态页面等我认为使用gulp+browserify较为合适