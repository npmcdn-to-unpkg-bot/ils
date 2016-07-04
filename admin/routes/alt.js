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
        fs.outputFile(`${twoLevelUp(__dirname)}/hapi/blog/${keyword}.md`, content, function () {
            resolve(true)
        })
    })
}

function willTranslate(wordIn) {
    return willTranslateAsync(wordIn)
}

router.post("/test", (req, res) =>{

    let just = proudDb.loadParent("data").then((data)=>{
        let counter = 0
        let just = R.compose(
            R.map(
                (val) => {
                    counter++
                    return R.merge(val, {"id": counter})
                }
            )
        )(data)
        proudDb.saveParent("data", just, true)
        res.send(data)
    })
})




module.exports = router
