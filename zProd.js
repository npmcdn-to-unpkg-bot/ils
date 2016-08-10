"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var dbFn = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var iMeanNothing, counter;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        iMeanNothing = void 0;
                        counter = void 0;
                        _context.next = 4;
                        return db.loadParent("counter");

                    case 4:
                        iMeanNothing = _context.sent;

                        if (iMeanNothing === undefined) {
                            counter = 0;
                        } else {
                            counter = iMeanNothing + 1;
                        }
                        _context.next = 8;
                        return db.saveParent("counter", counter);

                    case 8:
                        iMeanNothing = _context.sent;

                        if (!(counter % 5 === 0 && env.getEnv("hostTag") === "root")) {
                            _context.next = 14;
                            break;
                        }

                        J.box("5th time");
                        _context.next = 13;
                        return generateSitemap.main();

                    case 13:
                        iMeanNothing = _context.sent;

                    case 14:
                        J.lg(iMeanNothing);
                        J.lg(counter);
                        return _context.abrupt("return", iMeanNothing);

                    case 17:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function dbFn() {
        return _ref.apply(this, arguments);
    };
}();

var main = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var awaited, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleCommand;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        awaited = void 0;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 4;
                        _iterator = commands[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 14;
                            break;
                        }

                        singleCommand = _step.value;
                        _context2.next = 10;
                        return J.willRunFixedCommand(singleCommand);

                    case 10:
                        awaited = _context2.sent;

                    case 11:
                        _iteratorNormalCompletion = true;
                        _context2.next = 6;
                        break;

                    case 14:
                        _context2.next = 20;
                        break;

                    case 16:
                        _context2.prev = 16;
                        _context2.t0 = _context2["catch"](4);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 20:
                        _context2.prev = 20;
                        _context2.prev = 21;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 23:
                        _context2.prev = 23;

                        if (!_didIteratorError) {
                            _context2.next = 26;
                            break;
                        }

                        throw _iteratorError;

                    case 26:
                        return _context2.finish(23);

                    case 27:
                        return _context2.finish(20);

                    case 28:
                        return _context2.abrupt("return", awaited);

                    case 29:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function main() {
        return _ref2.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("./common");
var db = require("proud-db");
var env = require("dotenv-helper");
var generateSitemap = require("./_inc/generateSitemap");
var commands = ["pm2 kill", "git pull", "pm2 start hapi/start.js -i max", "pm2 status"];

main().then(function (incoming) {
    J.log(incoming, "after main");
    dbFn().then(console.log);
});
