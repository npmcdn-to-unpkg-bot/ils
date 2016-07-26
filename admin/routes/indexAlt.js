"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var willTranslate = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(word) {
        var translated;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return translate.deEn(word);

                    case 2:
                        translated = _context.sent;
                        return _context.abrupt("return", bringOrderTranslation.main(translated));

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
    return function willTranslate(_x) {
        return ref.apply(this, arguments);
    };
}();

var willUpdate = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(parent, data) {
        var iMeanNothing, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, val;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        iMeanNothing = void 0;
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
                        return proudDb.save(parent, "" + val.id, val);

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
    return function willUpdate(_x2, _x3) {
        return ref.apply(this, arguments);
    };
}();

var willAddDraft = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return proudDb.save("data", "" + data.id, data);

                    case 2:
                        return _context3.abrupt("return", _context3.sent);

                    case 3:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
    return function willAddDraft(_x4) {
        return ref.apply(this, arguments);
    };
}();

var willUpdateSingle = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return proudDb.save("data", "" + data.id, data);

                    case 2:
                        return _context4.abrupt("return", _context4.sent);

                    case 3:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
    return function willUpdateSingle(_x5) {
        return ref.apply(this, arguments);
    };
}();

var willAddEntry = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(parent, dataRaw) {
        var indexFuture, data, iMeanNothing;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return proudDb.loadParent("nextIndex");

                    case 2:
                        indexFuture = _context5.sent;
                        data = R.merge(dataRaw, { id: indexFuture });
                        _context5.next = 6;
                        return proudDb.saveParent("nextIndex", indexFuture + 1);

                    case 6:
                        iMeanNothing = _context5.sent;
                        _context5.next = 9;
                        return proudDb.save(parent, "" + data.id, data);

                    case 9:
                        iMeanNothing = _context5.sent;
                        return _context5.abrupt("return", iMeanNothing);

                    case 11:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
    return function willAddEntry(_x6, _x7) {
        return ref.apply(this, arguments);
    };
}();

var willBulkRemove = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(marker) {
        var dataState, predraftCategory, willRemoveIndexArr, dropByIndex, willChangeCategoryArr, iMeanNothing, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, removeMarker, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, updateValue;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return proudDb.loadParent("data");

                    case 2:
                        dataState = _context6.sent;
                        predraftCategory = getPredraftCategory(dataState);
                        willRemoveIndexArr = [];
                        dropByIndex = R.compose(R.values, R.map(R.set(R.lensProp("category"), "draft")), R.filter(function (val) {
                            if (R.lte(R.prop("id", val), marker)) {
                                if (R.prop("enPart", val).length > 0) {
                                    return true;
                                } else {
                                    willRemoveIndexArr.push(R.prop("id", val));
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        }));
                        willChangeCategoryArr = dropByIndex(predraftCategory);
                        iMeanNothing = void 0;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context6.prev = 11;
                        _iterator2 = willRemoveIndexArr[Symbol.iterator]();

                    case 13:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context6.next = 23;
                            break;
                        }

                        removeMarker = _step2.value;

                        J.log(removeMarker, "remove");
                        J.log(dataState[removeMarker]);
                        _context6.next = 19;
                        return proudDb.remove("data", "" + removeMarker);

                    case 19:
                        iMeanNothing = _context6.sent;

                    case 20:
                        _iteratorNormalCompletion2 = true;
                        _context6.next = 13;
                        break;

                    case 23:
                        _context6.next = 29;
                        break;

                    case 25:
                        _context6.prev = 25;
                        _context6.t0 = _context6["catch"](11);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context6.t0;

                    case 29:
                        _context6.prev = 29;
                        _context6.prev = 30;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 32:
                        _context6.prev = 32;

                        if (!_didIteratorError2) {
                            _context6.next = 35;
                            break;
                        }

                        throw _iteratorError2;

                    case 35:
                        return _context6.finish(32);

                    case 36:
                        return _context6.finish(29);

                    case 37:
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context6.prev = 40;
                        _iterator3 = willChangeCategoryArr[Symbol.iterator]();

                    case 42:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context6.next = 50;
                            break;
                        }

                        updateValue = _step3.value;
                        _context6.next = 46;
                        return proudDb.save("data", "" + updateValue.id, updateValue);

                    case 46:
                        iMeanNothing = _context6.sent;

                    case 47:
                        _iteratorNormalCompletion3 = true;
                        _context6.next = 42;
                        break;

                    case 50:
                        _context6.next = 56;
                        break;

                    case 52:
                        _context6.prev = 52;
                        _context6.t1 = _context6["catch"](40);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context6.t1;

                    case 56:
                        _context6.prev = 56;
                        _context6.prev = 57;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 59:
                        _context6.prev = 59;

                        if (!_didIteratorError3) {
                            _context6.next = 62;
                            break;
                        }

                        throw _iteratorError3;

                    case 62:
                        return _context6.finish(59);

                    case 63:
                        return _context6.finish(56);

                    case 64:
                        return _context6.abrupt("return", iMeanNothing);

                    case 65:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[11, 25, 29, 37], [30,, 32, 36], [40, 52, 56, 64], [57,, 59, 63]]);
    }));
    return function willBulkRemove(_x8) {
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
var searchImage = require("../_inc/searchImage");
var proudDb = require("../_inc/proud-db");
var dataFile = require("../../hapi/public/data.json");
var twoLevelUp = R.compose(R.join("/"), R.dropLast(2), R.split("/"));

var getPredraftCategory = R.compose(R.filter(function (val) {
    return R.prop("category", val) === "preDraft";
}));

function willPublish(keyword, content) {
    return new Promise(function (resolve) {
        fs.outputFile(twoLevelUp(__dirname) + "/hapi/blog/" + keyword + ".md", content, function () {
            resolve(true);
        });
    });
}
router.get("/", function (req, res) {
    res.render("index");
});
router.get("/db", function (req, res) {
    res.render("db");
});
router.get("/translateBulk", function (req, res) {
    res.render("translateBulk");
});
router.get("/learningMeme", function (req, res) {
    res.render("learningMeme");
});
router.get("/read/:parent", function (req, res) {
    proudDb.loadParent(req.params.parent).then(function (data) {
        res.send(data);
    });
});
router.get("/readDataFile/:parent", function (req, res) {
    J.log(1);
    res.send(dataFile[req.params.parent]);
});
router.post("/uploadImage", function (req, res) {
    uploadImage.main(req.body.imageUrl).then(function (incoming) {
        res.send(incoming);
    });
});
router.post("/update/:parent", function (req, res) {
    willUpdate(req.params.parent, JSON.parse(req.body.data)).then(function () {
        res.send("done");
    });
});
router.post("/newEntry", function (req, res) {
    willAddEntry("data", JSON.parse(req.body.data)).then(function (incoming) {
        J.log(incoming);
        res.send("done");
    });
});
router.post("/publish/:parent", function (req, res) {
    willAddEntry(req.params.parent, JSON.parse(req.body.data)).then(function () {
        res.send("done");
    });
});
router.post("/remove/:parent", function (req, res) {
    proudDb.remove(req.params.parent, JSON.parse(req.body.data).id * 1).then(function () {
        res.send("done");
    });
});
router.post("/updateSingle", function (req, res) {
    willUpdateSingle(JSON.parse(req.body.data).data).then(function () {
        res.send("done");
    });
});
router.post("/removeSingle", function (req, res) {
    proudDb.remove("data", JSON.parse(req.body.data).id).then(function () {
        res.send("done");
    });
});
router.post("/removeBulk", function (req, res) {
    willBulkRemove(JSON.parse(req.body.data).id * 1).then(function () {
        res.send("done");
    });
});
router.post("/blog", function (req, res) {
    willPublish(req.body.keyword, req.body.content).then(function () {
        res.send("was published");
    });
});
router.post("/searchImage", function (req, res) {
    var keyword = R.prop("searchImageKeyword", JSON.parse(req.body.data));
    searchImage.main(keyword).then(function (incoming) {
        res.send(incoming);
    });
});
router.post("/searchImageFirst", function (req, res) {
    var keyword = R.prop("searchImageKeyword", JSON.parse(req.body.data));
    searchImage.imageFirst(keyword).then(function (incoming) {
        res.send(incoming);
    });
});
router.post("/deEnShort", function (req, res) {
    var password = req.body.password;
    var word = req.body.word;
    J.log(word, "word");
    willTranslate(word).then(function (result) {
        res.send(result);
    });
});
router.post("/deEn", function (req, res) {
    var word = JSON.parse(req.body.data).word;
    J.log(word, "word");
    willTranslate(word).then(function (incoming) {
        res.send(incoming);
    });
});
router.get("/test", function (req, res) {
    res.send("more");
});
module.exports = router;
