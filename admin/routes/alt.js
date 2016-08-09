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
//Draft.create({dePart: "dsfds", enPart: "sefafdsfs"}, function(error, incoming) {
//router.get("/testFirst", (req, res) =>{
//let TranslateDraft = mongoose.model("TranslateDraft")
//TranslateDraft.find({$where :"this.word===\"auswahl\""}, (error, incoming)=>{
//J.lg(error)
//res.send(incoming)
//})
//})
router.get("/", (req, res)=>{
    res.render("index", {message: "Hello there!"})
})
module.exports = router
