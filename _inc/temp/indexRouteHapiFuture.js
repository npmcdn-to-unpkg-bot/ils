"use strict"
const express = require("express")
const fs = require("fs-extra")
const J = require("../../common")
const config = require("../_inc/config")
const dailyTask = require("../_inc/dailyTask")
const R = require("ramda")
const env = require("dotenv-helper")
const mongoose = require("mongoose")
const passport = require("passport")
const Strategy = require("passport-twitter").Strategy
let router = express.Router()
passport.use(new Strategy({
    consumerKey: env.getEnv("twitterKey"),
    consumerSecret: env.getEnv("twitterSecret"),
    callbackURL: "http://127.0.0.1:3000/login/twitter/return"
}, (token, tokenSecret, profile, cb) =>{return cb(null, profile)}))
passport.serializeUser((user, cb)=>{cb(null, user)})
passport.deserializeUser((obj, cb)=>{cb(null, obj)})
let oneLevelUp = R.compose(R.join("/"), R.init, R.split("/"))
let titleFn = R.compose(R.trim, R.last, R.split("-"), R.head, R.match(/\/\/(\s)?title.{1,70}/gm))
//let categoryFn = R.compose(R.trim,R.last,R.split("-"),R.head,R.match(/\/\/(\s)?category.{1,70}/gm))
let cleanFn = R.compose(R.replace(/\/(.|\n)+(?=#)/gm, ""))
function setCookie(key, value, res) {
    res.append("Set-Cookie", `${key}=${value}`)
}
router.get("/", (req, res) =>{res.render("index")})
router.get("/login", (req, res)=>{res.render("login")})
router.get("/login/twitter", passport.authenticate("twitter"))
router.get("/login/twitter/return", passport.authenticate("twitter", { failureRedirect: "/login" }), (req, res)=>{
    J.box(R.type(req.user))
    //res.redirect("/settings")
    res.redirect("/")
})
router.get("/run/:command", (req, res) =>{
    if (J.auth(req.ip)) {
        let command = req.params.command
        if (command === "stop") {
            J.stop().then(()=>{
                res.send("done")
            })
        } else {
            res.send("?!")
        }
    } else {res.send("No")}
})
router.post("/run", (req, res) =>{
    if (req.body.password === env.getEnv("mainPassword")) {
        dailyTask.deploy().then(()=>{
            J.logger.debug("daily task")
        })
        res.send("success")
    } else {
        res.send("fail")
    }
})
router.get("/aboutOrderSentence", (req, res)=> {res.render("aboutOrderSentence")})
router.get("/about", (req, res) =>{
    //J.box(R.type(req.user))
    res.render("about")
})
router.get("/writeSentenceLite", (req, res) =>{res.render("writeSentenceLite")})
router.get("/learningMeme", (req, res) =>{res.render("learningMeme")})
router.get("/writeSentence", (req, res)=> {res.render("writeSentence")})
router.get("/orderSentence", (req, res) =>{res.render("orderSentence")})
router.get("/orderSentenceMobile", (req, res) =>{res.render("orderSentenceMobile")})
router.get("/test", (req, res) =>{res.render("test")})
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
router.post("/counter", (req, res) =>{
    mongoose.model("Counter").find({}, (error, incoming)=>{
        res.send(`${incoming[ 0 ].counter}`)
    })
})
router.get("/blog-*", (req, res) => {
    let keyword = req.params[ 0 ]
    getMarkdownData(keyword).then((incoming)=>{
        if (incoming !== null) {
            res.render("blog", {title: titleFn(incoming), content: cleanFn(incoming)})
        } else {
            res.render("index")
        }
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
router.post("/readRandom/:model", (req, res) =>{
    if (R.indexOf(req.params.model), config.models) {
        mongoose.model(J.firstLetterCapital(req.params.model)).count().exec(function(err, count) {
            let random = Math.floor(Math.random() * count)
            mongoose.model(J.firstLetterCapital(req.params.model)).findOne().skip(random).exec((err, result)=>{
                res.send(result)
            })
        })
    } else {
        res.send(config.badQuery)
    }
})
function getMarkdownData(fileName) {
    let fileIs = `${oneLevelUp(__dirname)}/blog/${fileName}.md`
    return new Promise((resolve)=>{
        fs.readFile(fileIs, "utf8", function (err, data) {
            if (err === null) {
                resolve(data)
            } else {
                resolve(null)
            }
        })
    })
}
module.exports = router
