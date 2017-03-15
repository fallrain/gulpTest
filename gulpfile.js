/**
 * 说明：gulp功能
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var gulpIf = require('gulp-if');
var minCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var gulpCfgObj = {
  allSrc : 'app/**',
  sassSrc : 'app/css/**/*.+(scss|sass)',//sass文件目录
  cssDist : 'dist/css/',
  jsSrc : 'app/js/**/*.js',//js文件目录
  jsDist : 'dist/js/',//js文件目录
  htmlSrc : 'app/html/**/*.+(html|shtml)',//html文件目录
  htmlDist : 'dist/html/'
};
//转化css
gulp.task('sassTk', function(){
  return gulp.src(gulpCfgObj.sassSrc)
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
      stream : true
    }));
});

gulp.task('browserSyncTk', function(){
  browserSync({
    server : {
      baseDir : './',
      directory : true
    }
  });
});
gulp.task('watchSassTk', function(){
  //监控scss的变化，自动编译
  gulp.watch(gulpCfgObj.sassSrc, function(){
    gulp.run('bulidCss');
    browserSync.reload();
  });
});
gulp.task('watchHtmlTk', function(){
  gulp.watch(gulpCfgObj.htmlSrc, function(){
    gulp.run('bulidHtml');
    browserSync.reload();
  });
});

gulp.task('watchJsTk', function(){
  gulp.watch(gulpCfgObj.jsSrc, function(){
    gulp.run('bulidJs');
  });
});
gulp.task('cleanDist', function(){
  del('dist');
});
gulp.task('bulidHtml', function(){
  gulp.src(gulpCfgObj.htmlSrc)
    .pipe(gulp.dest(gulpCfgObj.htmlDist))
});

gulp.task('bulidJs', function(){
  gulp.src(gulpCfgObj.jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest(gulpCfgObj.jsDist))
});

gulp.task('bulidCss', function(){
  gulp.src(gulpCfgObj.sassSrc)
    .pipe(sass())
    .pipe(minCss())
    .pipe(gulp.dest(gulpCfgObj.cssDist));
});

gulp.task('bulidDist', function(){
  /*把各个文件编译压缩后输出到dist*/
  runSequence('cleanDist', ['bulidHtml', 'bulidJs', 'bulidCss']);
});
gulp.task('autoRl', function(){
  browserSync(gulpCfgObj.allSrc, function(){
    browserSync.reload({
      stream : true
    });
  })
});

gulp.task('watchTk', function(){
  /*监控任务*/
  gulp.run('watchSassTk');
  gulp.run('watchJsTk');
  gulp.run('watchHtmlTk');

});
gulp.task('debug', function(){
  gulp.run('bulidDist');
  gulp.run('watchTk');
  gulp.run('browserSyncTk');
});