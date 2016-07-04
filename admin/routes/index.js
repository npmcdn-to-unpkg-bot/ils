"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var willTranslateAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(wordIn) {
        var state, translated, willSend;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return J.load("GermanOverall", wordIn);

                    case 2:
                        state = _context.sent;

                        if (!J.isEmpty(state)) {
                            _context.next = 17;
                            break;
                        }

                        _context.next = 6;
                        return translate.deEn(wordIn);

                    case 6:
                        translated = _context.sent;
                        willSend = bringOrderTranslation.main(translated);
                        _context.next = 10;
                        return J.save("GermanOverallRaw", wordIn, translated);

                    case 10:
                        willSend = _context.sent;
                        _context.next = 13;
                        return J.save("GermanOverall", wordIn, willSend);

                    case 13:
                        willSend = _context.sent;
                        return _context.abrupt("return", willSend);

                    case 17:
                        return _context.abrupt("return", state);

                    case 18:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
    return function willTranslateAsync(_x) {
        return ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();
var fs = require("fs-extra");
var R = require("ramda");
var envHelper = require("dotenv-helper");
var J = require("../../common.js");
var translate = require("../_inc/translate");
var bringOrderTranslation = require("../_inc/bringOrderTranslation");
var proudDb = require("../_inc/proud-db");

var twoLevelUp = R.compose(R.join("/"), R.dropLast(2), R.split("/"));

function willPublish(keyword, content) {
    return new Promise(function (resolve) {
        fs.outputFile(twoLevelUp(__dirname) + "/hapi/blog/" + keyword + ".md", content, function () {
            resolve(true);
        });
    });
}

function willTranslate(wordIn) {
    return willTranslateAsync(wordIn);
}

router.get("/", function (req, res) {
    res.send("index");
});

router.post("/test", function (req, res) {
    res.send(proudDb.loadParent("data"));
});

router.post("/blog", function (req, res) {
    if (req.ip.includes("127.0.0.1")) {
        willPublish(req.body.keyword, req.body.content).then(function () {
            res.send("was published");
        });
    } else {
        res.send("index");
    }
});

router.post("/read", function (req, res) {
    J.log(word, "word");
    var password = req.body.password;
    var word = req.body.word;
    if (password === envHelper.getEnv("passwordUbersetzung")) {
        J.loadParent("GermanOverall").then(function (result) {
            res.send(result);
        });
    } else {
        res.send(word);
    }
});

router.post("/readRaw", function (req, res) {
    J.log(word, "word");
    var password = req.body.password;
    var word = req.body.word;
    if (password === envHelper.getEnv("passwordUbersetzung")) {
        J.loadParent("GermanOverallRaw").then(function (result) {
            res.send(result);
        });
    } else {
        res.send(word);
    }
});

router.post("/detoen", function (req, res) {
    var password = req.body.password;
    var word = req.body.word;
    J.log(word, "word");
    if (password === envHelper.getEnv("passwordUbersetzung")) {
        willTranslate(word).then(function (result) {
            res.send(result);
        });
    } else {
        res.send(word);
    }
});

router.post("/catchDailyHook", function (req, res) {
    if (req.body.password === env.getEnv("mainPassword")) {
        //dailyTask.main()
        res.send("success");
    } else {
        res.send("fail");
    }
});

module.exports = router;
