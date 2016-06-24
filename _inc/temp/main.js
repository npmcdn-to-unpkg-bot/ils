"use strict"
const express = require("express")
const router = express.Router()
const J = require("../../common.js")
const envHelper = require("dotenv-helper")
const translate = require("../_inc/translate")
const bringOrderTranslation = require("../_inc/bringOrderTranslation")

router.get("/",function (req,res) {
    res.send("index")
})

router.post("/detoen",function (req,res) {
    let password = req.body.password
    let word = req.body.word
    J.log(word,"word")
    if(password === envHelper.getEnv("passwordUbersetzung")) {
        let existState = J.load("GermanOverall",word)
        if(existState === null) {
            translate.deEn(word).then((translated) => {
                // J.save("GermanOverallRaw",word,translated)
                let willSend = bringOrderTranslation.main(translated)
                // J.save("GermanOverall",word,willSend)
                res.send(willSend)
            })
        } else{
            res.send(existState)
        }

    } else{
        res.send(word)
    }
})

router.get("/command/:commandIs",function (req,res) {
    console.log(req.body)
    console.log(req.params)
    res.send("it sis")
})

router.get("/blog/:post",function (req,res) {
    let post = req.params.post
    res.render("lonelyJust",{
        name: "John"
    })
})

module.exports = router
