var _ = require('lodash');
scrape = require('scrape-url');
var test_en_rf = ['run', 'cat', 'here'];
var test_de_rf = ['rennen', 'ausgehen', 'morgen', 'tapfer'];


var testEmitter = function (x) {
    var base_url_rf = 'http://www.dict.cc/?s=' + x;
    return scrape(base_url_rf, 'var', function (error, matches) {

        return matches[1].html();
    });
};


var gender_function = function (word, callback) {
    base_url2_rf = 'http://www.dict.cc/?s=' + word;

    scrape(base_url2_rf, 'var', function (error, matches) {

        var s7s2 = _.find(matches, function (n, key) {
            return n.html() === '{n}' || n.html() === '{f}' || n.html() === '{m}';
        });

        if (typeof s7s2 === 'undefined') {
            callback('The word is not a noun!');
        } else {
            callback(s7s2.html());
        }
    });
};

module.exports.gender_function_rf = gender_function;
