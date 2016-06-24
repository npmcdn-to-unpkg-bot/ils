var mongoose = require("mongoose")

var initConnection = function (connectionString) {
    mongoose.connect(connectionString)
    var db = mongoose.connection
    db.on("error",function (err) {
        console.log("mongo connection error: ",err)
    })
    db.once("open",function () {
        console.log("mongo connection open")
    })
}

var initSchemas = function () {

    var Schema = mongoose.Schema
    var Security = new Schema({
        token: String
    },{minimize: false})

    var Article = new Schema({
        title: String,
        content: String
    },{minimize: false})

    mongoose.model("Security",Security)
    mongoose.model("Article",Article)

}

var init = function (connectionString) {
    initConnection(connectionString)
    initSchemas()
}

exports.init = init
