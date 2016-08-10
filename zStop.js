"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var shadowProcess = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var state, counter;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        state = void 0;
                        _context.next = 3;
                        return db.loadParent("counter");

                    case 3:
                        state = _context.sent;
                        counter = state === undefined ? counter = 0 : state + 1;
                        _context.next = 7;
                        return db.saveParent("counter", counter);

                    case 7:
                        state = _context.sent;

                        if (!(counter % 5 === 0 && env.getEnv("hostTag") === "root")) {
                            _context.next = 13;
                            break;
                        }

                        J.box("5th time");
                        _context.next = 12;
                        return generateSitemap.main();

                    case 12:
                        state = _context.sent;

                    case 13:
                        return _context.abrupt("return", state);

                    case 14:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function shadowProcess() {
        return _ref.apply(this, arguments);
    };
}();

var mainProcess = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var state, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleCommand;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        state = void 0;
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
                        state = _context2.sent;

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
                        return _context2.abrupt("return", state);

                    case 29:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function mainProcess() {
        return _ref2.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("./common");
var db = require("proud-db");
var env = require("dotenv-helper");
var generateSitemap = require("./_inc/generateSitemap");
var commands = ["git add . --all", "git commit -m \"" + new Date().toGMTString() + "\"", "git push"];

mainProcess().then(function (incoming) {
    shadowProcess().then(console.log);
});