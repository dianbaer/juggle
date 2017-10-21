var gulp = require('gulp');
var uitest = require('gulp-uitest');
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