'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import gulpWwebpack from 'webpack-stream';
import webpack from 'webpack';
import {modules as webpackModulesConfig} from './webpack.config.js';
import named from 'vinyl-named';
import path from 'path';

const $ = gulpLoadPlugins();
const DIST = {
  scripts: '.public/scripts',
  styles: '.public/styles',
  images: '.public/images',
  fonts: '.public/fonts'
};
const SRC = {
  lib: 'lib/**/*.js',
  app: 'app/**/*.js',
  testUnit: 'test/unit/**/*.test.js',
  mainModules: 'app/modules/**/main.js',
  modules: 'app/modules/**/*.js',
  mainStyles: 'app/modules/**/main.scss',
  styles: 'app/modules/**/*.scss',
  images: 'app/modules/images/**/*',
  fonts: 'app/modules/fonts/**/*'
};
const AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'last 2 Firefox versions',
  'last 2 Chrome versions',
  'last 5 Safari versions',
  'last 5 Opera versions',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Clean output directory
gulp.task('clean', () => del(['.public/*'], {dot: true}));

gulp.task('lint', () => {
  return gulp.src([SRC.lib, SRC.app])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.notify({onLast: true, message: 'Lint completed'}));
});

gulp.task('fonts', () => {
  return gulp.src([SRC.fonts])
    .pipe(gulp.dest(DIST.fonts))
    .pipe($.size({title: 'fonts'}));
});

gulp.task('images', () => {
  return gulp.src([SRC.images])
    .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true
      })))
    .pipe(gulp.dest(DIST.images))
    .pipe($.size({title: 'images'}))
    .pipe($.notify({onLast: true, message: 'Images completed'}));
});

gulp.task('styles', () => {
  return gulp.src(SRC.mainStyles)
    // .pipe($.changed(DIST.styles, {extension: '.css'}))
    .pipe($.sourcemaps.init())
    .pipe($.sass({precision: 10}).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(DIST.styles))
    .pipe($.size({title: 'styles', showFiles: true}))
    .pipe($.notify({onLast: true, message: 'Styles completed'}));
});

gulp.task('modules', () => {
  let namedModule = file => {
    let [, dirname] = path.dirname(file.path).match(/modules\/(.*)/);
    let basename = path.basename(file.path, path.extname(file.path));
    return `${dirname}/${basename}`;
  };
  return gulp.src(SRC.mainModules)
    .pipe(named(namedModule))
    .pipe(gulpWwebpack(webpackModulesConfig, webpack))
    .pipe(gulp.dest(DIST.scripts))
    .pipe($.size({title: 'modules', showFiles: true}))
    .pipe($.notify({onLast: true, message: 'Modules completed'}));
});

gulp.task('test', () => {
  return gulp.src([SRC.testUnit], {read: false})
    .pipe($.mocha({
      timeout: 2000,
      reporter: 'dot',
      bail: true,
      globals: ['*']
    }))
    .pipe($.notify({onLast: true, message: 'Test completed'}));
});

gulp.task('watch', () => {
  // Watch files for changes & reload
  gulp.watch([SRC.styles], ['styles']);
  gulp.watch([SRC.modules], ['modules']);
  gulp.watch([SRC.fonts], ['fonts']);
  gulp.watch([SRC.images], ['images']);
});

gulp.task('server', function () {
  $.nodemon({
    script: 'app.js',
    ext: 'js json hbs',
    ignore: ['test/*', '.public/*', 'node_modules/*', 'app/modules/*']
  });
});

gulp.task('default', cb => {
  runSequence(
    'clean',
    'styles',
    ['modules', 'images', 'fonts'],
    'server',
    'watch',
    'lint',
    'test',
    cb
  );
});
