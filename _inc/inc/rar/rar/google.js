var imported = require('./../../streams/protractor.js')
var R = require('ramda')

function get(word, callback) {
    imported.willScrape('protractor ./test/protractor.phantom.js --' + word, function (dataReady) {
        var data = JSON.parse(dataReady)
        var dataArray = []
        var onlyTemp = []
        var willSend = []
        for (var key in data) {
            if (key.indexOf('s') > -1) {
                onlyTemp.push(data[key])
            }else{
                dataArray.push(data[key])
            }
        }
        var ss = R.take(onlyTemp.length, dataArray);
        var ss1 = R.takeLast(dataArray.length - onlyTemp.length, dataArray);
        ss.map(function (value, key) {
            willSend.push(data['s' + key] + ' ' + value)
        })

        var final = R.flatten(R.append(ss1, willSend));
        callback(final);
    })
}
module.exports.get = get