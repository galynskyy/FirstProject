'use strict';

const gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
	return gulp.src('./static/styles/**/*.css')
		.pipe(concatCss('bundle.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(minifyCSS())
		.pipe(rename('bundle.min.css'))
		.pipe(gulp.dest('app/css'));
});

gulp.task('html', function () {
	return gulp.src('*.html')
		.pipe(gulp.dest('app'));
});

gulp.task('fonts', function () {
	return gulp.src([
		'./static/fonts/*',
	])
		.pipe(gulp.dest('app/static/fonts'));
});

gulp.task('scripts', function () {
	return gulp.src([
		'./src/index.js',
	])
		.pipe(concat('min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('images', function () {
	gulp.src('./static/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('app/static/img'))
});

gulp.task('clean', function () {
	return gulp.src('app/')
		.pipe(clean());
});

gulp.task('default', ['html', 'css', 'scripts', 'images', 'fonts']);