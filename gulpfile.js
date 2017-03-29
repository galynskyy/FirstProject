var gulp = require("gulp");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var cssnano = require("cssnano");
var rename = require("gulp-rename");
var del = require("del");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var imagemin = require("gulp-imagemin");
var handlebars = require("gulp-compile-handlebars");
var eslint = require("eslint");
var stylelint = require("stylelint");
var jsdoc = require('gulp-jsdoc3');

gulp.task("styles", function() {
	var processors = [
		stylelint,
		autoprefixer({
			browsers: ["last 3 version"]
		}),
		cssnano()
	];
	return gulp.src("src/styles/**/*.css")
		.pipe(postcss(processors))
		.pipe(concat("build.min.css"))
		.pipe(gulp.dest("public/styles"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("fonts", function() {
	return gulp.src("src/fonts/**/*")
		.pipe(gulp.dest("public/fonts"));
});

gulp.task("js", function() {
	return gulp.src("src/scripts/**/*")
		.pipe(concat("build.js"))
		.pipe(browserSync.reload({
			stream: true
		}))
		.pipe(gulp.dest("public/scripts"));
});

gulp.task("html", function() {
	return gulp.src("src/*.html")
		.pipe(browserSync.reload({
			stream: true
		}))
		.pipe(gulp.dest("public"));
});

gulp.task("handlebars", function() {
	var options = {
		batch : ["src/partials"]
	};

	return gulp.src("src/index.hbs")
		.pipe(handlebars({}, options))
		.pipe(rename("index.html"))
		.pipe(gulp.dest("public"));
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

gulp.task("doc", function(cb) {
	gulp.src(["README.md", "src/scripts/**/*.js"],
		{
			read: false
		})
		.pipe(jsdoc(cb));
});

gulp.task("watch", ["browser-sync", "styles"], function() {
	gulp.watch("src/styles/**/*.css", ["styles"]);
	gulp.watch("src/partials/**/*.hbs", ["handlebars"]);
	gulp.watch("src/scripts/**/*.js", ["js"]);
});

gulp.task("build", ["clean", "styles", "fonts", "js", "handlebars", "img", "html", "doc"], function() {
	return gulp.src("src/styles/*min.css")
		.pipe(gulp.dest("public/styles"));
});

gulp.task("dev", ["build", "browser-sync", "watch"]);
gulp.task("default", ["build"]);