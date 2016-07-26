"use strict"
const express = require("express")
const fs = require("fs-extra")
const J = require("../../common")
const dailyTask = require("../_inc/dailyTask")
const R = require("ramda")
const moment = require("moment")
const env = require("dotenv-helper")

let router = express.Router()

let oneLevelUp = R.compose(R.join("/"), R.init, R.split("/"))
let titleFn = R.compose(R.trim, R.last, R.split("-"), R.head, R.match(/\/\/(\s)?title.{1,70}/gm))
//let categoryFn = R.compose(R.trim,R.last,R.split("-"),R.head,R.match(/\/\/(\s)?category.{1,70}/gm))
let cleanFn = R.compose(R.replace(/\/(.|\n)+(?=#)/gm, ""))

router.get("/", (req, res) =>{
    res.render("index")
})
router.get("/run/:command", (req, res) =>{
    if (J.auth(req.ip)) {
        let command = req.params.command
        if (command === "stop") {
            J.stop().then(()=>{
                res.send("done")
            })
        } else if (command === "start") {
            J.start().then(()=>{
                res.send("done")
            })
        } else {
            res.send("?!")
        }
    } else {res.send("No")}
})
router.get("/redux", (req, res) =>{
    res.render("redux")
})
router.get("/aboutOrderSentence", (req, res)=> {
    res.render("aboutOrderSentence")
})
router.get("/about", (req, res) =>{
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
router.post("/catchDailyHook", (req, res)=> {
    let currentTime = moment().format("MMMM Do h:mm")
    J.postData(env.getEnv("zapierLogData"), {logData: `iLs dailyTask ${currentTime}`}).then(J.log)
    if (req.body.password === env.getEnv("mainPassword")) {
        dailyTask.deploy().then(()=>{
            J.postData(env.getEnv("zapierLogData"), {logData: `iLs dailyTask ${currentTime}`}).then(J.log)
        })
        res.send("success")
    } else {
        res.send("fail")
    }
})
router.post("/catchDailyHookRoot", (req, res) =>{
    let currentTime = moment().format("MMMM Do h:mm")
    J.postData(env.getEnv("zapierLogData"), {logData: `root dailyTask ${currentTime}`}).then(J.log)
    if (req.body.password === env.getEnv("mainPassword")) {
        dailyTask.deployRoot().then(()=>{
            J.postData(env.getEnv("zapierLogData"), {logData: `root dailyTask ${currentTime}`}).then(J.log)
        })
        res.send("success")
    } else {
        res.send("fail")
    }
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
