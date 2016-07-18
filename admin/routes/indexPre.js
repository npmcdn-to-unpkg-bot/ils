"use strict"
const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const R = require("ramda")
const envHelper = require("dotenv-helper")
const J = require("../../common.js")
const translate = require("../_inc/translate")
const bringOrderTranslation = require("../_inc/bringOrderTranslation")
const uploadImage = require("../_inc/uploadImage")
const searchImage = require("../_inc/searchImage")
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
let getPredraftCategory = R.compose(R.filter((val)=>{
    return R.prop("category", val) === "preDraft"
}))
async function willBulkRemove(marker) {
    let dataState = await proudDb.loadParent("data")
    let predraftCategory = getPredraftCategory(dataState)
    let willRemoveIndexArr = []
    let dropByIndex = R.compose(R.values, R.map(R.set(R.lensProp("category"), "draft")), R.filter((val)=>{
        if (R.lte(R.prop("id", val), marker)) {
            if (R.prop("enPart", val).length > 0) {
                return true
            } else {
                willRemoveIndexArr.push(R.prop("id", val))
                return false
            }
        } else {
            return false
        }
    }))
    let willChangeCategoryArr = dropByIndex(predraftCategory)
    J.log(willRemoveIndexArr)
    J.log(willChangeCategoryArr)
    let iMeanNothing
    for (let removeMarker of willRemoveIndexArr) {
        J.log(removeMarker, "remove")
        J.log(dataState[ removeMarker ])
        iMeanNothing = await proudDb.remove("data", `${removeMarker}`)
    }
    for (let updateValue of willChangeCategoryArr) {
        J.log(updateValue, "update")
        iMeanNothing = await proudDb.save("data", `${updateValue.id}`, updateValue)
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
router.get("/", (req, res) => {
    res.render("index")
})
router.get("/db", (req, res) => {
    res.render("db")
})
router.get("/read/:parent", (req, res) =>{
    proudDb.loadParent(req.params.parent).then((data)=>{
        res.send(data)
    })
})
router.post("/update/:parent", (req, res) =>{
    willUpdate(req.params.parent, JSON.parse(req.body.data)).then(()=>{
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
router.post("/removeBulk", (req, res) =>{
    willBulkRemove(JSON.parse(req.body.data).id * 1).then(()=>{
        res.send("done")
    })
})
router.post("/blog", (req, res) =>{
    willPublish(req.body.keyword, req.body.content).then(()=>{
        res.send("was published")
    })
})
router.post("/searchImage", (req, res) =>{
    J.log(req.body.data)
    J.log(typeof req.body.data)
    let keyword = R.prop("searchImage", JSON.parse(req.body.data))
    searchImage.main(keyword).then(incoming =>{
        res.send(incoming)
    })
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
router.get("/test", (req, res) =>{
    //willBulkRemove(126).then(J.lg)
    res.send("more")
})
module.exports = router
