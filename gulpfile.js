var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var jsPaths = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/what-input/what-input.js',
  'bower_components/foundation-sites/dist/foundation.js',
  'js/app.js'
];

gulp.task('bower', function() {
  return $.run('bower install').exec();
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.rename({basename: 'brand'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src(jsPaths)
    .pipe($.concat({path: 'brand.js', stat: {mode: 0666}}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['sass', 'js'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['js']);
});
