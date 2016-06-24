var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');

/* GET users listing. */

router.get('/quiz/:id', function (req, res, next) {
    var id = req.params.id;
    res.send('logged'+id)
});

router.get('/', function (req, res, next) {
    var username = request.params.id;
    res.send('logg2ed'+username)
});



module.exports = router;
