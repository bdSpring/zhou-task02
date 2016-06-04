var gulp = require('gulp');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');


// 静态服务器
gulp.task('browser-sync', function() {
  browserSync.init({
    files: "demo/**",
    server: {
      baseDir: "./demo/"
    }
  });
});

// js代码检查任务
gulp.task('jshint', function() {
  gulp.src('demo/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// 事件监听
gulp.task('watch', function() {
  gulp.watch('demo/*.js', ['jshint']);

});

gulp.task('default', ['browser-sync','watch']);