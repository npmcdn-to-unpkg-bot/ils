"use strict"
let mongoose = require("mongoose")
let initConnection = (connectionString)=>{
    mongoose.Promise = global.Promise
    mongoose.connect(connectionString)
    let db = mongoose.connection
    db.on("error", (err)=>{
        console.error("mongo connection error: ", err)
    })
    db.once("open", ()=>{
        console.info("Mongoose Connection Established")
    })
}
let initTestConnection = (connectionString)=>{
    return new Promise(resolve=>{
        mongoose.Promise = global.Promise
        mongoose.connect(connectionString)
        let db = mongoose.connection
        db.on("error", (err)=>{
            console.error("mongo connection error: ", err)
            resolve(null)
        })
        db.once("open", ()=>{
            console.info("Mongoose Connection Established")
            resolve(true)
        })
    })
}
let initSchemas = ()=>{
    let Schema = mongoose.Schema
    let translateDraftSchema = new Schema({
        word: {type: String, required: true},
        deEn: {dePart: String, enPart: String},
        synonym: [{dePart: String, enPart: String}],
        synonymTranslated: [{dePart: String, enPart: String}],
        phrase: [{dePart: String, enPart: String}],
        phraseTranslated: [{dePart: String, enPart: String}]
    })
    let mainSchema = new Schema({
        id: {type: Number, required: true},
        dePart: {type: String, required: false},
        enPart: {type: String, required: false},
        deWord: {type: String, required: false},
        enWord: {type: String, required: false},
        category: {type: String, enum: ["quotes", "jokes", "draft", "preDraft", "plain"], required: false},
        childSafetyFlag: {type: Boolean, required: false},
        imageSrc: {type: Schema.Types.Mixed, required: false}
    })
    let counterSchema = new Schema({counter: Number})

    mongoose.model("TranslateDraft", translateDraftSchema)
    mongoose.model("Main", mainSchema)
    mongoose.model("Counter", counterSchema)
}

let init = (connectionString)=>{
    initConnection(connectionString)
    initSchemas()
}
let initTest = (connectionString)=>{
    return new Promise(resolve=>{
        initTestConnection(connectionString).then(data=>{
            initSchemas()
            resolve(data)
        })
    })
}

module.exports.init = init
module.exports.initTest = initTest
module.exports.initSchemas = initSchemas
