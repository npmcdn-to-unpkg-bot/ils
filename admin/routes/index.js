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

var willUpdateDb = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(parent, data) {
        var iMeanNothing, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, val;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        iMeanNothing = void 0;
                        //R.values(data).map((val)=>{
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 4;
                        _iterator = data[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 15;
                            break;
                        }

                        val = _step.value;
                        _context2.next = 10;
                        return proudDb.save(parent, "" + val.id, val, true);

                    case 10:
                        iMeanNothing = _context2.sent;

                        J.log(iMeanNothing);

                    case 12:
                        _iteratorNormalCompletion = true;
                        _context2.next = 6;
                        break;

                    case 15:
                        _context2.next = 21;
                        break;

                    case 17:
                        _context2.prev = 17;
                        _context2.t0 = _context2["catch"](4);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 21:
                        _context2.prev = 21;
                        _context2.prev = 22;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 24:
                        _context2.prev = 24;

                        if (!_didIteratorError) {
                            _context2.next = 27;
                            break;
                        }

                        throw _iteratorError;

                    case 27:
                        return _context2.finish(24);

                    case 28:
                        return _context2.finish(21);

                    case 29:
                        return _context2.abrupt("return", iMeanNothing);

                    case 30:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 17, 21, 29], [22,, 24, 28]]);
    }));
    return function willUpdateDb(_x2, _x3) {
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
    res.send("more");
});

router.get("/read/:parent", function (req, res) {
    proudDb.loadParent(req.params.parent).then(function (data) {
        res.send(data);
    });
});

router.post("/update/:parent", function (req, res) {
    willUpdateDb(req.params.parent, R.values(JSON.parse(req.body.data))).then(function () {
        res.send("done");
    });
});

router.post("/blog", function (req, res) {
    willPublish(req.body.keyword, req.body.content).then(function () {
        res.send("was published");
    });
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
        res.send("success");
    } else {
        res.send("fail");
    }
});

module.exports = router;
