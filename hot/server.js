"use strict"
var webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server")
var config = require("./webpack.config")
let portIs = 3002
new WebpackDevServer(webpack(config) ,{
    publicPath: config.output.publicPath ,
    hot: true ,
    historyApiFallback: true
}).listen(portIs ,"localhost" ,function (err ,result) {
    if(err) {
      return console.log(err)
  }
    console.log(`Listening at http://localhost:${portIs}/`)
})
