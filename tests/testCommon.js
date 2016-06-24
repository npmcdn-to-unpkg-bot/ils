"use strict"
const fs = require("fs-extra")
const expect = require("unexpected")
const tested = require("./a.js")

let goodWord = "mehr"
let badWord = "&^&^io\';\"llk"

describe("testing",() => {
    it("deEnFirst - good word",(done) => {
        tested.deEnFirst("mehr").then((incoming)=>{
            console.log(incoming)
            expect(incoming.dePart,"to contain","mehr")
            expect(incoming.enPart,"to contain","more")
            done()
        })
    })
    it.only("deEnFirst - bad word",(done) => {
        tested.deEnFirst(badWord).then((incoming)=>{
            console.log(incoming)
            // expect(incoming.dePart, "to contain", "mehr")
            expect(incoming.enPart.toLowerCase(),"to contain","no query")
            done()
        })
    })
})
