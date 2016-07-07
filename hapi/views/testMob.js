"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _reqwest = require("reqwest");

var _reqwest2 = _interopRequireDefault(_reqwest);

var _reactFlipMove = require("react-flip-move");

var _reactFlipMove2 = _interopRequireDefault(_reactFlipMove);

var _mobx = require("mobx");

var _mobxReact = require("mobx-react");

var _commonReact = require("./components/commonReact.js");

var _commonReact2 = _interopRequireDefault(_commonReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initOnce = _ramda2.default.once(function () {
    _commonReact2.default.emitter.emit("init");
});

var currentId = void 0;

var App = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(App, _Component);

    function App(props) {
        (0, _classCallCheck3.default)(this, App);

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(App).call(this, props));

        _this.state = {
            index: 0
        };
        //this.willHandleClick = this.willHandleClick.bind(this)
        //this.willHandleButton = this.willHandleButton.bind(this)
        return _this;
    }

    (0, _createClass3.default)(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { className: "box" },
                    "mo"
                )
            );
        }
    }]);
    return App;
}(_react.Component)) || _class;

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById("reactHook"));
