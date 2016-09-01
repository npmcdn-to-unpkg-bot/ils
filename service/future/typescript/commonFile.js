"use strict"
var fs_extra_1 = require("fs-extra")
var J = require("justdo")
function saveLog(data) {
    var logFile = __dirname + "/zLog.txt"
    return new Promise(function (resolve) {
        fs_extra_1[ "default" ].readFile(logFile, "utf8", function (err, prevData) {
            fs_extra_1[ "default" ].outputFile(logFile, data + "\n" + prevData, function () {
                resolve(true)
            })
        })
    })
}
saveLog("more").then(function (data) {
    J.log(data)
})
//# sourceMappingURL=commonFile.js.map