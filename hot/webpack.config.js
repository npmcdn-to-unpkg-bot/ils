var path = require("path")
var webpack = require("webpack")

module.exports = {
    devtool: "eval",
    resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
    },
    entry: [
        "webpack-dev-server/client?http://0.0.0.0:8082",
        "webpack/hot/only-dev-server",
        "./src/index"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ["react-hot", "babel"],
            include: path.join(__dirname, "src")
        }]
    }
}
