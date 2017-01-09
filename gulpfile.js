var gulp 				= require("gulp");
var browserSync 		= require("browser-sync");
var concat				= require("gulp-concat");
var cssnano				= require("cssnano");
var rename				= require("gulp-rename");
var del					= require("del");
var autoprefixer    	= require("autoprefixer");
var postcss 			= require("gulp-postcss");
var imagemin 			= require("gulp-imagemin");

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
		.pipe(gulp.dest("src/styles"));
});

gulp.task("fonts", function() {
	return gulp.src("src/fonts/**/*")
	    .pipe(gulp.dest("public/fonts"));
});

gulp.task("js", function() {
    return gulp.src("src/scripts/**/*")
    	.pipe(concat("chart.js"))
		.pipe(gulp.dest("public/scripts"));
});

gulp.task("html", function() {
	return gulp.src("src/*.html")
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
			baseDir: "src"
		},
		notify: false
	});
});

gulp.task("clean", function() { 
	return del.sync("public/*");
});

gulp.task("watch", ["browser-sync", "styles"], function() {
	gulp.watch("src/styles/**/*.css", ["styles"]);
	gulp.watch("src/*.html", browserSync.reload);
	gulp.watch("src/scripts/**/*.js", browserSync.reload);
});

gulp.task("build", ["clean", "styles", "fonts", "js", "html", "img"], function() {
	return gulp.src("src/styles/*min.css")
		.pipe(gulp.dest("public/styles"));
});

gulp.task("dev", ["build", "browser-sync", "watch"]);
gulp.task("default", ["build"]);