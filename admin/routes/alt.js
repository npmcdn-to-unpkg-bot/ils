"use strict"
const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const R = require("ramda")
const env = require("dotenv-helper")
const J = require("../../common.js")
const translate = require("../_inc/translate")
const bringOrderTranslation = require("../_inc/bringOrderTranslation")
const proudDb = require("../_inc/proud-db")
const Bing = require("node-bing-api")({ accKey: env.getEnv("bing") })
function bingImages(keyword, marker = 5) {
    return new Promise(()=>{
        Bing.images("javascript hamburg", {
            top: marker,
            imageFilters: {
                size: "large",
                color: "color",
                style: "photo",
                aspect : "wide"
            }
        }, function(error, res, body) {
            if (R.path("d", "results")) {

            }
            (body.d.results)
        })
    })
}

router.post("/", (req, res) =>{
    J.lg(req.body)
    J.lg(typeof req.body)
    res.send("done")
})

module.exports = router
