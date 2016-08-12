"use strict"
const R = require("ramda")
const J = require("../common")
const expect = require("unexpected")
const request = require("superagent")
const imagemin = require("../_inc/imagemin")
const uploadImage = require("../_inc/uploadImage")
describe.only("requests", ()=>{
    it("should work - https://ilearnsmarter.com/readRandom/main", (done)=>{
        J.postData("https://ilearnsmarter.com/readRandom/main", {})
        .then(res=>{
            J.lg(res)
            expect(true, "to be", true)
            done()
        })
    })
    //it("should work - http://localhost:3000/readRandom/translateDraft", (done)=>{
    //request.post("https://localhost:3000/readRandom/translateDraft")
    //.send({})
    //.set("Accept", "application/json")
    //.end((err, res)=>{
    //J.log(res)
    //J.log(err)
    //done()
    //})
    //})
    it("should work - http://localhost:3000/readRandom/translateDraft", (done)=>{
        request.post("http://localhost:3000/readRandom/translateDraft")
        .send({})
        .set("Accept", "application/json")
        .end((err, res)=>{
            expect(res.body.word, "to be a string")
            expect(res.status, "to be", 200)
            done()
        })
    })
})
describe("uploadImage", ()=>{
    it("should work - jpg", (done)=>{
        let obj = {
            imageSrc: "https://i.ytimg.com/vi/l8a4DDb9W3g/maxresdefault.jpg",
            enPart: "Ramda Babel React"
        }
        uploadImage.main(obj).then(data=>{
            J.log(data)
            expect(true, "to be", true)
            done()
        })
    })
    it("should work - png", (done)=>{
        let obj = {
            imageSrc: "http://www.laughspark.info/uploadfiles/funny-blogging-cat-meme-5669.png",
            enPart: "Homer Babel React"
        }
        uploadImage.main(obj).then(data=>{
            J.log(data)
            expect(true, "to be", true)
            done()
        })
    })
})
describe("imagemin", ()=>{
    it("should work - jpg", (done)=>{
        let imagePath = `${__dirname}/inc/test.jpg`
        imagemin.main(imagePath).then(data=>{
            expect(data, "to be", true)
            done()
        })
    })
    it("should work - png", (done)=>{
        let imagePath = `${__dirname}/inc/test.png`
        imagemin.main(imagePath).then(data=>{
            expect(data, "to be", true)
            done()
        })
    })
})
//WILLEXPORT
function will() {
    return new Promise((resolve)=>{
        resolve(true)
    })
}
