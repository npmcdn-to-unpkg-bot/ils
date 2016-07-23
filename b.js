"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(arr) {
        var willSave, willLog, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, val;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        willSave = void 0;
                        willLog = void 0;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 5;
                        _iterator = arr[Symbol.iterator]();

                    case 7:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 16;
                            break;
                        }

                        val = _step.value;
                        _context.next = 11;
                        return translate.deEnTimer(val);

                    case 11:
                        willSave = _context.sent;

                        fs.writeJsonSync(val + ".json", { data: scrapedParse.main(willSave) });

                    case 13:
                        _iteratorNormalCompletion = true;
                        _context.next = 7;
                        break;

                    case 16:
                        _context.next = 22;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t0 = _context["catch"](5);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 22:
                        _context.prev = 22;
                        _context.prev = 23;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 25:
                        _context.prev = 25;

                        if (!_didIteratorError) {
                            _context.next = 28;
                            break;
                        }

                        throw _iteratorError;

                    case 28:
                        return _context.finish(25);

                    case 29:
                        return _context.finish(22);

                    case 30:
                        return _context.abrupt("return", willSave);

                    case 31:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 18, 22, 30], [23,, 25, 29]]);
    }));
    return function main(_x) {
        return ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("./common");
var R = require("ramda");
var fs = require("fs-extra");
var db = require("proud-db");
var translate = require("./admin/_inc/translate.js");
var scrapedParse = require("./_inc/scrapedParse");
//let words = require("./words")
var words = ["mehr", "schuld"];

function promised(str) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(str + " == ");
        }, 1000);
    });
}
main(words).then(J.log);
//translate.deEnTimer("wenig").then(incoming=>{
//fs.writeJsonSync("temp.json", {data: incoming})
//})

//translate.deEn("wenig").then(incoming=>{
//db.saveParent("test",incoming).then(J.lg)
//fs.writeJsonSync("temp.json", {data: incoming})
//})
