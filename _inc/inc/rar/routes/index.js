var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('guessTheWord');
});

router.get('/guess', function (req, res, next) {
    res.render('guessTheWordSecond');
});

router.get('/semantic', function (req, res, next) {
    res.render('semantic');
});

router.get('/order', function (req, res, next) {
    // var reqSession = req.session;
    res.render('order');
});

router.get('/orderWillBe', function (req, res, next) {
    // var reqSession = req.session;
    res.render('orderWillBe');
});
module.exports = router;
