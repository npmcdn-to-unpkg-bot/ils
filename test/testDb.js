"use strict"
const J = require("../common")
const expect = require("unexpected")
const sinon = require("sinon")
var mongoose = require("mongoose")
var mockgoose = require("mockgoose")
const db = require("../hapi/_inc/db")
let testModel
const mongooseData = require("../hapi/_inc/mongooseData")
describe.only("mongoose", ()=>{
    it("gitHookTokenWrite", (done)=>{
        J.postData(`${J.ils}/gitHookTokenWrite`, {token: "gitHookTokenValueSecond"}).then(data=>{
            J.log(data)
            expect(1, "to be", 1)
            done()
        })
    })
    it("gitHookTokenWrite", (done)=>{
        J.postData(`${J.ils}/gitHookTokenRead`, {token: "gitHookTokenValueSecond"}).then(data=>{
            J.log(data)
            expect(1, "to be", 1)
            done()
        })
    })
})
describe("mockgoose", ()=>{
    before((done)=>{
        mockgoose(mongoose).then(()=>{
            mongoose.connect(J.config.mongooseConnection, (err)=>{
                mongooseData.initSchemas()
                let model = mongoose.model("Main")
                let Model = new model({
                    id: 44,
                    deWord: "mehr",
                    enWord: "more",
                    dePart: "mehr ist weniger",
                    enPart: "more is less",
                    imageSrc:{
                        sourceUrl: "sourceUrlData",
                        originalUrl: "originalUrlData"
                    },
                    category: "quotes",
                    childSafetyFlag: true
                })

                Model.save((error, data, numRowsAffected)=>{
                    if (!error) {
                        testModel = data
                    }
                    done(error)
                })
            })
        })
    })
    afterEach((done)=>{
        mockgoose.reset()
        done()
    })
    it("counter should return number - mockgoose", (done)=>{
        db.count().then(data=>{
            expect(data, "to be", 1)
            done()
        })
    })
    it("counter should return number - stub", (done)=>{
        let stub = sinon.stub(db, "count", ()=>{
            return new Promise(resolve=>resolve(1))
        })
        db.count().then(data=>{
            expect(stub.notCalled, "to be", false)
            expect(stub.calledOnce, "to be", true)
            done()
        })
    })
})
