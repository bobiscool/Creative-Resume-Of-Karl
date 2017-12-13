var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
gulp.task("pre",function(){
   return gulp.src(
       [
           "js/jquery-1.9.1.min.js",
           "js/jquery-ui.min.js",
           "js/detectBrower.js",
           "js/preload.js",
      ]
   ).pipe(concat('ps.js'))
   .pipe(uglify()).pipe(gulp.dest("build/"))
});


gulp.task("as",function(){
    return gulp.src(
        [
            "js/main.js",
            "js/vidbg.js",
       ]
    ).pipe(concat('as.js'))
    .pipe(uglify()).pipe(gulp.dest("build/"))
 });
 

 gulp.task("default",function(){
     gulp.start("pre","as");
 })