// Plugins.
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');

/**
 * Setting up browsersync.
 * Proxy is the name of the vagrent.
 * Host is the the ip defined in "vagrantfile"
 */

var browserSync = require('browser-sync').create();
browserSync.init({
  proxy: "drupal8.vm",
  host: "drupal8.vm"
});


// We only want to process our own non-processed JavaScript files.
var jsPath = ['./scripts/*.js', '!./js/*.min.*'];
var sassPath = './scss/**/*.scss';
var phpPath = './**/*.php'; //could also be twig files
var buildDir = './js';

/**
 * Run Javascript through JSHint.
 */

gulp.task('jshint', function() {
  return gulp.src(jsPath)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


/**
 * Run Javascript through JSHint.
 */

gulp.task('uglify', function() {
  gulp.src(jsPath)
    .pipe(uglify())
    .pipe(rename({
      suffix: '-min'
    }))
    .pipe(gulp.dest('./scripts/min'))
});


/**
 * Process SCSS using libsass
 */
gulp.task('sass', function () {
  gulp.src(sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({
      // outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

/**
 * Watch files for changes and run tasks.
 */

gulp.task('watch', function() {
  gulp.watch(jsPath, ['jshint', 'uglify']);
  gulp.watch(sassPath, ['sass']);
  gulp.watch(phpPath).on('change', browserSync.reload);
  gulp.watch(jsPath).on('change',browserSync.reload);
});


/**
 * Watch javascript files for changes.
 */

gulp.task('js-watch', function() {
  gulp.watch(jsPath, ['jshint']);
});

/**
 * Build single app.js file.
 */
gulp.task('buildJs', function () {
  gulp.src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('/maps'))
    .pipe(rename({extname: ".min.js"}))
    .pipe(gulp.dest(buildDir))
});

/**
 * Build single app.js file.
 */
gulp.task('assetsJs', function () {
  gulp.src(jsAssets)
    .pipe(concat('assets.js'))
    .pipe(rename({extname: ".min.js"}))
    .pipe(gulp.dest(buildDir))
});


/**
 * Use compass
 */
gulp.task('compass', function() {
  gulp.src(sassPath)
    .pipe(compass({
      css: 'css',
      sass: 'scss',
      image: 'img'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('html/css'));
});


// Tasks to compile sass and watch js file.
gulp.task('default', ['sass', 'watch', 'uglify']);
gulp.task('build', ['buildJs', 'sass', 'uglify']);