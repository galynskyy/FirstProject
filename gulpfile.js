const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

//example
gulp.task('default', function() {
	console.log('Welcome to Gulp!');
});

//style
gulp.task('css', function() {
	var processors = [autoprefixer
	];
	return gulp.src('./static/styles/**/*.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest('./public/styles/'));
});

//html
gulp.task('html', function() {
	return gulp.src('*.html')
	.pipe(gulp.dest('./public/'));
});

//watch
gulp.task("watch", function() {
	gulp.watch('./static/styles/**/*.css', ['css']);
});

//scripts
gulp.task('scripts', function() {
	return gulp.src([
		'./src/index.js',
	])
	.pipe(concat('min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/js'));
})
