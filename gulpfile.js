const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-spawn-mocha');
const runSequence = require('run-sequence');
const cache = require('gulp-cached');
const optimizejs = require('gulp-optimize-js');
const rollup = require("rollup-stream");
const source = require("vinyl-source-stream");
const babel = require("rollup-plugin-babel");
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const scripts = {
  entry: 'src/index.js',
  src: 'src/**/*.js',
  test: 'test/**/*.js',
  dist: 'dist'
};

/**
 * Compile
 */

gulp.task('babel', () => {
  let stream = rollup({
    entry: scripts.entry,
    format: "cjs",
    plugins: [
      babel({
        presets: ["es2015-rollup"]
      })
    ]
  });

  stream.on('error', e => {
    console.error(`${e.stack}`);
    stream.emit('end');
  })
  .pipe(source('chai-geojson.js'))
  .pipe(streamify(optimizejs()))
  .pipe(gulp.dest(scripts.dist));

  return stream;
});

gulp.task('uglify', () => {
  return gulp.src(scripts.dist + '/chai-geojson.js')
    .pipe(uglify())
    .pipe(rename('chai-geojson.min.js'))
    .pipe(gulp.dest(scripts.dist));
});

/**
 * Testing
 */

gulp.task('test', () => {
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
        configFile: './.eslintrc.js',
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

addWatchTask('watch-src', scripts.src, ['eslint-src', 'compile', 'test']);
addWatchTask('watch-test', scripts.test, ['eslint-test', 'test']);

/**
 * Tasks
 */

gulp.task('compile', () => {
  runSequence('babel', 'uglify');
});

gulp.task('watch', ['watch-src', 'watch-test']);
gulp.task('default', ['watch']);
