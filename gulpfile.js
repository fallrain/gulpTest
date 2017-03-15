/**
 * 说明：gulp功能
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('test1', function(){
  console.log('这是一个测试任务，没有其他');
});
gulp.task('sass', function(){
  return gulp.src('app/css/**/*.+(scss|sass)')
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'));
});