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
const memeMaker = require("meme-maker")
let options = {
    image: "tmp/test.png",         //Required
    outfile: "test-meme.png",  //Required
    topText: "TODAY IM",            //Required
    bottomText: "AN",           //Optional
    fontSize: 50,                   //Optional
    fontFill: "#FFF",               //Optional
    textPos: "center",              //Optional
    strokeColor: "#000",            //Optional
    strokeWeight: 2                 //Optional
}

memeMaker(options, (error)=>{
    if (error) {console.error(error)}
    J.log(true)
})
