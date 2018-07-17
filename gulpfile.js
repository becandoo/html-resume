const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const gulpCopy = require('gulp-copy');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');

const PATHS = {
    nodePath: 'node_modules',
    normalizePath: 'node_modules/normalize.css',
    fontAwesomePath: 'node_modules/@fortawesome/fontawesome-free',
    dist: 'dep'
}

gulp.task('clean', function(){
    return gulp.src('dep')
    .pipe(clean())
})

gulp.task('copy', ['clean'], function () {
    gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('dep/normalize.css'))
    gulp.src('node_modules/@fortawesome/fontawesome-free/**/*')
        .pipe(gulp.dest('dep/Font-Awesome'))
});

// Compile Sass & Inject Into Browser
gulp.task('sass', ['copy'], function() {
    return gulp.src(['*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
})

gulp.task('serve', function(){
    browserSync.init({
        server: ''
    })
    gulp.watch(['*.scss'], ['sass']);
    gulp.watch(['*.html']).on('change', browserSync.reload);
})

gulp.task('default', ['sass', 'serve']);