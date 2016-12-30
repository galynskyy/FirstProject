const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

gulp.task('default', function () {
	console.log('Welcome to Gulp!');
});

gulp.task('css', function () {
	var processors = [
		autoprefixer
	];
	return gulp.src('./static/styles/**/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./public/styles/'));
});

gulp.task('html', function () {
	return gulp.src('*.html')
		.pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
	gulp.watch('./static/styles/**/*.css', ['css']);
});

gulp.task('scripts', function () {
	return gulp.src([
		'./src/index.js',
	])
		.pipe(concat('min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
})
