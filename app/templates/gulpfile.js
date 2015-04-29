/**
 * gulp
 * @author: pingping_feng@fpi-inc.com
 */
var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var server = require('gulp-server-livereload');

var paths = {
	less: ['./less/**/*.less']
};

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function() {
	gulp.watch(paths.less, ['less']);
});

gulp.task('webserver', function() {
  gulp.src(__dirname)
    .pipe(server({
      port: 8888,
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('default', ['less', 'watch', 'webserver'], function(event) {
	console.log(event);
	console.log('Less Files was running tasks...');
});