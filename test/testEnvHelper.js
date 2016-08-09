"use strict"
const fs = require("fs-extra")
const expect = require("unexpected")
const tested = require("./only/env.js")

describe("testing",() => {
    it("get/add env values - not mocked",(done) => {
        expect(tested.getEnvSecure("npmGlobal"),"to be an","array")
        tested.addEnv("willDisappearKey","willDisappearValue").then((errorIs)=>{
            console.log(errorIs)
            expect(null,"to be",null)
            done()
        })
    })
    it("del env values - not mocked",(done) => {
        tested.delEnv("willDisappearKey").then((incoming)=>{
            console.log(incoming)
            done()
        })

    })
})
