const fs = require('fs');
const path = require('path');
const { src, dest, series, parallel, task, pipe } = require('gulp');
const ts = require("gulp-typescript");
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
const cssMin = require('gulp-css');
const { spawn, exec } = require('child_process');


const outDir = path.resolve(__dirname, 'lib');

task('clean', () => {
    return src(outDir, {
        read: false,
        allowEmpty: true,
    }).pipe(clean());
})

task('transpile', () => {
    const tsProject = ts.createProject("tsconfig.json");
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(dest(outDir))
})

task('uglify', () => {
    return pipeline(
        src(path.resolve(outDir, '**/*.js')),
        uglify(),
        dest(outDir)
  );
});

task('css', function(){
    return src('src/**/*.css')
      .pipe(cssMin())
      .pipe(dest(outDir));
  });

// task('emitTS', (cb) => {
//     return pipeline(
//         exec("npm run build"),
//     );
// })

task('copy', () => {
    return src([
        'package.json',
        'README.md',
        'LICENSE',
    ]).pipe(dest(outDir));
})

task('default', series('clean', 'transpile', 'uglify', 'css', 'copy'));