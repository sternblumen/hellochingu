var gulp = require('gulp');
var gutil= require('gulp-util')
var minifycss = require('gulp-minify-css');
var autoprefixer= require('gulp-autoprefixer');
var notify= require('gulp-notify');
var sass= require('gulp-ruby-sass');
var livereload= require('gulp-livereload');

var sassDir= 'stylesheets/scss'
var targetCSSDir='stylesheets/css'

gulp.task('css',function() {
	return gulp.src(sassDir + '/*.scss')
	.pipe(sass({ style: 'compact'}).on('error',gutil.log))
	.pipe(autoprefixer('last 15 version'))
	.pipe(gulp.dest(targetCSSDir))
	.pipe(livereload())
	.pipe(notify({title:'Proyecto', message:'scss compiled and min'}));
});

gulp.task('watch',function () {
	gulp.watch(sassDir + '/*.scss', ['css']);
});

gulp.task('default',['css','watch']);

