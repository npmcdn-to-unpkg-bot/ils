var request = require("request"),
    async = require("async"),
    R = require("ramda")
var apiAccess = "http://words.bighugelabs.com/api/2/bighugeenv/"
module.exports = {
    get: function (word,callback) {

        request(apiAccess + word.trim() + "/json",function (error,response,body) {
            if(!error && response.statusCode == 200) {
                var resultObject = JSON.parse(body)
                if(resultObject.verb) {
                    callback(null,resultObject.verb.syn)
                } else if(resultObject.noun) {
                    callback(null,JSON.parse(body).noun.syn)
                } else if(resultObject.adjective) {
                    callback(null,JSON.parse(body).adjective.syn)
                } else if(resultObject.adverb) {
                    callback(null,JSON.parse(body).adverb.syn)
                }
            } else{
                callback(error,"Error has occured!")
            }
        })
    },
    getAlternative: function (word,callback) {

        request(apiAccess + word.trim() + "/json",function (error,response,body) {
            if(!error && response.statusCode == 200) {
                var willSend = []
                var resultObject = JSON.parse(body)
                if(resultObject.noun) {
                    var justResultArr = JSON.parse(body).noun.syn
                    var resultArr = R.prepend(word,justResultArr)

                    resultArr.map(function(value) {
                        var just = /[^a-zöüßäA-Z]/g.exec(value)
                        if(just == null) {
                            willSend.push("the " + value)
                            var lastTwo = value[ value.length - 2 ] + value[ value.length - 1 ]
                            var last = value[ value.length - 1 ]
                            if(lastTwo == "ch" || lastTwo == "sh") {
                                willSend.push("the " + value + "es")
                            } else if(last == "y") {
                                willSend.push("the " + value.substring(0,value.length - 1) + "ies")
                            } else{
                                willSend.push("the " + value + "s")
                            }
                        }
                    })
                    // callback(null, JSON.stringify(willSend))
                    callback(null,willSend)
                } else{
                    callback(null,JSON.parse(body))
                }
            } else{
                callback(error,"Error has occured!")
            }
        })
    }
}
