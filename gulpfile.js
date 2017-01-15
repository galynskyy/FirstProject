var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');

gulp.task('mincss', function() {
	return gulp.src('./static/styles/*.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest('./public/styles/default.min.css'));
});