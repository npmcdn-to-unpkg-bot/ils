"use strict";
//const argv = require("minimist")(process.argv.slice(2))

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var npmGlobalUpdate = function () {
	var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
		var willReturn, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleDependency, state;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						willReturn = [];
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 4;
						_iterator = dependenciesArr[Symbol.iterator]();

					case 6:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 16;
							break;
						}

						singleDependency = _step.value;

						console.log(singleDependency);
						_context.next = 11;
						return willRunFixedCommand("npm install -g " + singleDependency);

					case 11:
						state = _context.sent;

						willReturn.push(state);

					case 13:
						_iteratorNormalCompletion = true;
						_context.next = 6;
						break;

					case 16:
						_context.next = 22;
						break;

					case 18:
						_context.prev = 18;
						_context.t0 = _context["catch"](4);
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
						return _context.abrupt("return", willReturn);

					case 31:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[4, 18, 22, 30], [23,, 25, 29]]);
	}));
	return function npmGlobalUpdate() {
		return ref.apply(this, arguments);
	};
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dotenvHelper = require("dotenv-helper");
var exec = require("child_process").exec;

var dependenciesArr = dotenvHelper.getEnv("npmGlobal");

if (dependenciesArr.splice === undefined) {
	process.exit(1);
}

npmGlobalUpdate().then(console.log);

function willRunFixedCommand(commandIs) {
	return new Promise(function (resolve, reject) {
		var proc = exec(commandIs, {
			"cwd": __dirname
		});
		proc.stdout.on("data", function (chunk) {
			console.log(chunk);
		});
		proc.stdout.on("error", function (error) {
			console.error(error);
		});
		proc.stdout.on("end", function () {
			resolve(true);
		});
		proc.stdout.on("error", function (error) {
			console.error(error);
			reject(error);
		});
	});
}
