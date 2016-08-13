"use strict"
const express = require("express")
const J = require("../../common")
const config = require("../_inc/config")
const db = require("../../_inc/db")
const searchImage = require("../../_inc/searchImage")
const uploadImage = require("../../_inc/uploadImage")
const R = require("ramda")
const env = require("dotenv-helper")
const mongoose = require("mongoose")
const fs = require("fs-extra")
const logFile = `${__dirname}/logFile.txt`
let router = express.Router()
function learningMemePublish(data) {
    return new Promise(resolve=>{
        uploadImage.main(data).then(uploadImageData=>{
            if (uploadImageData === null) {
                uploadImageData = {imageSrc:false}
            }
            let obj = R.merge(data, uploadImageData)
            db.findOneAndUpdateMain(obj).then(updateData=>{
                res.send(updateData)
            })
        })
    })
}
function repair(id) {
    return new Promise(resolve=>{
        db.load("Main", "id", id).then(data=>{
            console.log(data)
            let obj = data[ 0 ]
            let updater = {
                imageSrc: obj.imageSrc.imageSrc,
                imageSrcOrigin: obj.imageSrc.originalSrc,
                altTag: obj.imageSrc.name
            }
            console.log(R.merge(obj, updater))
            db.findOneAndUpdateMain(R.merge(obj, updater)).then(updateData=>{
                resolve(updateData)
            })
        })
    })
}
router.get("/", (req, res) =>{res.render("index")})
router.get("/tunaPlayerDemo", (req, res) =>{res.render("tunaPlayerDemo")})
router.get("/aboutOrderSentence", (req, res)=> {res.render("aboutOrderSentence")})
router.get("/about", (req, res) =>{res.render("about")})
router.get("/writeSentenceLite", (req, res) =>{res.render("writeSentenceLite")})
router.get("/learningMeme", (req, res) =>{res.render("learningMeme")})
router.get("/writeSentence", (req, res)=> {res.render("writeSentence")})
router.get("/orderSentence", (req, res) =>{res.render("orderSentence")})
router.get("/orderSentenceMobile", (req, res) =>{res.render("orderSentenceMobile")})
router.post("/read/:id", (req, res) =>{
    J.logger.debug(`read db | ip ${req.ip}`)
    mongoose.model("Main").findOne({id: req.params.id * 1}, (error, data)=>{
        J.log(error, data)
        res.send(data)
    })
})
router.post("/gitHookTokenWrite", (req, res) =>{
    if (J.auth(req.ip)) {
        db.gitHookTokenWrite(req.body).then(data=>{
            res.send(data)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/gitHook", (req, res) =>{
    if (R.path(["head_commit", "message"], req.body)) {
        db.gitHookTokenRead().then(data=>{
            let token = req.body.head_commit.message.split("-")[ 1 ]
            if (data.token === token) {
                J.willRunFixedCommand("npm run evergreen").then(()=>{
                    db.gitHookTokenWrite({token: J.randomSeed()}).then(()=>{
                        res.send(J.config.goodQuery)
                    })
                })
            } else {
                res.send(token)
            }
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/ready", (req, res) =>{
    J.logger.debug(`read ready | ip ${req.ip}`)
    mongoose.model("Main").find({$where: "this.enPart.length>1"}, (error, incoming)=>{
        res.send(incoming)
    })
})
router.post("/learningMeme", (req, res) =>{
    mongoose.model("Main").find({$where: "this.imageSrc!==undefined&&this.imageSrc!==false"}, (error, incoming)=>{
        res.send(R.values(incoming))
    })
})
router.post("/orderSentence", (req, res) =>{
    mongoose.model("Main").find({$where: "this.enPart!==undefined&&this.enPart.length>5"}, (error, incoming)=>{
        res.send(incoming)
    })
})
router.get("/translateDraft", (req, res) =>{
    if (J.auth(req.ip)) {
        res.render("translateDraft")
    } else {
        res.send(J.config.badQuery)
    }
})
router.get("/learningMemeAdmin", (req, res) =>{
    if (J.auth(req.ip)) {
        res.render("learningMemeAdmin")
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/counter", (req, res) =>{
    if (J.auth(req.ip)) {
        mongoose.model("Counter").find({}, (error, incoming)=>{
            res.send(`${incoming[ 0 ].counter}`)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/removeMain", (req, res) =>{
    if (J.auth(req.ip)) {
        mongoose.model("Main").remove({id: req.body.id * 1}, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/remove/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        mongoose.model(J.firstLetterCapital(req.params.model)).remove({_id: req.body._id * 1}, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/update/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        let obj = {}
        obj[ req.body.key ] = req.body.value
        mongoose.model(J.firstLetterCapital(req.params.model)).findOneAndUpdate({id: req.body.id * 1}, obj, (error, incoming)=>{
            J.lg(error, incoming)
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/updateMany/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        let obj = JSON.parse(req.body.obj)
        mongoose.model(J.firstLetterCapital(req.params.model))
        .findOneAndUpdate({id: req.body.id * 1}, obj, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/repair/:id/:key/:keyValue", (req, res) =>{
    let obj = {}
    obj.id = req.params.id
    obj[ req.params.key ] = req.params.keyValue
    db.findOneAndUpdateMain("Main", obj).then(()=>{
        res.send("ok")
    })
})
router.post("/readModel/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        J.logger.debug(`model ${req.params.model} ip ${req.ip}`)
        let obj = {}
        obj[ req.body.key ] = req.body.keyValue
        mongoose.model(J.firstLetterCapital(req.params.model)).findOne(obj, (error, incoming)=>{
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/readRandom/:model", (req, res) =>{
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        db.random(J.firstLetterCapital(req.params.model)).then(incoming=>{res.send(incoming)})
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/imageless", (req, res) =>{
    if (J.auth(req.ip)) {
        db.randomCondition().then(incoming=>{
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/searchImage", (req, res) =>{
    if (J.auth(req.ip)) {
        searchImage.main(req.body.searchImageKeyword).then(incoming =>{
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/searchImageFast", (req, res) =>{
    if (J.auth(req.ip)) {
        searchImage.imageFirst(req.body.searchImageKeyword).then(incoming =>{
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/learningMemePublish", (req, res) =>{
    if (J.auth(req.ip)) {
        learningMemePublish(req.body.data).then(data=>{
            res.send(data)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/addMain", (req, res) =>{
    if (J.auth(req.ip)) {
        if (J.isTranslateDraftType(req.body)) {
            db.save("TranslateDraft", req.body).then(incoming=>{
                res.send(incoming)
            })
        } else {
            res.send(J.config.incomleteRequest)
        }
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/addMain", (req, res) =>{
    if (J.auth(req.ip)) {
        if (J.isMainType(req.body)) {
            db.addMain(req.body).then(incoming=>{
                res.send(incoming)
            })
        } else {
            res.send(J.config.incomleteRequest)
        }
    } else {
        res.send(J.config.badQuery)
    }
})
module.exports = router
