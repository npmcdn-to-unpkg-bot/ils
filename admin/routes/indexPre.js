"use strict"
const express = require("express")
const router = express.Router()

const fs = require("fs-extra")
const R = require("ramda")
const envHelper = require("dotenv-helper")

const J = require("../../common.js")

const translate = require("../_inc/translate")
const bringOrderTranslation = require("../_inc/bringOrderTranslation")

let twoLevelUp = R.compose(R.join("/"), R.dropLast(2), R.split("/"))

async function willTranslateAsync(wordIn) {
    let state = await J.load("GermanOverall", wordIn)
    if (J.isEmpty(state)) {
        let translated = await translate.deEn(wordIn)
        let willSend = bringOrderTranslation.main(translated)
        willSend = await J.save("GermanOverallRaw", wordIn, translated)
        willSend = await J.save("GermanOverall", wordIn, willSend)
        return willSend
    } else {
        return state
    }
}

function willPublish(keyword, content) {
    return new Promise((resolve)=>{
        fs.outputFile(`${twoLevelUp(__dirname)}/hapi/blog/${keyword}.md`, content, function () {
            resolve(true)
        })
    })
}

function willTranslate(wordIn) {
    return willTranslateAsync(wordIn)
}

router.get("/", (req, res) => {
    res.send("index")
})

router.post("/test", (req, res) =>{
    res.send(JSON.stringify(typeof req.ip))
})

router.post("/blog", (req, res) =>{
    if (req.ip.includes("127.0.0.1")) {
        willPublish(req.body.keyword, req.body.content).then(()=>{
            res.send("was published")
        })
    } else {
        res.send("index")
    }
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
        //dailyTask.main()
        res.send("success")
    } else {
        res.send("fail")
    }
})

module.exports = router
