var gulp 			= require('gulp'),						// Подключение gulp
	browserSync 	= require('browser-sync'),				// Подключение browser-sync
	concat			= require('gulp-concat'),				// Подключение gulp-concat (для конкатенации файлов)
	cssnano			= require('cssnano'),					// Подключение пакета минификации css
	rename			= require('gulp-rename'),				// Подключение плагина переименования и добавления суффиксов в файлы
	del				= require('del'),						// Подключение библиотеки удаления файлов и папок
	autoprefixer    = require('autoprefixer');				// Подключение библиотеки автодобавления префиксов
	postcss 		= require("gulp-postcss");				// Подключение postCSS, для тех кто изучил

gulp.task('styles', function () { 							// Создаем таск styles
	var processors = [ 										// Создаем переменную
		autoprefixer({browsers: ['last 1 version']}), 		// Помещаем плагины в переменную
		cssnano(), 
	]; 
	return gulp.src('src/styles/**/*.css') 					// Берем источник
		.pipe(postcss(processors)) 							// Магия
		.pipe(gulp.dest('src/styles')); 					// Выгружаем в src/styles
});

gulp.task('browser-sync', function(){						// Создаем таск browser-sync 
	browserSync({											// Выполняем browser-sync
		server: {											// Определяем параметры сервера
			baseDir: 'public'									// Определяем папку сервера
		},
		notify: false										// Отключение уведомлений об успешном коннекте
	});
});

gulp.task('clean', function() {								// Создаем таск clean, 
	return del.sync('public');								// который чистит папку public перед сборкой
});

gulp.task('watch', ['browser-sync', 'styles'], function(){	
 /* Создаем таск watch, внутри приоритетно запускаем таски browser-sync и css-libs
 	 чтобы задать последовательность и применились изменения, если таковые были. 
 	 Необходимо для корректного отображения изменения на момент запуска сервера */ 	 
	gulp.watch('src/styles/**/*.css', ['styles']);				// Наблюдение за css-файлами в папке styles
	gulp.watch('src/*.html', browserSync.reload);				// Наблюдение за html-файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);			// Наблюдение за js-файлами в папке js
});

gulp.task('build', ['clean'], function() {						// Создаем таск build, предварительно запустив очистку папки public 
	var buildCss = gulp.src([
			'src/styles/build.min.css',							// Берем из источника минифицированные файлы стилей
		])
	.pipe(gulp.dest('public/styles'));							// Выгружаем в public/styles

	var buildFonts = gulp.src('src/fonts/**/*')					// Собираем все шрифты в папке fonts
	.pipe(gulp.dest('public/fonts'));							// Выгружаем в public/fonts

	var buildJs = gulp.src('src/js/**/*')						// Собираем js-файлы
	.pipe(concat("build.js"))
	.pipe(gulp.dest('public/js'));								// Выгружаем в public/js

	var buildHtml = gulp.src('src/*.html')						// Собираем html-файлы
	.pipe(gulp.dest('public'));									// Выгружаем в папку public
});