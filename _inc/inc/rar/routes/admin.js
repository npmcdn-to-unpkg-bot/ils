
var express = require("express")
var router = express.Router()
// var mongoose = require('mongoose');
var request = require("request")
var bcrypt = require("bcrypt")
var EventEmitter = require("events").EventEmitter
var ee = new EventEmitter()
var Bing = require("node-bing-api")({accKey: "checkenv"})

router.get("/",function (req,res,next) {

    if(req.session.admin === true) {
        res.render("admin")
    } else{
        res.send("not logged")
    }
})

// router.get('/get/post/:id', function (req, res, next) {
router.post("/get/post/",function (req,res,next) {
    if(req.session.admin !== true) {
        res.send("not logged")
    }

    bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash("passhere",salt,function (err,hash) {
            ee.emit("passwordHash",hash)
        })
    })

    // var id = req.params.id;
    ee.on("passwordHash",function (password) {
        // passwordHash: password
        request.post({
            url: "http://localhost:3002/post/",
            form: req.body
                // form: {postTitle: 'rere', postContent: "trtr"}
        },
            function (error,response,body) {
                if(error) {
                    res.send(error)
                    console.log(error)
                } else{
                    res.send(body + response.statusCode)
                }
            })
    })

})

router.post("/get/bing/",function (req,res,next) {
    if(req.session.admin !== true) {
        res.send("not logged")
    }

    var query = req.body.query
    Bing.images(query,{
        top: 5,
        imagefilters: {
            size: "medium"
        }
    },function (error,resp,body) {
        var ss = body.d.results
        var end = []

        ss.map(function (val,key) {
            end.push(val[ "MediaUrl" ])
        })
        res.send(end)
    })

})

router.post("/get/german/",function (req,res,next) {
    if(req.session.admin !== true) {
        res.send("not logged")
    }

    var query = req.body.query
    res.send(query)
})

module.exports = router
