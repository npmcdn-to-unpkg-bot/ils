"use strict"
const J = require("./common")
const R = require("ramda")
const RFantasy = require("ramda-fantasy")
const fs = require("fs-extra")
const Either = RFantasy.Either
const Future = RFantasy.Future
const Identity = RFantasy.Identity
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just
const env = require("dotenv-helper")
const Bing = require("node-bing-api")({ accKey: env.getEnv("bing") })
Bing.images("javascript", {
    top: 5,
    imageFilters: {
        size: "large",
        color: "color",
        style: "photo",
        aspect : "wide"
    }
}, function(error, res, body) {
    console.log(body.d.results[ 0 ].MediaUrl)
    console.log(body.d.results[ 0 ].Width)
    console.log(body.d.results[ 0 ].Height)
    console.log(typeof body.d.results)
})
