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
async function willUpdateDb(parent, data) {
    let iMeanNothing
    //R.values(data).map((val)=>{
    for (let val of data) {
        iMeanNothing = await proudDb.save(parent, `${val.id}`, val, true)
        J.log(iMeanNothing)
    }
    return iMeanNothing

}
function willPublish(keyword, content) {
    return new Promise((resolve)=>{
        fs.outputFile(`${twoLevelUp(__dirname)}/hapi/blog/${keyword}.md`, content, ()=>{
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
    res.send("more")
})

router.get("/read/:parent", (req, res) =>{
    proudDb.loadParent(req.params.parent).then((data)=>{
        res.send(data)
    })
})

router.post("/update/:parent", (req, res) =>{
    willUpdateDb(req.params.parent, R.values(JSON.parse(req.body.data))).then(()=>{
        res.send("done")
    })
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
