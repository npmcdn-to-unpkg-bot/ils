"use strict"
const express = require("express")
const router = express.Router()
const J = require("../../common.js")
router.get("/", (req, res)=>{
    res.render("index", {message: "Hello there!"})
})
module.exports = router
