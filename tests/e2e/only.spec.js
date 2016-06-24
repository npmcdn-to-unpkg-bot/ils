"use strict"
require("./inc/waitReady.js")
const expect = require("unexpected")

describe("iLs",() => {
    beforeEach(()=>{
        browser.ignoreSynchronization = true
        browser.get("http://ilearnsmarter.com/")
    })

    it("home page",(done)=>{
        let waitElement = element(by.tagName("div"))
        waitElement.waitReady()
        expect(waitElement.waitReady(),"to be fulfilled")
        done()
    })

    afterEach(()=>{
        browser.manage().deleteAllCookies()
        browser.executeScript("window.sessionStorage.clear();")
        browser.executeScript("window.localStorage.clear();")
    })
})
