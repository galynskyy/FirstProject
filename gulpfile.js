var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("css", function(){
	return gulp.src("./src/styles/*.css")
		.pipe(concat("build.css"))
		.pipe(gulp.dest("./src/styles/"));
});