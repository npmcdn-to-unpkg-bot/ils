"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var mainProcess = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(nvmVersion) {
        var token, state;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = J.randomSeed();
                        _context.next = 3;
                        return J.willRunFixedCommand("nvm install v" + nvmVersion);

                    case 3:
                        state = _context.sent;
                        _context.next = 6;
                        return J.willRunFixedCommand("nvm alias default " + nvmVersion);

                    case 6:
                        state = _context.sent;
                        _context.next = 9;
                        return J.willRunFixedCommand("nvm install node --reinstall-packages-from=v" + nvmVersion);

                    case 9:
                        state = _context.sent;
                        return _context.abrupt("return", state);

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function mainProcess(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("./common");

function main(nvmVersion) {
    return mainProcess(nvmVersion);
}
function alt(nvmVersion) {
    return new Promise(function (resolve) {
        mainProcess(nvmVersion).then(function (data) {
            resolve(data);
        });
    });
}
module.exports.main = main;
module.exports.alt = alt;
