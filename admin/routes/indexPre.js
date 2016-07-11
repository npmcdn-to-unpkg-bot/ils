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

async function willTranslate(word) {
    let translated = await translate.deEn(word)
    return bringOrderTranslation.main(translated)
}
async function willUpdate(parent, data) {
    let iMeanNothing
    for (let val of data) {
        iMeanNothing = await proudDb.save(parent, `${val.id}`, val)
        J.log(iMeanNothing)
    }
    return iMeanNothing
}
async function willAddEntry(parent, dataRaw) {
    let indexFuture = await proudDb.loadParent("nextIndex")
    let data = R.merge(dataRaw, {id: indexFuture})
    let iMeanNothing = await proudDb.saveParent("nextIndex", indexFuture + 1)
    iMeanNothing = await proudDb.save(parent, `${data.id}`, data)
    return iMeanNothing
}
async function willBulkRemove(parent, dataRaw) {
    let indexFuture = await proudDb.loadParent("nextIndex")
    let data = R.merge(dataRaw, {id: indexFuture})
    let iMeanNothing = await proudDb.saveParent("nextIndex", indexFuture + 1)
    iMeanNothing = await proudDb.save(parent, `${data.id}`, data)
    return iMeanNothing
}
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
router.get("/db", (req, res) => {
    res.render("db")
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
    willUpdate(req.params.parent, R.values(JSON.parse(req.body.data))).then(()=>{
        res.send("done")
    })
})
router.post("/publish/:parent", (req, res) =>{
    willAddEntry(req.params.parent, JSON.parse(req.body.data)).then(()=>{
        res.send("done")
    })
})
router.post("/remove/:parent", (req, res) =>{
    proudDb.remove(req.params.parent, JSON.parse(req.body.data).id * 1).then(()=>{
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
router.post("/deEnShort", (req, res)=>{
    let password = req.body.password
    let word = req.body.word
    J.log(word, "word")
    willTranslate(word).then((result)=>{
        res.send(result)
    })
})
router.post("/deEn", (req, res)=>{
    let word = JSON.parse(req.body.data).word
    J.log(word, "word")
    willTranslate(word).then((incoming)=>{
        res.send(incoming)
    })
})
router.post("/catchDailyHook", function (req, res) {
    if (req.body.password === env.getEnv("mainPassword")) {
        res.send("success")
    } else {
        res.send("fail")
    }
})

module.exports = router
