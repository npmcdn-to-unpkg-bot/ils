var gulp = require('gulp')
var Promise = require('bluebird')
var exec = require('child_process').exec
var proc
var procKill

gulp.task('kill', function (done) {
    function promised() {
        return new Promise(function (resolve, reject) {
            procKill = exec('taskkill /PID ' + proc.pid + ' /T /F')
            procKill.stdout.on('end', function () {
                console.log('end killing')
                resolve()
            })
        })
    }

    promised().then(function () {
        console.log('resolved')
        done()
    })

});

gulp.task('default', function () {
    proc = exec('electron starter.js');
    proc.stdout.on('data', function (chunk) {
        console.log(chunk)
    });
    proc.stdout.on('end', function () {
        console.log('default end')
    });
    gulp.watch(['./main.js', "./index.html", "bundles.js"], ['kill', 'restart'])
    gulp.watch(['./beforeBundle/react.jsx'], ['browserifyReactTask'])
});

gulp.task('restart', function () {
    console.log('new process will start')
    proc = exec('electron starter.js')
	proc.stdout.on('data', function (chunk) {
		console.log(chunk)
	})
});

gulp.task('browserify', function () {
    return gulp.watch(['./beforeBundle/*.js'], ['browserifyTask']);
})

gulp.task('browserifyReact', function () {
	return gulp.watch(['./beforeBundle/react.jsx'], ['browserifyReactTask']);
});

gulp.task('browserifyReactTask', function (done) {
	console.log('browserifyReactTask')
	exec('browserify react.jsx -o ../react.js -t [ babelify --presets [ es2015 react ] ]', {'cwd': './beforeBundle'}, function (error, stdout, stderr) {
		done()
	});
})

gulp.task('browserifyTask', function (done) {
    console.log('browserify')
    exec('browserify bundle.js -o ../bundle.js', {'cwd': './beforeBundle'}, function (error, stdout, stderr) {
        done()
    });
})