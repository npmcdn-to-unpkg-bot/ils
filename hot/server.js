"use strict"
var webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server")
var config = require("./webpack.config")
let portIs = 8082
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(portIs, "localhost", function (err, result) {
    if (err) {
        return console.log(err)
    }
    console.log(`Listening at http://0.0.0.0:${portIs}/`)
})
