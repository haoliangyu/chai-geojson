const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-spawn-mocha');
const runSequence = require('run-sequence');
const cache = require('gulp-cached');

const scripts = {
  src: 'src/**/*.js',
  test: 'test/**/*.js',
  dist: 'dist'
};

/**
 * Testing
 */

gulp.task('test', function() {
  return gulp.src(scripts.test)
    .pipe(mocha({
      istanbul: { report: 'none' }
    }));
});

/**
 * Linting
 */

function addLinterTask(name, path) {
  gulp.task(name, function () {
    return gulp.src(path)
      .pipe(cache('eslint', { optimizeMemory: true }))
      .pipe(eslint({
        configFile: '.eslintrc.js',
        quiet: true
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
}

addLinterTask('eslint-src', scripts.src);
addLinterTask('eslint-test', scripts.test);

/**
 * Watch
 */

function addWatchTask(name, path, tasks) {
  gulp.task(name, function() {
    gulp.watch(path, function() {
      runSequence.call(this, tasks);
    });
  });
}

addWatchTask('watch-src', scripts.src, ['eslint-src', 'test']);
addWatchTask('watch-test', scripts.test, ['eslint-test', 'test']);

/**
 * Tasks
 */

gulp.task('watch', ['watch-src', 'watch-test']);
gulp.task('default', ['watch']);
