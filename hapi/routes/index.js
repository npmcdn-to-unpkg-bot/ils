"use strict"
const express = require("express")
const fs = require("fs-extra")
const J = require("../../common")
const dailyTask = require("../_inc/dailyTask")
const R = require("ramda")
const env = require("dotenv-helper")
const db = require("proud-db")
const passport = require("passport")
const Strategy = require("passport-twitter").Strategy
let router = express.Router()
passport.use(new Strategy({
    consumerKey: env.getEnv("twitterKey"),
    consumerSecret: env.getEnv("twitterSecret"),
    callbackURL: "http://127.0.0.1:3000/login/twitter/return"
}, (token, tokenSecret, profile, cb) =>{
    return cb(null, profile)
}))
passport.serializeUser((user, cb)=>{
    cb(null, user)
})
passport.deserializeUser((obj, cb)=>{
    cb(null, obj)
})
let oneLevelUp = R.compose(R.join("/"), R.init, R.split("/"))
let titleFn = R.compose(R.trim, R.last, R.split("-"), R.head, R.match(/\/\/(\s)?title.{1,70}/gm))
//let categoryFn = R.compose(R.trim,R.last,R.split("-"),R.head,R.match(/\/\/(\s)?category.{1,70}/gm))
let cleanFn = R.compose(R.replace(/\/(.|\n)+(?=#)/gm, ""))
function setCookie(key, value, res) {
    res.append("Set-Cookie", `${key}=${value}`)
}
router.get("/", (req, res) =>{
    res.render("index")
})
router.get("/login", (req, res)=>{
    res.render("login")
})
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
//router.get("/redux", (req, res) =>{
//res.render("redux")
//})
router.get("/aboutOrderSentence", (req, res)=> {
    res.render("aboutOrderSentence")
})
router.get("/about", (req, res) =>{
    J.box(R.type(req.user))
    res.render("about")
})
router.get("/writeSentenceLite", (req, res) =>{
    res.render("writeSentenceLite")
})
router.get("/learningMeme", (req, res) =>{
    res.render("learningMeme")
})
router.get("/writeSentence", (req, res)=> {
    res.render("writeSentence")
})
router.get("/orderSentence", (req, res) =>{
    res.render("orderSentence")
})
router.get("/orderSentenceMobile", (req, res) =>{
    res.render("orderSentenceMobile")
})
router.get("/test", (req, res) =>{
    res.render("test")
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
