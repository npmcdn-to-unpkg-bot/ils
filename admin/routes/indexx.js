"use strict"
const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const R = require("ramda")
const envHelper = require("dotenv-helper")
const J = require("../../common.js")
const translate = require("../_inc/translate")
const bringOrderTranslation = require("../_inc/bringOrderTranslation")
const proudDb = require("../_inc/proud-db")

let twoLevelUp = R.compose(R.join("/"), R.dropLast(2), R.split("/"))

function willPublish(keyword, content) {
    return new Promise((resolve)=>{
        fs.outputFile(`${twoLevelUp(__dirname)}/hapi/blog/${keyword}.md`, content, ()=>{
            resolve(true)
        })
    })
}

router.get("/", (req, res) => {
    res.send("index")
})

router.get("/read/:parent", (req, res) =>{
    proudDb.loadParent(req.params.parent).then((data)=>{
        res.send(data)
    })
})

router.post("/update/:parent", (req, res) =>{
    console.log(JSON.parse(req.body.data))
    proudDb.loadParent(req.params.parent).then((parentData)=>{
    })
    //proudDb.saveParent(req.params.parent,)
})

router.post("/blog", (req, res) =>{
    willPublish(req.body.keyword, req.body.content).then(()=>{
        res.send("was published")
    })
})

router.post("/read", (req, res)=> {
    J.log(word, "word")
    let password = req.body.password
    let word = req.body.word
    if (password === envHelper.getEnv("passwordUbersetzung")) {
        J.loadParent("GermanOverall").then((result)=>{
            res.send(result)
        })
    } else {
        res.send(word)
    }
})

router.post("/readRaw", (req, res) => {
    J.log(word, "word")
    let password = req.body.password
    let word = req.body.word
    if (password === envHelper.getEnv("passwordUbersetzung")) {
        J.loadParent("GermanOverallRaw").then((result)=>{
            res.send(result)
        })
    } else {
        res.send(word)
    }
})

router.post("/detoen", (req, res)=>{
    let password = req.body.password
    let word = req.body.word
    J.log(word, "word")
    if (password === envHelper.getEnv("passwordUbersetzung")) {
        willTranslate(word).then((result)=>{
            res.send(result)
        })
    } else {
        res.send(word)
    }
})

router.post("/catchDailyHook", function (req, res) {
    if (req.body.password === env.getEnv("mainPassword")) {
        res.send("success")
    } else {
        res.send("fail")
    }
})

module.exports = router
