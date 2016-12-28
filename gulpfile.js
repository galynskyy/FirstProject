"use strict"

var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
// var server = require('gulp-server-livereload');
// var webServer = require('gulp-webserver');
var cssnano = require('cssnano');
var nested = require('postcss-nested');
var short = require('postcss-short');
var assets = require('postcss-assets');
var Import = require('postcss-import');
var cssnext = require('cssnext');
//var postcss = require('gulp-concat-css');
var rigger = require('gulp-rigger');

// server =================================
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// Css =====================================
gulp.task('css', function () {
    var processors = [
    	Import,
        autoprefixer({browsers: ['last 3 version']}),
    	cssnext({
    		'customProperties': true,
    		'customFunction': true,
    		'customSelectors': true,
    	}),
    	//cssnano(),
    	nested,
    	short,
    	assets({
    		loadPaths: ['app/fonts/', 'app/img', 'app/pict'],
    		relativeTo: 'app/css/'
    	}),
    ];
    return gulp.src('./css/postcss/style.css')
        .pipe(postcss(processors))
        .pipe(rename('main.css')) // как называется новый файл
        .pipe(gulp.dest('./app/css/')) // куда его положить
        .pipe(connect.reload()); // обновить страницу
});

// html =======================================

gulp.task('html', function () {
	gulp.src('./develop/*.html')
    .pipe(rigger()) //Прогоним через rigger
    .pipe(connect.reload())
    .pipe(gulp.dest('./app/')) //Выплюнем их в папку app
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('css/postcss/**', ['css'])
	gulp.watch('develop/*.html', ['html'])
});

gulp.task('default', ['connect', 'watch']);


