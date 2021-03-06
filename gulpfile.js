var gulp = require('gulp'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    del = require('del'),
    runSequence = require('run-sequence');

gulp.task('svg-min', function() {
  return gulp.src('input/*.svg')
    .pipe(svgmin({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(gulp.dest('output'));

});

gulp.task('svg-store', function() {
  return gulp.src('output/*.svg')
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore({
        js2svg: {
            pretty: true
        }
    }))
    .pipe(gulp.dest('output'));

});

gulp.task('watch', function () {
  gulp.watch('input/*.svg', ['default']);
});

gulp.task('clean', function (cb) {
  return del([
    'output/*.svg'
  ], cb);
});

gulp.task('default', function (cb){
  runSequence('clean', 'svg-min', 'svg-store', 'watch', cb);
});
