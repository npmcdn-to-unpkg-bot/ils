"use strict"
var mongoose = require("mongoose")

var initConnection = (connectionString)=>{
    mongoose.connect(connectionString)
    let db = mongoose.connection
    db.on("error", function(err) {
        console.error("mongo connection error: ", err)
    })
    db.once("open", function() {
        console.info("mongo connection open")
    })
}

let initSchemas = ()=>{
    const Schema = mongoose.Schema

    let translateDraftSchema = new Schema({
        word: {type: String, required: true},
        deEn: {dePart: String, enPart: String},
        synonym: [{dePart: String, enPart: String}],
        synonymTranslated: [{dePart: String, enPart: String}],
        phrase: [{dePart: String, enPart: String}],
        phraseTranslated: [{dePart: String, enPart: String}]
    })
    translateDraftSchema.post("init", function(doc) {
        console.log(`${doc._id} has been initialized from the db`)
    })
    translateDraftSchema.post("save", function(doc) {
        console.log(`${doc._id} has been saved`)
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
    let counterSchema = new Schema({
        counter: {type: Number, required: true}
    })
    var userSchema = new Schema({
        email: String,
        password: String,
        salt: String,
        created: {type: Date, default: Date.now()},
        blocked: {type: Boolean, default: false},
        emailVerified: {type: Boolean, default: false},
        role: {type: String, default: "user"},
        shops: [{
            name: String,
            id: {type: Schema.Types.ObjectId, ref: "Shop"}
        }],
        brands: [{
            name: String,
            id: {type: Schema.Types.ObjectId, ref: "Brand"}
        }],
        apiKey: String,
        termsAccepted: Boolean,
        profile: {}
    }, {minimize: false})

    var brandSchema = new Schema({
        name: String,
        description: String,
        gln: String,
        owner: {type: Schema.Types.ObjectId, ref: "User"},
        logo: {type: Schema.Types.ObjectId, ref: "Image"},
        contact: {
            name: String,
            email: String,
            phone: String,
            website: String
        },
        images: [{type: Schema.Types.ObjectId, ref: "PromoImage"}],
        created: {type: Date, default: Date.now()}
    })
    brandSchema.virtual("logoUrl").get(function() {
        return "http:/images/" + this.logo
    })
    brandSchema.set("toJSON", {getters: true, virtuals: true})

    mongoose.model("TranslateDraft", translateDraftSchema)
    mongoose.model("Main", mainSchema)
    mongoose.model("Counter", counterSchema)
}

let init = (connectionString)=>{
    initConnection(connectionString)
    initSchemas()
}

module.exports.init = init
