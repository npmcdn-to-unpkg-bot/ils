"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var processFn = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filepath) {
        var iMeanNothing, commands;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        iMeanNothing = void 0;
                        commands = factoryCommands(filepath);

                        if (!filepath.includes("Front.jsx")) {
                            _context.next = 10;
                            break;
                        }

                        J.log("babelify");
                        _context.next = 6;
                        return willRunFixedCommand(commands.babelifyHapi);

                    case 6:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 10:
                        if (!(filepath.includes(".jsx") && (filepath.includes("services") || filepath.includes("hot")))) {
                            _context.next = 18;
                            break;
                        }

                        J.log("babelify");
                        _context.next = 14;
                        return willRunFixedCommand(commands.babelify);

                    case 14:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 18:
                        if (!(filepath.includes(".jsx") && filepath.includes("fth"))) {
                            _context.next = 26;
                            break;
                        }

                        J.log("babelify");
                        _context.next = 22;
                        return willRunFixedCommand(commands.babelify);

                    case 22:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 26:
                        if (!filepath.includes(".jsx")) {
                            _context.next = 34;
                            break;
                        }

                        J.log("lint react");
                        _context.next = 30;
                        return willRunFixedCommand(commands.lint);

                    case 30:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 34:
                        if (!filepath.includes("Pre.js")) {
                            _context.next = 45;
                            break;
                        }

                        J.log("babel lint");
                        _context.next = 38;
                        return willRunFixedCommand(commands.babel);

                    case 38:
                        iMeanNothing = _context.sent;
                        _context.next = 41;
                        return willRunFixedCommand(commands.lint);

                    case 41:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 45:
                        if (!filepath.includes(".less")) {
                            _context.next = 53;
                            break;
                        }

                        J.log("less");
                        _context.next = 49;
                        return willRunFixedCommand(commands.less);

                    case 49:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 53:
                        if (!filepath.includes(".js")) {
                            _context.next = 61;
                            break;
                        }

                        J.log("lint");
                        _context.next = 57;
                        return willRunFixedCommand(commands.lint);

                    case 57:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 61:
                        return _context.abrupt("return", false);

                    case 62:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
    return function processFn(_x) {
        return ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var J = require("./common.js");
var sane = require("sane");
var R = require("ramda");
var exec = require("child_process").exec;

var mainFlag = true;
var negativeWordArr = ["node_modules", "eslint", ".log", "git", ".json", "App.js", "cache"];

var filterFn = J.anyFn(negativeWordArr);

var watcher = sane(__dirname, {
    glob: ["**/*.jsx", "**/*.js", "*.less", "!node_modules/**/*", "!tmp/**/*"],
    poll: true,
    watchman: false,
    dot: false
});

watcher.on("ready", function () {
    J.log("ready to watch");
});

watcher.on("change", function (filepath, root, stat) {

    var canProceedFlag = filterFn(function (negativeWord) {
        return filepath.includes(negativeWord);
    });
    if (canProceedFlag) {
        return null;
    } else {
        if (mainFlag === true) {
            mainFlag = false;
            J.box("⚡⚡⚡  " + J.takeName(filepath) + " Will Start  ⚡⚡⚡");
            processFn(filepath).then(function (incoming) {
                setTimeout(function () {
                    mainFlag = true;
                }, 500);
                J.log("💡💡💡  " + J.takeName(filepath) + " Is Over  💡💡💡");
            });
        }
    }
});

watcher.on("add", function (filepath, root, stat) {

    var canProceedFlag = filterFn(function (negativeWord) {
        return filepath.includes(negativeWord);
    });
    if (canProceedFlag) {
        return null;
    } else {
        if (mainFlag === true) {
            mainFlag = false;
            J.box("⚡⚡⚡  " + J.takeName(filepath) + " Will Start  ⚡⚡⚡");
            processFn(filepath).then(function (incoming) {
                setTimeout(function () {
                    mainFlag = true;
                }, 500);
                J.log("💡💡💡  " + J.takeName(filepath) + " Is Over  💡💡💡");
            });
        }
    }
});

function factoryCommands(src) {
    var willReturn = {};
    var output = R.replace(/(Pre\.js)|(\.jsx)/g, ".js", src);
    var outputCss = R.replace(".less", ".css", src);
    var local = output.split("/");
    var name = local[local.length - 1];
    var hapiLocation = __dirname + "/hapi/public/" + name;
    var adminLocation = "admin/public/" + name;
    var presents = "-t [ babelify --presets [ es2015 react stage-3 stage-2 stage-1 stage-0 ] ]";
    var eslintConfigOverkill = "--fix --debug --max-warnings 100 -o tmp/eslint.txt --no-ignore --cache --cache-location tmp --config";
    var eslintConfig = "--fix --max-warnings 500 --no-ignore --cache --cache-location tmp";
    willReturn.lintReact = "eslint " + src + " " + eslintConfig + " .eslintrcReact.json";
    willReturn.lint = "eslint " + src + " " + eslintConfig;
    willReturn.less = "lessc " + src + " " + outputCss;
    willReturn.babel = "babel " + src + " --out-file " + output;
    willReturn.babelify = "browserify " + src + " -o " + output + " " + presents;
    willReturn.babelifyHapi = "browserify " + src + " -o " + hapiLocation + " " + presents;
    willReturn.babelifyAdmin = "browserify " + src + " -o " + adminLocation + " " + presents;
    return willReturn;
}

function willRunFixedCommand(commandIs) {
    return new Promise(function (resolve) {
        var proc = exec(commandIs);
        proc.stdout.on("data", function (chunk) {
            console.log(chunk.toString());
        });
        proc.stdout.on("error", function (error) {
            console.error(error);
        });
        proc.stdout.on("end", function () {
            resolve(true);
        });
        proc.stdout.on("error", function (error) {
            console.error(error);
            resolve(error);
        });
    });
}
