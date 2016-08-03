"use strict"
const express = require("express")
const router = express.Router()
const R = require("ramda")
const env = require("dotenv-helper")
const mongoose = require("mongoose")
const J = require("../../common.js")
const proudDb = require("../_inc/proud-db")
const uploadImage = require("../_inc/uploadImage")
const searchImage = require("../_inc/searchImage")
const dataFile = require("../../hapi/public/data.json")
const db = require("../../hapi/public/_db.json")
//Draft.create({dePart: "dsfds", enPart: "sefafdsfs"}, function(error, incoming) {
//router.get("/testFirst", (req, res) =>{
//let TranslateDraft = mongoose.model("TranslateDraft")
//TranslateDraft.find({$where :"this.word===\"auswahl\""}, (error, incoming)=>{
//J.lg(error)
//res.send(incoming)
//})
//})

router.post("/remove/:model", (req, res) =>{
    if (req.body.password === env.getEnv("mainPassword")) {
        mongoose.model(J.firstLetterCapital(req.params.model)).remove({id: req.body.id * 1}, (error, incoming)=>{
            res.send(incoming)
        })
    } else {res.send("Unauthorized Access!")}
})
router.post("/update/:model", (req, res) =>{
    if (req.body.password === env.getEnv("mainPassword")) {
        let obj = {}
        obj[ req.body.key ] = req.body.value
        mongoose.model(J.firstLetterCapital(req.params.model)).findOneAndUpdate({id: req.body.id * 1}, obj, (error, incoming)=>{
            J.lg(error, incoming)
            res.send(incoming)
        })
    } else {res.send("Unauthorized Access!")}
})
router.get("/populate", (req, res) =>{
    let dataFileArr = R.compose(R.map(val=>{
        return R.merge(val, {word: val.deEn.dePart})
    }), R.values)(dataFile)
    let TranslateDraft = mongoose.model("TranslateDraft")
    TranslateDraft.insertMany(dataFileArr, (error, incoming)=>{
        J.lg(error)
    })
    res.send("done")
})
router.get("/populateMain", (req, res) =>{
    mongoose.model("Counter").create({counter: 3591}, function(error, incoming) {})
    let dbArr = R.compose(R.map(val=>{
        if (val.category === "derProcess") {
            return R.merge(val, {category: "plain"})
        } else {
            return val
        }
    }), R.values)(db.data)
    mongoose.model("Main").insertMany(dbArr, (error, incoming)=>{
        J.lg(error)
    })
    res.send("done")
})

module.exports = router
