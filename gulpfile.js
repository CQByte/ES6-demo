var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var del = require('del');

gulp.task("default", function () {
	// return gulp.src("src/**/*.js")
	// 		.pipe(sourcemaps.init())
	// 		.pipe(babel())
	// 		.pipe(concat("all.js"))
	// 		.pipe(sourcemaps.write("."))
	// 		.pipe(gulp.dest("./dist"));
});

gulp.task("demo01", function () {
	return gulp.src("src/demo01/index.spec.js")
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(concat("index.js"))
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest("src/demo01/dist"));
});