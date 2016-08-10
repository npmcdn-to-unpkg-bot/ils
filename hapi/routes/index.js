"use strict"
const express = require("express")
const J = require("../../common")
const config = require("../_inc/config")
const db = require("../../_inc/db")
const searchImage = require("../../_inc/searchImage")
const uploadImage = require("../../_inc/uploadImage")
const R = require("ramda")
const env = require("dotenv-helper")
const mongoose = require("mongoose")
let router = express.Router()
function learningMemePublish(data) {
    return new Promise(resolve=>{
        uploadImage.main(data).then(uploadImageData=>{

        })
    })
}
router.get("/", (req, res) =>{res.render("index")})
router.get("/test", (req, res) =>{res.render("test")})
router.get("/tunaPlayerDemo", (req, res) =>{res.render("tunaPlayerDemo")})
router.get("/aboutOrderSentence", (req, res)=> {res.render("aboutOrderSentence")})
router.get("/about", (req, res) =>{res.render("about")})
router.get("/writeSentenceLite", (req, res) =>{res.render("writeSentenceLite")})
router.get("/learningMeme", (req, res) =>{res.render("learningMeme")})
router.get("/writeSentence", (req, res)=> {res.render("writeSentence")})
router.get("/orderSentence", (req, res) =>{res.render("orderSentence")})
router.get("/orderSentenceMobile", (req, res) =>{res.render("orderSentenceMobile")})
router.post("/read/:id", (req, res) =>{
    J.logger.debug(`read db | ip ${req.ip}`)
    mongoose.model("Main").findOne({id: req.params.id * 1}, (error, incoming)=>{
        res.send(incoming)
    })
})
router.post("/ready", (req, res) =>{
    J.logger.debug(`read ready | ip ${req.ip}`)
    mongoose.model("Main").find({$where: "this.enPart.length>1"}, (error, incoming)=>{
        res.send(R.values(incoming))
    })
})
router.post("/learningMeme", (req, res) =>{
    mongoose.model("Main").find({$where: "this.imageSrc!==undefined&&this.imageSrc!==false"}, (error, incoming)=>{
        res.send(R.values(incoming))
    })
})
router.post("/orderSentence", (req, res) =>{
    mongoose.model("Main").find({$where: "this.enPart!==undefined&&this.enPart.length>5"}, (error, incoming)=>{
        res.send(incoming)
    })
})
router.post("/counter", (req, res) =>{
    if (J.auth(req.ip)) {
        mongoose.model("Counter").find({}, (error, incoming)=>{
            res.send(`${incoming[ 0 ].counter}`)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/removeMain", (req, res) =>{
    if (J.auth(req.ip)) {
        mongoose.model("Main").remove({id: req.body.id * 1}, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/remove/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, config.models) !== -1) {
        mongoose.model(J.firstLetterCapital(req.params.model)).remove({_id: req.body._id * 1}, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/update/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, config.models) !== -1) {
        let obj = {}
        obj[ req.body.key ] = req.body.value
        mongoose.model(J.firstLetterCapital(req.params.model)).findOneAndUpdate({id: req.body.id * 1}, obj, (error, incoming)=>{
            J.lg(error, incoming)
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/updateMany/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, config.models) !== -1) {
        let obj = JSON.parse(req.body.obj)
        mongoose.model(J.firstLetterCapital(req.params.model))
        .findOneAndUpdate({id: req.body.id * 1}, obj, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/readModel/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, config.models) !== -1) {
        J.logger.debug(`model ${req.params.model} ip ${req.ip}`)
        let obj = {}
        obj[ req.body.key ] = req.body.keyValue
        mongoose.model(J.firstLetterCapital(req.params.model)).findOne(obj, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/readRandom/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, config.models) !== -1) {
        db.random(J.firstLetterCapital(req.params.model)).then(incoming=>{res.send(incoming)})
    } else {
        res.send(config.badQuery)
    }
})
router.post("/imageless", (req, res) =>{
    if (J.auth(req.ip)) {
        db.randomCondition().then(incoming=>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/searchImage", (req, res) =>{
    if (J.auth(req.ip)) {
        searchImage.main(req.body.searchImageKeyword).then(incoming =>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/searchImageFast", (req, res) =>{
    if (J.auth(req.ip)) {
        searchImage.imageFirst(req.body.searchImageKeyword).then(incoming =>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/learningMemePublish", (req, res) =>{
    if (J.auth(req.ip)) {
        learningMemePublish(req.body.data).then(data=>{
            res.send(data)
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/addMain", (req, res) =>{
    if (J.auth(req.ip)) {
        db.addMain(req.body).then(incoming=>{
            res.send(incoming)
        })
    } else {
        res.send(config.badQuery)
    }
})
module.exports = router
