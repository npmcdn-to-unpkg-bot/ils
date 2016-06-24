var express = require('express');
var router = express.Router();
var dbConn = require('../inc/dbConn.js')
var common = require('../inc/common.js')
var scrapingSaving = require('../inc/scrapingSaving.js')
var mongoose = require('mongoose');
var Firebase = require('firebase');
var firebaseURL = "https://justlog.firebaseio.com/"

router.get('/', function(req, res, next) {
    res.send("this is RESTful service. Use the API routes!")
})

router.post('/singleInstance', function(req, res, next) {
    if (common.permisionFn(req.body.user))
        var customId = req.body.customId === undefined ? new Date().getTime() : req.body.customId;
    var country = req.body.country;
    var urlValue = req.body.urlValue;

    dbConn.create({
        customId: customId,
        country: country,
        urlValue: urlValue
    }, 'singleInstance', function(error, data) {
        if (error) {
            res.send(JSON.stringify(error))
            console.log(error)
        }
        res.send(JSON.stringify(data))
    })
})


router.post('/startScraping', function(req, res, next) {
    if (common.permisionFn(req.body.user)) {
        scrapingSaving.main(function(err, data) {
            console.log('startScraping process done')
            res.sendStatus(200);
            res.send("scraped!");
        })
    }
    else {
        res.send(401)
    }
})

router.all('/deleteAll', function(req, res, next) {
    if (common.permisionFn(req.body.user, req.body.password)) {
        res.send('will delete')
        dbConn.deleteAll(function(err, data) {
            console.log(data === null)
        })
    }
    else {
        res.send(401)
    }
})

router.post('/read/:query', function(req, res, next) {
    var query = req.params.query
    if (common.permisionFn(req.body.user, req.body.password)) {
        var singleInstance = mongoose.model('singleInstance');
        var singleInstanceAsSearch = singleInstance.where({
            urlKey: query
        })

        singleInstanceAsSearch.findOne(function(err, data) {
            res.send(JSON.stringify(data))
        })
    }
    else {
        res.json(req.body)
    }


})

router.all('/readAll', function(req, res, next) {
    if (common.permisionFn(req.body.user, req.body.password)) {
        var singleInstance = mongoose.model('scrapeResults');
        singleInstance.find({}, function(error, data) {
            res.send(JSON.stringify(data))
        })
    }
    else {
        res.send(401)
    }
})

router.post('/delete', function(req, res, next) {
    var permisionFlag = common.permisionFn(req.body.user, req.body.password)
    if (permisionFlag) {
        var singleInstance = mongoose.model('singleInstance');
        singleInstance.remove(function(err, product) {
            res.send('deleted')
        })
    }
    else {
        res.send(401)
    }

})

module.exports = router;