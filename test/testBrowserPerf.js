var browserPerf = require('browser-perf');
browserPerf('http://ilearnsmarter.com/writeSentenceLite', function(err, res) {
    // res - array of objects. Metrics for this URL
    if (err) {
        console.log('ERROR: ' + err);
    } else {
        console.log(res);
    }
}, {
    selenium: 'http://localhost:4444/wd/hub',
    browsers: ['chrome']
})
