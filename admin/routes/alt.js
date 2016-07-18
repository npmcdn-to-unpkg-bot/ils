"use strict"
const express = require("express")
const router = express.Router()
const R = require("ramda")
const env = require("dotenv-helper")
const J = require("../../common.js")
const proudDb = require("../_inc/proud-db")
const uploadImage = require("../_inc/uploadImage")
const searchImage = require("../_inc/searchImage")

router.post("/", (req, res) =>{
    let keyword = JSON.parse(req.body.data).imageSearch
    searchImage.main(imageSearch).then(incoming =>{
        res.send(incoming)
    })
})
router.post("/test", (req, res)=>{
    J.lg(req.body.keyword)
    searchImage.main(req.body.keyword).then(incoming =>{
        res.send(incoming)
    })
})
module.exports = router
