"use strict"
const express = require("express")
const J = require("../../common")
const config = require("../_inc/config")
const db = require("../_inc/db")
const R = require("ramda")
const env = require("dotenv-helper")
const mongoose = require("mongoose")
let router = express.Router()
router.get("/", (req, res) =>{res.render("index")})
router.get("/aboutOrderSentence", (req, res)=> {res.render("aboutOrderSentence")})
router.get("/about", (req, res) =>{res.render("about")})
router.get("/writeSentenceLite", (req, res) =>{res.render("writeSentenceLite")})
router.get("/learningMeme", (req, res) =>{res.render("learningMeme")})
router.get("/writeSentence", (req, res)=> {res.render("writeSentence")})
router.get("/orderSentence", (req, res) =>{res.render("orderSentence")})
router.get("/orderSentenceMobile", (req, res) =>{res.render("orderSentenceMobile")})
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
    mongoose.model("Counter").find({}, (error, incoming)=>{
        res.send(`${incoming[ 0 ].counter}`)
    })
})
router.post("/removeMain", (req, res) =>{
    if (req.body.password === env.getEnv("mainPassword")) {
        mongoose.model("Main").remove({id: req.body.id * 1}, (error, incoming)=>{
            res.send(incoming)
        })
    } else {res.send("Unauthorized Access!")}
})
router.post("/remove/:model", (req, res) =>{
    if (req.body.password === env.getEnv("mainPassword")) {
        mongoose.model(J.firstLetterCapital(req.params.model)).remove({_id: req.body._id * 1}, (error, incoming)=>{
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
router.post("/updateMany/:model", (req, res) =>{
    if (req.body.password === env.getEnv("mainPassword")) {
        let obj = JSON.parse(req.body.obj)
        mongoose.model(J.firstLetterCapital(req.params.model)).findOneAndUpdate({id: req.body.id * 1}, obj, (error, incoming)=>{
            res.send(incoming)
        })
    } else {res.send("Unauthorized Access!")}
})
router.post("/read/:id", (req, res) =>{
    J.logger.debug(`read db | ip ${req.ip}`)
    mongoose.model("Main").findOne({id: req.params.id * 1}, (error, incoming)=>{
        res.send(incoming)
    })
})
router.post("/readModel/:model", (req, res) =>{
    if (req.body.password === env.getEnv("mainPassword")) {
        J.logger.debug(`model ${req.params.model} ip ${req.ip}`)
        let obj = {}
        obj[ req.body.key ] = req.body.keyValue
        mongoose.model(J.firstLetterCapital(req.params.model)).findOne(obj, (error, incoming)=>{
            res.send(incoming)
        })
    } else {res.send("Unauthorized Access!")}
})
router.post("/readRandomm/:model", (req, res) =>{
    if (R.indexOf(req.params.model), config.models) {
        mongoose.model(J.firstLetterCapital(req.params.model)).count().exec((err, count) =>{
            let random = Math.floor(Math.random() * count)
            mongoose.model(J.firstLetterCapital(req.params.model)).findOne().skip(random).exec((err, result)=>{
                res.send(result)
            })
        })
    } else {
        res.send(config.badQuery)
    }
})
router.post("/readRandom/:model", (req, res) =>{
    if (R.indexOf(req.params.model, config.models)) {
        db.random(J.firstLetterCapital(req.params.model)).then(incoming=>{res.send(incoming)})
    } else {
        res.send(config.badQuery)
    }
})
router.post("/test", (req, res) =>{
    db.addMain({dePart:"nicht"}).then(incoming=>{
        J.log(incoming, "122")
    })
    res.send("incoming")
})
module.exports = router
