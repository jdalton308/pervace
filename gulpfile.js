
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var server = require('gulp-server-livereload');

var styleFiles = [
        './src/less/main.less'
    ];
var jsFiles = [
		'node_modules/jquery/dist/jquery.js',
		'./src/js/**/*.js'
	];
var htmlFiles = [
		'./*.html'
	];


gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./build/'))
});

gulp.task('styles', function() {
    gulp.src(styleFiles)
        .pipe(concat('app.css'))
        .pipe(less())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', function(){
	gulp.src(jsFiles)
		.pipe(concat('app.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./build/js/'))
		.on('error', gutil.log);
});

gulp.task('watch', function(){
    gulp.watch(['./src/less/**/*.less'], ['styles']);
    gulp.watch(['./src/js/**/*.js'], ['scripts']);
});

gulp.task('server', function(){
	gulp.src('build/')
		.pipe(server({
			livereload: true
		}));
});

gulp.task('build', ['html', 'styles', 'scripts'])

gulp.task('default', ['build', 'server', 'watch']);