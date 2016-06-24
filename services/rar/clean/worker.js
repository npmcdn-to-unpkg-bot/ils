var forky = require("forky")
var port = process.argv[ 2 ]


forky({path: __dirname + "/inProcess.js",workers: 1})

