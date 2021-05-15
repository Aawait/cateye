 const { watch } = require('chokidar');
const gulp  = require('gulp');
 const sass = require('gulp-sass');

// gulp.task('buildSass',function(done){
//     gulp.src('./sass/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./css/'))
//     done();
// })

// 创建一个编译sass的任务
function buildSass(){
    gulp.src('./sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css/'))
}
 
// 调用这个任务
module.exports.setSass = function(done){
    buildSass();
    done();
}

// 监听这个任务
// gulp.task('watch',function(){
//     gulp.watch('./sass/*.scss',gulp.series('setSass'));
// })
function watchSass(){
    gulp.watch('./sass/*.scss',gulp.series('setSass'));
}

module.exports.watch = function(done){
    watchSass();
    done();
}