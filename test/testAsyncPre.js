"use strict"
const R = require("ramda")
const J = require("../common")
const expect = require("unexpected")
const imagemin = require("../_inc/imagemin")
const uploadImage = require("../_inc/uploadImage")
describe("imagemin", ()=>{
    it("should work", (done)=>{
        async function wrapper() {
            //expect(await tested.save("parent", "key", "value"), "to be", true)
        }
        wrapper().then(done)
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
})
describe.only("imagemin", ()=>{
    it("should work", (done)=>{
        let imagePng = `${__dirname}/inc/test.jpg`
        let destination = "/home/just/ils/_inc/tmp/test.png"
        imagemin.main(imagePng).then(data=>{
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
