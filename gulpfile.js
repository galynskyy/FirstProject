var gulp 			= require('gulp'),						// Подключение gulp
	browserSync 	= require('browser-sync'),				// Подключение browser-sync
	concat			= require('gulp-concat'),				// Подключение gulp-concat (для конкатенации файлов)
	cssnano			= require('cssnano'),					// Подключение пакета минификации css
	rename			= require('gulp-rename'),				// Подключение плагина переименования и добавления суффиксов в файлы
	del				= require('del'),						// Подключение библиотеки удаления файлов и папок
	autoprefixer    = require('autoprefixer');				// Подключение библиотеки автодобавления префиксов
	postcss 		= require("gulp-postcss");				// Подключение postCSS, для тех кто изучил

gulp.task('css-libs', function() {							// Создаем таск css-libs
	return gulp.src('src/styles/**/*.css')					// Задаем источник (откуда брать)
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))	// Создаем префиксы
		.pipe(cssnano())									// Сжимаем
		.pipe(rename({suffix: '.min'}))						// Добавляем суффикс .min в имени файла
		.pipe(gulp.dest('src/styles/min'))					// Выгружаем результат в папку src/styles/min
		.pipe(browserSync.reload({ stream: true }));		// Обновляем css на странице при изменении
});

gulp.task('browser-sync', function(){						// Создаем таск browser-sync 
	browserSync({											// Выполняем browser-sync
		server: {											// Определяем параметры сервера
			baseDir: 'src'									// Определяем папку сервера
		},
		notify: false										// Отключение уведомлений об успешном коннекте
	});
});

gulp.task('clean', function() {								// Создаем таск clean, 
	return del.sync('public');								// который чистит папку public перед сборкой
});

gulp.task('clear-cache', function() {
	return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'css-libs'], function(){	// Создаем таск watch, внутри приоритетно запускаем таски browser-sync и css-libs
	gulp.watch('src/styles/**/*.css', ['css-libs']);			// Наблюдение за css-файлами в папке styles
	gulp.watch('src/*.html', browserSync.reload);				// Наблюдение за html-файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);			// Наблюдение за js-файлами в папке js
});

gulp.task('build', ['clean'], function() {						// Создаем таск build, предварительно запустив очистку папки public 
	var buildCss = gulp.src([
			'src/styles/**/*.min.css',							// Берем из источника минифицированные файлы стилей
		])
	.pipe(gulp.dest('public/styles'));							// Выгружаем в public/styles

	var buildFonts = gulp.src('src/fonts/**/*')					// Собираем все шрифты в папке fonts
	.pipe(gulp.dest('public/fonts'));							// Выгружаем в public/fonts

	var buildJs = gulp.src('src/js/**/*')						// Собираем js-файлы
	.pipe(gulp.dest('public/js'));								// Выгружаем в public/js

	var buildHtml = gulp.src('src/*.html')						// Собираем html-файлы
	.pipe(gulp.dest('public'));									// Выгружаем в папку public
});