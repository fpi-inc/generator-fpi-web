/**
 * gulp
 * @author: pingping_feng@fpi-inc.com
 */
var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var server = require('gulp-server-livereload');
var os = require('os');

function getIpv4(){
  var ipv4, en6;
  en6 = os.networkInterfaces().en6;
  en6.forEach(function(item){
    if(item.family === 'IPv4'){
      ipv4 = item.address;
    }
  });
  return ipv4;
}

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
      host: getIpv4(),
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