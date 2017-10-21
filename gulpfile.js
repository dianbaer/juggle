var gulp = require('gulp');
var del = require('del');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var header = require('gulp-header');
var footer = require('gulp-footer');
var zip = require('gulp-zip');
var shell = require('gulp-shell');
var uitest = require('gulp-uitest');
var transformModule = require('gulp-transform-module');
var jshint = require('gulp-jshint');
var pkg = require('./package.json');

gulp.task('test', [], function () {
    return gulp
        .src('test/html/index.html')
        .pipe(uitest({
            width: 600,
            height: 480,
            hidpi: false,
            useContentSize: true,
            show: false
        }));
});
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});