import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import gulpSassGlob from 'gulp-sass-glob';
import autoPrefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

const bs = browserSync.create();

const sassIncludePaths = [
  process.cwd() + '/node_modules'
];

export function bootstrap () {
  return gulp.src('scss/bootstrap.scss')
    .pipe(gulpSassGlob())
    .pipe(gulpSass(sass)({
      outputStyle: 'compressed',
      includePaths: sassIncludePaths
    }))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('assets/css'));
}

export function styles () {
  return gulp.src('scss/main.scss')
    .pipe(gulpSassGlob())
    .pipe(gulpSass(sass)({
      outputStyle: 'expanded',
      includePaths: sassIncludePaths
    }))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('assets/css'));
}

export function serve () {
  bs.init({
    open: false,
    watch: true,
    notify: true,
    server: true,
    // tunnel: 'apex',
    host: '192.168.8.111'
  });

  gulp.watch('scss/**/*.scss', gulp.parallel(bootstrap, styles));
}

export default gulp.series(gulp.parallel(bootstrap, styles), serve)
