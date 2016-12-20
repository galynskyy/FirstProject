var gulp = require("gulp");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();

gulp.task("dev", ["styles", "html", "js", "assets", "fonts", "server", "watch"]);

gulp.task("styles", function() {
	return gulp.src("./src/styles/**/*.css")
		.pipe(concat("build.css"))
		.pipe(gulp.dest("./public/styles/"));
});

gulp.task("html", function() {
	return gulp.src("./src/*.html")
		.pipe(gulp.dest("./public/"));
});


gulp.task("assets", () => {
    gulp.src("./src/assets/**/*.svg")
        .pipe(gulp.dest("./public/assets/"));
});

gulp.task("fonts", () => {
    gulp.src("./src/fonts/**/*.ttf")
        .pipe(gulp.dest("./public/fonts/"));
});

gulp.task("js", function() {
	return gulp.src("./src/scripts/**/*.js")
		.pipe(concat("build.js"))
		.pipe(gulp.dest("./public/scripts/"));
});

gulp.task("server", function () {
	browserSync.init({
        	server: {
            		baseDir: "./public"
        	}
	});
});

gulp.task("watch", function() {
	gulp.watch("./src/styles/**/*.css", ["styles"]);
	gulp.watch("./src/*.html", ["html"]);
	gulp.watch("./src/scripts/**/*.js", ["js"]);
});