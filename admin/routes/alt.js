"use strict"
const express = require("express")
const router = express.Router()
const R = require("ramda")
const env = require("dotenv-helper")
const mongoose = require("mongoose")
const J = require("../../common.js")
const proudDb = require("../_inc/proud-db")
const uploadImage = require("../_inc/uploadImage")
const searchImage = require("../_inc/searchImage")

router.get("/", (req, res) =>{
    let Draft = mongoose.model("Draft")
    Draft.create({dePart: "dsfds", enPart: "sefafdsfs"}, function(error, incoming) {
        J.lg(error, incoming)
    })
    res.send("done")
})

module.exports = router
