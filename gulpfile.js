"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync").create();
var webp = require("gulp-webp");
var run = require("run-sequence");
var svgstore = require("gulp-svgstore");
var del = require("del");
var gulpBemCss = require("gulp-bem-css");

gulp.task('BEM', () => {
return gulp.src('source/*.html')
.pipe(gulpBemCss({
folder: 'source/less/blocks', // Path for creating directories and stylesheet files.
extension: 'less', // Extension of stylesheet files
elementSeparator: '__', // Element separator in class names
modifierSeparator: '--' // Modifier separator in class names
}))
});

gulp.task("style", function() {
gulp.src("source/less/style.less")
.pipe(plumber())
.pipe(less())
.pipe(postcss([
autoprefixer()
]))
.pipe(gulp.dest("source/css"))
.pipe(minify())
.pipe(rename("style.css"))
.pipe(gulp.dest("source/css"))
.pipe(server.stream());
});

gulp.task("compress", function () {
return gulp.src("source/js/*.js")
.pipe(uglify())
.pipe(gulp.dest("build/js"));
});

gulp.task("html", function () {
return gulp.src("source/*.html")
.pipe(htmlmin({collapseWhitespace: true}))
.pipe(gulp.dest("build"));
});

gulp.task("serve", ["style"], function() {
server.init({
server: "source/",
notify: false,
open: true,
cors: true,
ui: false
});

gulp.watch("source/less/**/*.less", ["style"]);
gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("clean", function () {
return del("build");
});

gulp.task("copy", function () {
return gulp.src([
"source/fonts/**/*.{woff,woff2}",
"source/img/**",
"source/js/**",
"source/*.html"
], {
base: "source"
})
.pipe(gulp.dest("build"));
});

gulp.task("images", function() {
return gulp.src("source/img/**/*.{png,jpg,svg}")
.pipe(imagemin([
imagemin.optipng({optimizationlevel: 3}),
imagemin.jpegtran({progressive: true}),
imagemin.svgo()
]))
.pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
return gulp.src("source/img/**/*.{png,jpg}")
.pipe(webp({quality: 90}))
.pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
return gulp.src("source/img/icon-*.svg")
.pipe(svgstore({
inlineSvg: true
}))
.pipe(rename("sprite.svg"))
.pipe(gulp.dest("build/img"));
});

gulp.task("build", function (done) {
run(
"clean",
"copy",
"style",
"sprite",
"compress",
"webp",
done
);
});
