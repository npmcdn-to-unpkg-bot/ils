var searching = require("searching")

module.exports = {
    get: function (word,callback) {
        console.log(word,55)
        searching.word(word,20,"inc/rar/all.txt","",function (data) {
            console.log(data)
            callback(null,data)
        })
    },
    getAlternative: function (word,callback) {
        searching.wordAlternative(word,20,"inc/rar/all.txt","",function (data) {

            callback(null,data)
        })
    }
}
