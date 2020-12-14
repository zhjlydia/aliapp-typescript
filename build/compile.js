const path=require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const injectEnvs = require('gulp-inject-envs');
const src = path.join(__dirname, '../src');
const dist = path.join(__dirname, `../dist/${process.env.NODE_ENV || 'dev'}`);

const staticExtList = [`${src}/**/*.js`, `${src}/**/*.json`,`${src}/**/*.axml`, `${src}/**/*.acss`, `${src}/**/*.png`, `${src}/**/*.jpg`]

const tsProject = ts.createProject("../tsconfig.json");

gulp.task('static', () => {
    return gulp.src(staticExtList).pipe(gulp.dest(dist));
});


gulp.task('less', () => gulp.src(`${src}/**/*.less`)
  .pipe(less())
  .on('error', e => console.error(e))
  .pipe(rename({
    extname: '.acss',
  }))
  .pipe(gulp.dest(dist)));

gulp.task('ts', () => gulp.src(`${src}/**/*.ts`)
  .pipe(tsProject())
  .pipe(injectEnvs({env:process.env.NODE_ENV}))
  .pipe(babel())
  .on('error', (err) => {
    console.log(err);
  })
  .pipe(gulp.dest(dist)));


gulp.task('watch', function () {
    gulp.watch(staticExtList,gulp.parallel('static'))
    gulp.watch(`${src}/**/*.ts`, gulp.parallel('ts'));
    gulp.watch(`${src}/**/*.less`, gulp.parallel('less'));
});

gulp.task('default', gulp.parallel(['ts','less', 'static']));

gulp.task('hot', gulp.parallel(['ts','less', 'static','watch']))
