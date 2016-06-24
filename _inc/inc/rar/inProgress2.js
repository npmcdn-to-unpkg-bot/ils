var searching = require('searching')

module.exports = {
    get: function (word, callback) {
        searching.word(word, 20, 'inc/rar/all.txt', '', function (data) {
            var willReturn = []
            data.map(function (value) {
                if (value.length < 120) {
                    willReturn.push(value)
                }
            })
            callback(null, willReturn)
        })
    },
    getAlternative: function (word, callback) {
        searching.wordAlternative(word, 20, 'inc/rar/all.txt', '', function (data) {
            var willReturn = []
            data.map(function (value) {
                if (value.length < 120) {
                    willReturn.push(value)
                }
            })
            callback(null, willReturn)
        })
    }
}