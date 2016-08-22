"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var mainProcess = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(nvmVersion, prevNvmVersion) {
        var state;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        state = void 0;
                        _context.next = 3;
                        return J.willRunFixedCommand("nvm install v" + nvmVersion);

                    case 3:
                        state = _context.sent;

                        J.log(state);
                        _context.next = 7;
                        return J.willRunFixedCommand("nvm alias default " + nvmVersion);

                    case 7:
                        state = _context.sent;

                        J.log(state);
                        _context.next = 11;
                        return J.willRunFixedCommand("nvm install node --reinstall-packages-from=v" + prevNvmVersion);

                    case 11:
                        state = _context.sent;

                        J.log(state);
                        return _context.abrupt("return", state);

                    case 14:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function mainProcess(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("./common");

function main(nvmVersion, prevNvmVersion) {
    return mainProcess(nvmVersion, prevNvmVersion);
}
function alt(nvmVersion, prevNvmVersion) {
    return new Promise(function (resolve) {
        J.willRunFixedCommand("nvm install v" + nvmVersion).then(function () {
            J.willRunFixedCommand("nvm alias default " + nvmVersion).then(function () {
                J.willRunFixedCommand("nvm install node --reinstall-packages-from=v" + prevNvmVersion).then(function () {
                    resolve(true);
                });
            });
        });
    });
}
module.exports.main = main;
module.exports.alt = alt;
