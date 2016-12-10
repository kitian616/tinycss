var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');

//var htmlmin = require('gulp-htmlmin')

var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');


var paths = {
    js: 'src/js/**/*.js',
    css: 'src/css/**/*.css',
    scss: 'src/scss/**/*.scss'
};


gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
            .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(sourcemaps.init())
            .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scss', function() {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('cssmin', ['css', 'scss'], function() {
    return gulp.src(['dist/css/**/*.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('jsmin', ['js'], function() {
    return gulp.src(['dist/js/**/*.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
    return del('dist/*')
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.scss, ['scss']);
});

gulp.task('build', ['clean'], function(cb) {
    gulp.start(['js', 'css', 'scss']);
});

gulp.task('default', ['watch', 'build']);

gulp.task('release', ['clean'], function() {
    gulp.start(['jsmin', 'cssmin']);
});
