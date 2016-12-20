var gulp = require("gulp");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();

gulp.task("dev", ["styles", "server", "watch"]);

gulp.task("styles", function() {
	return gulp.src("./src/styles/**/*.css")
		.pipe(concat("build.css"))
		.pipe(gulp.dest("./public/styles/"));
});

gulp.task("server", function () {
	browserSync.init({
        	server: {
            		baseDir: "./src"
        	}
	});
});

gulp.task("watch", function() {
	gulp.watch("./src/styles/**/*.css", ["styles"]);
});
