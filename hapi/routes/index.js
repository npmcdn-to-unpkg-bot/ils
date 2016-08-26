"use strict"
const express = require("express")
const J = require("../../common")
const db = require("../../_inc/db")
const searchImage = require("../../_inc/searchImage")
const uploadImage = require("../../_inc/uploadImage")
const translateDraftGenerator = require("../../_inc/translateDraftGenerator")
const R = require("ramda")
const env = require("dotenv-helper")
const mongoose = require("mongoose")
var server = require("http").createServer()
var http = require("http")
var io = require("socket.io")(server)
let socketData
io.on("connection", (client)=>{
    client.emit("testI", { some: "data" })
    client.on("test", (data)=>{
        J.log(data)
        socketData = data
        J.emitter.emit("test")
    })
    client.on("connect", ()=> {J.log("connect")})
    client.on("disconnect", ()=> {
        J.emitter.emit("disconnect")
        client.disconnect(true)
    })
})
J.emitter.on("test", ()=>{
    J.log("test", socketData)
})
server.listen(3001)
let router = express.Router()
function learningMemePublish(data) {
    return new Promise(resolve => {
        uploadImage.main(data).then(uploadImageData => {
            if (uploadImageData === null) {
                uploadImageData = {
                    imageSrc: false
                }
            }
            let obj = R.merge(data, uploadImageData)
            db.findOneAndUpdateMain(obj).then(updateData => {
                res.send(updateData)
            })
        })
    })
}

router.get("/", (req, res) => {
    res.render("index")
})
router.get("/tunaPlayerDemo", (req, res) => {
    res.render("tunaPlayerDemo")
})
router.get("/aboutOrderSentence", (req, res) => {
    res.render("aboutOrderSentence")
})
router.get("/about", (req, res) => {
    res.render("about")
})
router.get("/writeSentenceLite", (req, res) => {
    res.render("writeSentenceLite")
})
router.get("/learningMeme", (req, res) => {
    res.render("learningMeme")
})
router.get("/learningMemeAutomated", (req, res) => {
    res.render("learningMemeAutomated")
})
router.get("/learningMemeAutomatedExtra", (req, res) => {
    res.render("learningMemeAutomatedExtra")
})
router.get("/writeSentence", (req, res) => {
    res.render("writeSentence")
})
router.get("/orderSentence", (req, res) => {
    res.render("orderSentence")
})
router.get("/orderSentenceMobile", (req, res) => {
    res.render("orderSentenceMobile")
})
router.get("/translateDraft", (req, res) => {
    if (J.auth(req.ip)) {
        res.render("translateDraft")
    } else {
        res.send(J.config.badQuery)
    }
})
router.get("/learningMemeAdmin", (req, res) => {
    if (J.auth(req.ip)) {
        res.render("learningMemeAdmin")
    } else {
        res.send(J.config.badQuery)
    }
})
router.get(`/learningMemeAdmin/${env.getEnv("mainPassword")}`, (req, res) => {
    res.render("learningMemeAdmin")
})
router.get("/readLog/:id", (req, res) => {
    mongoose.model("Log").findOne({
        id: req.params.id
    }, (error, data) => {
        res.send(data)
    })
})
router.post("/allowIp", (req, res) => {
    J.log(`allowIp | ip ${req.ip}`)
    if (req.body.password === env.getEnv("mainPassword")) {
        let ip = R.compose(R.last, R.split(":"))(req.ip)
        J.willRunFixedCommand(`node disp adminIp ${ip}`).then(()=>{
            res.send(J.config.goodQuery)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/forgetIp", (req, res) => {
    J.log(`forgetIp | ip ${req.ip}`)
    if (req.body.password === env.getEnv("mainPassword")) {
        let ip = R.compose(R.last, R.split(":"))(req.ip)
        J.willRunFixedCommand(`node disp removeAdminIp ${ip}`).then(()=>{
            res.send(J.config.goodQuery)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/read/:id", (req, res) => {
    J.logger.debug(`read db | ip ${req.ip}`)
    mongoose.model("Main").findOne({
        id: req.params.id * 1
    }, (error, data) => {
        J.log(error, data)
        res.send(data)
    })
})
router.post("/catchDailyHook", (req, res) => {
    if (req.body.password === env.getEnv("mainPassword")) {
        let message = `${(new Date).toGMTString()} - catchDailyHook ${JSON.stringify(req.body)}`
        db.findOneAndUpdateLog({
            id: "latest",
            data: message
        }).then(console.log)
        J.willRunFixedCommand("node disp spdyClean").then(data => {
            J.willRunFixedCommand("npm cache clean").then(() => {
                res.send(`${data}`)
            })
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/gitHookTokenWrite", (req, res) => {
    if (J.auth(req.ip)) {
        db.gitHookTokenWrite(req.body).then(data => {
            res.send(data)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/gitHook", (req, res) => {
    if (R.path(["head_commit", "message"], req.body)) {
        db.gitHookTokenRead().then(data => {
            let token = req.body.head_commit.message.split("-")[ 1 ]
            if (data.token === token) {
                J.willRunFixedCommand("npm run evergreen").then(() => {
                    db.gitHookTokenWrite({
                        token: J.randomSeed()
                    }).then(() => {
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
router.post("/ready", (req, res) => {
    J.logger.debug(`read ready | ip ${req.ip}`)
    mongoose.model("Main").find({
        $where: "this.enPart.length>1"
    }, (error, incoming) => {
        res.send(incoming)
    })
})
router.post("/learningMeme", (req, res) => {
    mongoose.model("Main").find({
        $where: "this.imageSrc!==undefined&&this.imageSrc!==false&&this.imageSrc!==null"
    }, (error, incoming) => {
        res.send(R.values(incoming))
    })
})
router.post("/orderSentence", (req, res) => {
    mongoose.model("Main").find({
        $where: "this.enPart!==undefined&&this.enPart.length>5"
    }, (error, incoming) => {
        res.send(incoming)
    })
})
router.post("/counter", (req, res) => {
    if (J.auth(req.ip)) {
        mongoose.model("Counter").find({}, (error, incoming) => {
            res.send(`${incoming[ 0 ].counter}`)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/remove/:model", (req, res) => {
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        mongoose.model(J.firstLetterCapital(req.params.model)).remove({
            _id: req.body._id * 1
        }, (error, incoming) => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/update/:model", (req, res) => {
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        let obj = {}
        obj[ req.body.key ] = req.body.value
        mongoose.model(J.firstLetterCapital(req.params.model)).findOneAndUpdate({
            id: req.body.id * 1
        }, obj, (error, incoming) => {
            J.lg(error, incoming)
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/updateBlog", (req, res) => {
    if (J.auth(req.ip)) {
        mongoose.model("Blog").findOneAndUpdate({
            canonical: req.body.canonical
        }, req.body, (error, data) => {
            if (error !== null) {
                J.log(error)
            }
            res.send(data)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/updateMany/:model", (req, res) => {
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        let obj = JSON.parse(req.body.obj)
        mongoose.model(J.firstLetterCapital(req.params.model))
            .findOneAndUpdate({
                id: req.body.id * 1
            }, obj, (error, incoming) => {
                res.send(incoming)
            })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/repair/:id", (req, res) => {
    if (J.auth(req.ip)) {
        let obj = {}
        obj.id = req.params.id
        obj[ req.body.key ] = req.body.keyValue
        db.findOneAndUpdateMain(obj).then(() => {
            res.send(J.config.goodQuery)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/readModel/:model", (req, res) => {
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        J.logger.debug(`model ${req.params.model} ip ${req.ip}`)
        let obj = {}
        obj[ req.body.key ] = req.body.keyValue
        mongoose.model(J.firstLetterCapital(req.params.model)).findOne(obj, (error, incoming) => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/readWholeModel/:model", (req, res) => {
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        J.logger.debug(`model ${req.params.model} ip ${req.ip}`)
        let obj = {}
        obj[ req.body.key ] = req.body.keyValue
        mongoose.model(J.firstLetterCapital(req.params.model)).find(obj, (error, incoming) => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/readRandom/:model", (req, res) => {
    if (J.auth(req.ip) && R.indexOf(req.params.model, J.config.models) !== -1) {
        db.random(J.firstLetterCapital(req.params.model)).then(incoming => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/imageless", (req, res) => {
    if (J.auth(req.ip)) {
        db.randomCondition().then(incoming => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/searchImage", (req, res) => {
    if (J.auth(req.ip)) {
        searchImage.imageFirst(req.body.searchImageKeyword).then(incoming => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/searchImageFast", (req, res) => {
    if (J.auth(req.ip)) {
        searchImage.imageFirst(req.body.searchImageKeyword).then(incoming => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/searchImage/socketio", (req, res) => {
    if (J.auth(req.ip)) {
        searchImage.imageFirst(req.body.searchImageKeyword, 15).then(incoming => {
            io.sockets.emit("searchImage", incoming)
            res.send(true)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/learningMemePublish", (req, res) => {
    if (J.auth(req.ip)) {
        learningMemePublish(req.body.data).then(data => {
            res.send(data)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/addMain", (req, res) => {
    if (J.auth(req.ip)) {
        if (J.isMainType(req.body)) {
            db.addMain(req.body).then(incoming => {
                res.send(incoming)
            })
        } else {
            res.send(J.config.incomleteRequest)
        }
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/removeMain", (req, res) => {
    if (J.auth(req.ip)) {
        mongoose.model("Main").remove({
            id: req.body.id * 1
        }, (error, incoming) => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/addTranslateDraft", (req, res) => {
    if (J.auth(req.ip)) {
        db.save("TranslateDraft", JSON.parse(req.body.stringified)).then(incoming => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/daemonRead", (req, res) => {
    if (J.auth(req.ip)) {
        db.load("Log", "id", "command").then(command => {
            db.load("Log", "id", "commandData").then(commandData => {
                res.send({
                    command,
                    commandData
                })
            })
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/daemonWrite", (req, res) => {
    if (J.auth(req.ip)) {
        db.findOneAndUpdateLog({
            id: "command",
            data: req.body.command
        }).then(() => {
            db.findOneAndUpdateLog({
                id: "commandData",
                data: req.body.command
            }).then(() => {
                res.send(J.config.goodQuery)
            })
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/removeBlog", (req, res) => {
    if (J.auth(req.ip)) {
        mongoose.model("Blog").remove({
            canonical: req.body.canonical
        }, (error, incoming) => {
            res.send(incoming)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/translateDraftGenerator", (req, res) => {
    if (J.auth(req.ip)) {
        res.send(J.config.goodQuery)
        J.willRunFixedCommand("node d translateDraft").then(data => {
            J.logger.debug(`translateDraftGenerator - ip ${req.ip}`)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/addBlog", (req, res) => {
    if (J.auth(req.ip)) {
        if (J.isBlogType(req.body)) {
            db.findOneAndUpdateBlog(req.body).then(data => {
                res.send(data)
            })
        } else {
            res.send(J.config.incomleteRequest)
        }
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/blogPosts", (req, res)=>{
    if (J.auth(req.ip)) {
        db.load("Blog").then(data => {
            res.send(data)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.post("/uploadImage/blog", (req, res)=>{
    J.log(req.body)
    if (J.auth(req.ip)) {
        uploadImage.blog(req.body).then(data=>{
            res.send(data)
        })
    } else {
        res.send(J.config.badQuery)
    }
})
router.get("/blog-*", (req, res)=>{
    let canonical = J.isBlogUrl(req.params[ 0 ])
    J.log(req.params[ 0 ])
    J.log(canonical)
    if (canonical) {
        db.load("Blog", "canonical", canonical).then(data => {
            if (data.length === 0) {
                res.send(J.config.badQuery)
            } else {
                res.render("blog", {
                    title: data[ 0 ].title,
                    content: data[ 0 ].content
                })
            }
        })
    } else {
        res.send(J.config.badQuery)
    }
})
module.exports = router
