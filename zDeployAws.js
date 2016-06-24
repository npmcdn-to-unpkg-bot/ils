"use strict"

var _regenerator = require("babel-runtime/regenerator")

var _regenerator2 = _interopRequireDefault(_regenerator)

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator")

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)

var mainAsync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var state
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2
                    return dbSync()

                case 2:
                    state = _context.sent
                    _context.next = 5
                    return J.willRunFixedCommand(commands[ 0 ])

                case 5:
                    state = _context.sent
                    _context.next = 8
                    return J.willRunFixedCommand(commands[ 1 ])

                case 8:
                    state = _context.sent
                    _context.next = 11
                    return J.willRunFixedCommand(commands[ 2 ])

                case 11:
                    state = _context.sent
                    _context.next = 14
                    return J.willRunFixedCommand(commands[ 3 ])

                case 14:
                    state = _context.sent
                    return _context.abrupt("return", state)

                case 16:
                case "end":
                    return _context.stop()
                }
            }
        }, _callee, this)
    }))
    return function mainAsync() {
        return ref.apply(this, arguments)
    }
}()

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

var J = require("./common")
var fs = require("fs-extra")
var commands = ["git pull", "git add . --all", "git commit -m update", "git push"]

function dbSync() {
    var options = { clobber: true }
    return new Promise(function (resolve) {
        fs.copy(__dirname + "/node_modules/proud-db/_db.json", __dirname + "/_inc/_dbAws.json", options, function () {
            resolve(true)
        })
    })
}

mainAsync().then(console.log)
