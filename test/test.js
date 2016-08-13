"use strict"
const R = require("ramda")
const J = require("../common")
const expect = require("unexpected")
const request = require("superagent")
const imagemin = require("../_inc/imagemin")
const imageminFuture = require("../_inc/imageminFuture")
const uploadImage = require("../_inc/uploadImage")
const translateDraftGenerator = require("../_inc/translateDraftGenerator")
describe("empty", ()=>{
    it("should work", ()=>{
        expect(true, "to be true")
    })
})
describe.only("translateDraftGenerator", ()=>{
    it("should work", (done)=>{
        translateDraftGenerator.main().then(data=>{
            expect(true, "to be true")
            done()
        })
    })
})
describe("requests", ()=>{
    it("should work - localhost:3000/addTranslateDraft", (done)=>{
        let obj = {
            word: "mehr",
            deEn: {dePart:"mehr", enPart: "more,plenty"},
            synonym:[{dePart:"mehr", enPart: "more,plenty"}],
            synonymTranslated:[{dePart:"mehr", enPart: "more,plenty"}],
            phrase:[{dePart:"mehr", enPart: "more,plenty"}],
            phraseTranslated:[{dePart:"mehr", enPart: "more,plenty"}]
        }
        J.postData(`${J.hapi}/addTranslateDraft`, obj).then(data=>{
            J.log(data)
            expect(true, "to be true")
            done()
        })
    })
    it("should emit error - localhost:3000/addMain", (done)=>{
        request.post("http://localhost:3000/addMain")
        .send("like a water on a party")
        .set("Accept", "application/json")
        .end((err, res)=>{
            expect(res.text, "to be", J.config.incomleteRequest)
            expect(200, "to be", 200)
            done()
        })
    })
    it("should work - localhost:3000/addMain", (done)=>{
        let obj = {
            dePart: "this is test dePart",
            enPart: "this is test enPart"
        }
        request.post("http://localhost:3000/addMain")
        .send(obj)
        .set("Accept", "application/json")
        .end((err, res)=>{
            expect(res.body.dePart, "to be", obj.dePart)
            expect(res.body.enPart, "to be", obj.enPart)
            expect(res.body.id, "to be a number")
            expect(res.status, "to be", 200)
            done()
        })
    })
    it("should work - ilearnsmarter.com/readRandom/translateDraft", (done)=>{
        request.post("https://ilearnsmarter.com/readRandom/translateDraft")
        .send({})
        .set("Accept", "application/json")
        .end((err, res)=>{
            expect(res.status, "to be", 200)
            expect(res.body.synonym, "to be an array")
            expect(res.body.synonymTranslated, "to be an array")
            expect(res.body.phrase, "to be an array")
            expect(res.body.phraseTranslated, "to be an array")
            expect(res.body.deEn.dePart, "to be a string")
            expect(res.body.deEn.enPart, "to be a string")
            done()
        })
    })
    it("should work - ilearnsmarter.com/readRandom/main", (done)=>{
        request.post("https://ilearnsmarter.com/readRandom/main")
        .send({})
        .set("Accept", "application/json")
        .end((err, res)=>{
            expect(res.status, "to be", 200)
            expect(res.body.enPart, "to be a string")
            expect(res.body.dePart, "to be a string")
            expect(res.body.category, "to be a string")
            expect(res.body.id, "to be a number")
            done()
        })
    })
    it("should work - localhost:3000/readRandom/translateDraft", (done)=>{
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
    it("future all - jpg", (done)=>{
        let imagePath = `${__dirname}/inc/test.jpg`
        imagemin.main(imagePath).then(data=>{
            expect(data, "to be", true)
            done()
        })
    })
    it("future all - png", (done)=>{
        let imagePath = `${__dirname}/inc/test.jpg`
        imagemin.main(imagePath).then(data=>{
            expect(data, "to be", true)
            done()
        })
    })
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
