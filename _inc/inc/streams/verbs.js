var scrape = require("scrape-url")
module.exports = {
    get: function (word,callback) {
        scrape("http://www.verbformen.net/conjugation/?i=stellen",["#ueberblick .v tr","#indikativaufzu .v tr"],function (error,matches,matchesSecond) {
            var willReturn = []

            matches.map(function(value,key) {
                if(key == 2 || key == 8) {
                    willReturn.push(value.text())
                }
                console.log(value.text())
            })
            matchesSecond.map(function(value,key) {
                if(key == 8 || key == 14) {
                    willReturn.push(value.text())
                }
            })
            callback(null,JSON.stringify(willReturn))
        })
    }
}