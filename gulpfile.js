const {
  src,
  dest,
  series,
  watch,
} = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// const isDev = process.env.JEKYLL_ENV === 'development';


const buildDev = () => {
  return src('./_js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
      minified: false,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./assets/js'));
};

exports.buildDev = buildDev;
exports.watch = () => {
  buildDev();
  return watch(['./_js/**/*.js'], series(buildDev));
};

const build = () => {
  return src('./_js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
      minified: true,
    }))
    .pipe(uglify())
    .pipe(dest('./assets/js'));
};

exports.build = build;
exports.default = build;
