var scrape = require("scrape-url")
var request = require("request")
var iconv = require("iconv-lite")
var cheerio = require("cheerio")
var R = require("ramda")

module.exports = {
    get: function (word,callback) {
        var regex = /\s/g
        var word_rf = word.replace(regex,"+")
        var url_rf = "http://www.linguee.de/deutsch-englisch/search?source=auto&query=" + word_rf
        request.get({
            uri: url_rf,
            encoding: null
        },
            function (err,resp,body) {
                var willReturn = []
                var bodyWithCorrectEncoding = iconv.decode(body,"iso-8859-15")
                $ = cheerio.load(bodyWithCorrectEncoding)
                var de_example_rf = $("tbody[class=examples] tr[id^=row] td[class=\"sentence left\"]").text().toString()
                var ss = de_example_rf.split("[...]")
                var filterArray = function(condition,array) {
                    var willReturn = []
                    array.map(function(value,key) {
                        if(condition(value)) {
                            willReturn.push(key)
                        }
                    })
                    return willReturn
                }

                var curriedFilterArray = R.curry(filterArray)
                var curriedFilterArrayFinal = curriedFilterArray(function(value) {
                    return(value.indexOf(word) > -1 && value.length < 110)
                })
                var neededKeys = curriedFilterArrayFinal(ss)
                R.forEach(function(value) {
                    willReturn.push(ss[ value ])
                },neededKeys)
                callback(null,[willReturn,[]])
            })

    }
}

