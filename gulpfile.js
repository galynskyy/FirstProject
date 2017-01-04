"use strict";

const gulp = require("gulp");
const concatCss = require("gulp-concat-css");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("css", function () {
	return gulp.src("./static/styles/**/*.css")
		.pipe(concatCss("bundle.css"))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(minifyCSS())
		.pipe(rename("bundle.min.css"))
		.pipe(gulp.dest("public/styles"));
});

gulp.task("html", function () {
	return gulp.src("*.html")
		.pipe(gulp.dest("public"));
});

gulp.task("fonts", function () {
	return gulp.src([
		"./static/fonts/*",
	])
		.pipe(gulp.dest("public/fonts"));
});

gulp.task("scripts", function () {
	return gulp.src([
		"./src/index.js",
	])
		.pipe(concat("min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("public/scripts"));
});

gulp.task("images", function () {
	gulp.src("./static/img/*")
		.pipe(imagemin())
		.pipe(gulp.dest("public/icons"))
});

gulp.task("clean", function () {
	return gulp.src("public/")
		.pipe(clean());
});

gulp.task("default", ["html", "css", "scripts", "images", "fonts"]);