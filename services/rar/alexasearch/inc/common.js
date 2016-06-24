"use strict"
var reqwest = require('reqwest')
var moment = require('moment')
var Firebase = require('firebase')
var mongoose = require('mongoose')
var FirebaseTokenGenerator = require('firebase-token-generator')
var fbRefUrl = "https://justlog.firebaseio.com"
var logUrl = `${fbRefUrl}/alexa/logging`
var dataUrl = "https://justlog.firebaseio.com/alexa/data"
var zapierUrl = "https://zapier.com/hooks/catch/----/"
var zapierPublishToFirebaseUrl = "https://zapier.com/hooks/catch/----/"
var homeUrl = "https://nodejs5-peeping4dsun.c9users.io/"

module.exports = {
    //JUST
    just: function() {
        console.log(1)
    },
    testHandler: function() {
        var whichFn = Array.prototype.slice.call(arguments, 0)
        var args = Array.prototype.slice.call(arguments, 1)
        this[whichFn[0]].call(this, ...args)
    },
    //ADMINS
    admin: "rootIs",
    password: "7fdifdskhg99A",
    permisionFn: function(user, password){
        return user===this.admin&&password===this.password
    },
    //DB 
    create: function(inputObj, modelName, callback) {
        var modelHolder = mongoose.model(modelName);
        modelHolder.create(inputObj, function(error, data) {
            if (error) {
                callback(error, null);
                console.error('after callback!')
            }
            callback(null, data);
            console.log('Model name: ', modelName, ' succeeded');
        })
    },
    createSingle: function(inputObj, callback) {
        this.create(inputObj, "singleInstance", function() {
            callback()
        })
    },
    create: function(inputObj, callback) {
        this.create(inputObj, "singleInstance", function() {
            callback()
        })
    },
    deleteAll: function(callback) {
        var modelHolder = mongoose.model('singleInstance');
        modelHolder.remove({}, function(error) {
            if (error) {
                callback(error, null);
                console.error('after callback!')
            }
            callback(null, null);
        })
    },
    //REQUESTS
    getting: function(url, callback) {
        reqwest({
            url: url,
            method: 'post',
            success: function(resp) {
                callback(resp)
            }
        })
    },
    posting: function(url, data, callback) {
        reqwest({
            url: url,
            method: 'post',
            data: data,
            success: function(resp) {
                callback(resp)
            }
        })
    },
    savingToFirebase: function(fbRefName, objReady, callback) {
        var fbRef = new Firebase(fbRefName)
        var tokenGenerator = new FirebaseTokenGenerator("---")
        var veryFarInFuture = Date.now() + 8e+14
        var token = tokenGenerator.createToken({
            uid: "1",
            isAllowed: true,
            expires: veryFarInFuture
        })
        fbRef.authWithCustomToken(token, function(error, authData) {
            fbRef.update(objReady)
            callback()
        })
    },
    //LOGGING
    getTimestamp: function() {
        return moment().format("DD-MM-YY-hh-mm-ss")
    },
    logging: function(source, msg, callback) {
        var timestamp = this.getTimestamp()
        let obj = {}
        obj[timestamp] = {
            source: source,
            msg: msg
        }
        this.savingToFirebase(logUrl, obj, function() {
            callback()
        })
    },
    savingCurrentVersion: function(obj, callback) {
        this.savingToFirebase(dataUrl, obj, function() {
            callback()
        })
    },
    postingToZapier: function(message, callback) {
        this.posting({
            msg: message,
            timestamp: this.getTimestamp()
        })
    }
}