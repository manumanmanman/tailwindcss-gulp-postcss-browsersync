'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const postcssImport = require('postcss-import');
const nesting =  require("tailwindcss/nesting");
const tailwind = require('tailwindcss');
const cssnano = require('gulp-cssnano');

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

function processcss() {
  return gulp.src('./src/css/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport,
      nesting,
      tailwind]))
    .pipe(autoprefixer())
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream())
}


function minify() {
  return gulp.src('./src/css/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      postcssImport,
      nesting,
      tailwind]))
    .pipe(autoprefixer())
    .pipe(cssnano())
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream())
}

function serve() {
  browserSync.init({

    // DYNAMIC if you use a php based site like wordpress
   // proxy: "https://mywordpresssite.local/" 

   //STATIC
   server: {
    baseDir: "./"
  }

  });

  gulp.watch(['**/*.html', 'src/css/style.css'], { ignoreInitial: false }, gulp.series(processcss));
  

  gulp.watch('**/*.{html,js,php,css}').on('change', reload);
}

exports.default = defaultTask;
exports.dev = serve;
exports.css = processcss;
exports.minify = minify;