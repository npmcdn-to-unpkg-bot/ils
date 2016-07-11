"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var scrape = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(paginationArr) {
        var willReturn, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, paginationIndex;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        willReturn = [];
                        result = void 0;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 5;
                        _iterator = paginationArr[Symbol.iterator]();

                    case 7:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 18;
                            break;
                        }

                        paginationIndex = _step.value;

                        J.log(paginationIndex);
                        _context.next = 12;
                        return will(paginationIndex);

                    case 12:
                        result = _context.sent;

                        willReturn.push(result);
                        J.lg(result);

                    case 15:
                        _iteratorNormalCompletion = true;
                        _context.next = 7;
                        break;

                    case 18:
                        _context.next = 24;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context["catch"](5);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 24:
                        _context.prev = 24;
                        _context.prev = 25;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 27:
                        _context.prev = 27;

                        if (!_didIteratorError) {
                            _context.next = 30;
                            break;
                        }

                        throw _iteratorError;

                    case 30:
                        return _context.finish(27);

                    case 31:
                        return _context.finish(24);

                    case 32:
                        return _context.abrupt("return", willReturn);

                    case 33:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 20, 24, 32], [25,, 27, 31]]);
    }));
    return function scrape(_x) {
        return ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs-extra");
var scrapeIt = require("scrape-it");
var cheerio = require("cheerio");
var fetch = require("node-fetch");
var request = require("request");
var J = require("justdo");
var R = require("ramda");
var dbPath = "/home/just/ils/hapi/public/_db.json";
var dbPathRaw = "/home/just/ils/hapi/public/_dbRaw.json";
var removeLongSentences = R.compose(R.lt(R.__, 3), R.length, R.split("."));
var id = fs.readJsonSync(dbPath).nextIndex;
var willSave = {};
function will(pagination) {
    return new Promise(function (resolve) {
        fetch("http://www.gratis-spruch.de/sprueche/Zitate-Leben/kid/15/ukid/104/" + pagination).then(function (res) {
            if (res.status !== 200) {
                console.log("response code error");
                resolve(null);
            } else {
                return res.text();
            }
        }).then(function (data) {
            if (data) {
                (function () {
                    var $ = cheerio.load(data);
                    var willReturn = [];
                    var selector = "div.spruch a";
                    $(selector).each(function (i) {
                        var state = $(this).text().trim();
                        if (removeLongSentences(state) && state.length < 80 && state.length > 40) {
                            willSave[id] = {
                                dePart: state,
                                enPart: "",
                                category: "preDraft",
                                id: id
                            };
                            id++;
                        }
                    });
                    resolve(true);
                })();
            } else {
                resolve(null);
            }
        }).catch(function (error) {
            console.log(error);
            resolve(null);
        });
    });
}

scrape(R.range(2, 331)).then(function (data) {
    fs.writeJsonSync(dbPathRaw, { data: willSave });
});

//fs.readJson(dbPath, (err, dbState)=> {
//test(dbState.nextIndex).then((incoming)=>{
//dbState.data = R.merge(dbState.data, incoming.willReturn)
//dbState.nextIndex = incoming.id
