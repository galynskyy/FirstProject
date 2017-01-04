var gulp 			= require('gulp');
var browserSync 	= require('browser-sync');
var concat			= require('gulp-concat');
var cssnano			= require('cssnano');
var rename			= require('gulp-rename');
var del				= require('del');
var autoprefixer    = require('autoprefixer');
var postcss 		= require('gulp-postcss');
var imagemin 		= require('gulp-imagemin');

gulp.task('styles', function () {
	var processors = [
		autoprefixer({
			browsers: ['last 1 version']
		}),
		cssnano(),
	];
	return gulp.src('src/styles/**/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('src/styles'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'public'
		},
		notify: false
	});
});

gulp.task('clean', function() { 
	return del.sync('public');
});

gulp.task('watch', ['browser-sync', 'styles'], function(){ 
	gulp.watch('src/styles/**/*.css', ['styles']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean'], function() {
	var buildCss = gulp.src([
			'src/styles/build.min.css'
		])
	.pipe(gulp.dest('public/styles'));

	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('public/fonts'));

	var buildJs = gulp.src('src/js/**/*')
	.pipe(concat("build.js"))
	.pipe(gulp.dest('public/js'));

	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('public'));

	var buildImg = gulp.src('src/assets/icons/*')
	.pipe(imagemin())
	.pipe(gulp.dest("public/icons"));
});

gulp.task("dev", ["build", "browser-sync", "watch"]);
gulp.task("default", ["build"]);