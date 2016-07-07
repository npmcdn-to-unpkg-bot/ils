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
                            _context.next = 11;
                            break;
                        }

                        J.log("babelify");
                        J.log(commands.babelifyHapi);
                        _context.next = 7;
                        return willRunFixedCommand(commands.babelifyHapi);

                    case 7:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 11:
                        if (!filepath.includes("Mob.jsx")) {
                            _context.next = 24;
                            break;
                        }

                        J.log("babel babelify");
                        //testMob.jsx => testMob.js => public/testFront.js
                        J.log(commands.babel);
                        _context.next = 16;
                        return willRunFixedCommand(commands.babel);

                    case 16:
                        iMeanNothing = _context.sent;

                        J.log(commands.babelifyHapiMob);
                        _context.next = 20;
                        return willRunFixedCommand(commands.babelifyHapiMob);

                    case 20:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 24:
                        if (!(filepath.includes(".jsx") && (filepath.includes("services") || filepath.includes("hot")))) {
                            _context.next = 33;
                            break;
                        }

                        J.log("babelify");
                        J.log(commands.babelify);
                        _context.next = 29;
                        return willRunFixedCommand(commands.babelify);

                    case 29:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 33:
                        if (!(filepath.includes(".jsx") && filepath.includes("fth"))) {
                            _context.next = 41;
                            break;
                        }

                        J.log("babelify");
                        _context.next = 37;
                        return willRunFixedCommand(commands.babelify);

                    case 37:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 41:
                        if (!filepath.includes(".jsx")) {
                            _context.next = 49;
                            break;
                        }

                        J.log("lint react");
                        _context.next = 45;
                        return willRunFixedCommand(commands.lint);

                    case 45:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 49:
                        if (!filepath.includes("Pre.js")) {
                            _context.next = 60;
                            break;
                        }

                        J.log("babel lint");
                        _context.next = 53;
                        return willRunFixedCommand(commands.babel);

                    case 53:
                        iMeanNothing = _context.sent;
                        _context.next = 56;
                        return willRunFixedCommand(commands.lint);

                    case 56:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 60:
                        if (!filepath.includes(".less")) {
                            _context.next = 68;
                            break;
                        }

                        J.log("less");
                        _context.next = 64;
                        return willRunFixedCommand(commands.less);

                    case 64:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 68:
                        if (!(filepath.includes(".js") && !filepath.includes("Front"))) {
                            _context.next = 76;
                            break;
                        }

                        J.log("lint");
                        _context.next = 72;
                        return willRunFixedCommand(commands.lint);

                    case 72:
                        iMeanNothing = _context.sent;
                        return _context.abrupt("return", iMeanNothing);

                    case 76:
                        return _context.abrupt("return", false);

                    case 77:
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
    var srcMob = R.replace(".jsx", ".js", src);
    var output = R.replace(/(Pre\.js)|(\.jsx)/g, ".js", src);
    var outputCss = R.replace(".less", ".css", src);
    var local = output.split("/");
    var name = local[local.length - 1];
    var nameMob = R.replace("Mob.js", "Front.js", local[local.length - 1]);
    var hapiLocation = __dirname + "/hapi/public/" + name;
    var hapiMobLocation = __dirname + "/hapi/public/" + nameMob;
    var adminLocation = "admin/public/" + name;
    var presents = "-t [ babelify --presets [ react  es2015 stage-1 stage-3 stage-2 stage-0 ] ]";
    var eslintConfigOverkill = "--fix --debug --max-warnings 100 -o tmp/eslint.txt --no-ignore --cache --cache-location tmp --config";
    var eslintConfig = "--fix --max-warnings 500 --no-ignore --cache --cache-location tmp";
    willReturn.lintReact = "eslint " + src + " " + eslintConfig + " .eslintrcReact.json";
    willReturn.lint = "eslint " + src + " " + eslintConfig;
    willReturn.less = "lessc " + src + " " + outputCss;
    willReturn.ts = "tsc " + src;
    willReturn.babel = "babel " + src + " --out-file " + output;
    willReturn.babelify = "browserify " + src + " -o " + output + " " + presents;
    willReturn.babelifyHapi = "browserify " + src + " -o " + hapiLocation + " " + presents;
    willReturn.babelifyHapiMob = "browserify " + srcMob + " -o " + hapiMobLocation + " " + presents;
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
