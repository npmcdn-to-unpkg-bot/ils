"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var deployRootAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var awaited, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleCommand;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        awaited = void 0;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 4;
                        _iterator = rootCommands[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 14;
                            break;
                        }

                        singleCommand = _step.value;
                        _context.next = 10;
                        return J.willRunFixedCommand(singleCommand);

                    case 10:
                        awaited = _context.sent;

                    case 11:
                        _iteratorNormalCompletion = true;
                        _context.next = 6;
                        break;

                    case 14:
                        _context.next = 20;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context["catch"](4);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 20:
                        _context.prev = 20;
                        _context.prev = 21;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 23:
                        _context.prev = 23;

                        if (!_didIteratorError) {
                            _context.next = 26;
                            break;
                        }

                        throw _iteratorError;

                    case 26:
                        return _context.finish(23);

                    case 27:
                        return _context.finish(20);

                    case 28:
                        return _context.abrupt("return", awaited);

                    case 29:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 16, 20, 28], [21,, 23, 27]]);
    }));
    return function deployRootAsync() {
        return ref.apply(this, arguments);
    };
}();

var deployRoot = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt("return", deployRootAsync());

                    case 1:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
    return function deployRoot() {
        return ref.apply(this, arguments);
    };
}();

var deployAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var awaited, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, singleCommand;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        awaited = void 0;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context3.prev = 4;
                        _iterator2 = deployCommands[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context3.next = 14;
                            break;
                        }

                        singleCommand = _step2.value;
                        _context3.next = 10;
                        return J.willRunFixedCommand(singleCommand);

                    case 10:
                        awaited = _context3.sent;

                    case 11:
                        _iteratorNormalCompletion2 = true;
                        _context3.next = 6;
                        break;

                    case 14:
                        _context3.next = 20;
                        break;

                    case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3["catch"](4);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context3.t0;

                    case 20:
                        _context3.prev = 20;
                        _context3.prev = 21;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 23:
                        _context3.prev = 23;

                        if (!_didIteratorError2) {
                            _context3.next = 26;
                            break;
                        }

                        throw _iteratorError2;

                    case 26:
                        return _context3.finish(23);

                    case 27:
                        return _context3.finish(20);

                    case 28:
                        _context3.next = 30;
                        return sitemap();

                    case 30:
                        awaited = _context3.sent;
                        return _context3.abrupt("return", awaited);

                    case 32:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[4, 16, 20, 28], [21,, 23, 27]]);
    }));
    return function deployAsync() {
        return ref.apply(this, arguments);
    };
}();

var deploy = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        return _context4.abrupt("return", deployAsync());

                    case 1:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
    return function deploy() {
        return ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("../../common");
var generateSitemap = require("./generateSitemap");
var R = require("ramda");
var deployCommands = ["git pull", "npm run deploy"];
var rootCommands = ["git pull", "npm run de"];

function sitemap() {
    return new Promise(function (resolve) {
        generateSitemap.main().then(function () {
            J.saveLog("sitemap generated");
        });
    });
}

module.exports.deploy = deploy;
module.exports.deployRoot = deployRoot;
module.exports.sitemap = sitemap;
