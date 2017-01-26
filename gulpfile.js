var gulp = require("gulp");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var cssnano = require("cssnano");
var rename = require("gulp-rename");
var del	= require("del");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var imagemin = require("gulp-imagemin");
var jshintStylish = require("jshint-stylish");

gulp.task("styles", function() {
	var processors = [
		autoprefixer({
			browsers: ["last 3 version"]
		}),
		cssnano()
	];
	return gulp.src("src/styles/**/*.css")
		.pipe(postcss(processors))
		.pipe(concat("build.min.css"))
		.pipe(gulp.dest("public/styles"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("fonts", function() {
	return gulp.src("src/fonts/**/*")
	    .pipe(gulp.dest("public/fonts"));
});

gulp.task("js", function() {
    return gulp.src("src/scripts/**/*.js")
    	.pipe(concat("min.js"))
		.pipe(gulp.dest("public/scripts"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("jshint", function() {
	return gulp.src("src/scripts/**/*.js")
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("html", function() {
	return gulp.src("src/*.html")
		.pipe(gulp.dest("public"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("img", function() {
	return gulp.src("src/assets/icons/*")
		.pipe(imagemin())
		.pipe(gulp.dest("public/assets/icons"));
});

gulp.task("browser-sync", function() {
	browserSync({
		server: {
			baseDir: "public"
		},
		notify: false
	});
});

gulp.task("clean", function() { 
	return del.sync("public/*");
});

gulp.task("watch", ["browser-sync", "styles", "html", "js"], function() {
	gulp.watch("src/styles/**/*.css", ["styles"]);
	gulp.watch("src/*.html", ["html"]);
	gulp.watch("src/scripts/**/*.js", ["js"]);
});

gulp.task("build", ["clean", "styles", "fonts", "jshint", "js", "html", "img"], function() {
	return gulp.src("src/styles/*min.css")
		.pipe(gulp.dest("public/styles"));
});

gulp.task("dev", ["build", "browser-sync", "watch"]);
gulp.task("default", ["build"]);