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
                            _context.next = 19;
                            break;
                        }

                        J.box("5th time");
                        _context.next = 12;
                        return generateSitemap.main();

                    case 12:
                        state = _context.sent;
                        _context.next = 15;
                        return J.willRunFixedCommand("npm cache clean");

                    case 15:
                        state = _context.sent;
                        _context.next = 18;
                        return J.willRunFixedCommand("node d backup");

                    case 18:
                        state = _context.sent;

                    case 19:
                        if (!(counter % 50 === 0 && env.getEnv("hostTag") === "root")) {
                            _context.next = 24;
                            break;
                        }

                        J.box("50th time");
                        _context.next = 23;
                        return J.willRunFixedCommand("npm update -g");

                    case 23:
                        state = _context.sent;

                    case 24:
                        return _context.abrupt("return", state);

                    case 25:
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
        var token, state;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        token = J.randomSeed();
                        _context2.next = 3;
                        return J.postData(J.ils + "/gitHookTokenWrite", { token: token });

                    case 3:
                        state = _context2.sent;
                        _context2.next = 6;
                        return J.willRunFixedCommand("git add . --all");

                    case 6:
                        state = _context2.sent;
                        _context2.next = 9;
                        return J.willRunFixedCommand("git commit -m \"" + new Date().toGMTString() + "-" + token + "\"");

                    case 9:
                        state = _context2.sent;
                        _context2.next = 12;
                        return J.willRunFixedCommand("git push");

                    case 12:
                        state = _context2.sent;
                        return _context2.abrupt("return", state);

                    case 14:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
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
