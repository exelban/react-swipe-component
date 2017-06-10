"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swipe = function (_React$Component) {
    _inherits(Swipe, _React$Component);

    function Swipe() {
        _classCallCheck(this, Swipe);

        var _this = _possibleConstructorReturn(this, (Swipe.__proto__ || Object.getPrototypeOf(Swipe)).call(this));

        _this.state = {
            x: 0,
            y: 0,
            status: false,
            detected: false,
            delta: 50
        };
        _this.moveStart = _this._moveStart.bind(_this);
        _this.move = _this._move.bind(_this);
        _this.moveEnd = _this._moveEnd.bind(_this);
        return _this;
    }

    _createClass(Swipe, [{
        key: "render",
        value: function render() {
            var newProps = {
                onTouchStart: this.moveStart,
                onTouchMove: this.move,
                onTouchEnd: this.moveEnd,
                className: this.props.className || null,
                style: this.props.style || {},
                onTransitionEnd: this.props.onTransitionEnd,
                onMouseMove: this.props.mouseSwipe ? this.move : null,
                onMouseDown: this.props.mouseSwipe ? this.moveStart : null,
                onMouseUp: this.props.mouseSwipe ? this.moveEnd : null
            };
            return _react2.default.createElement(this.props.nodeName || 'div', newProps, this.props.children);
        }
    }, {
        key: "_moveStart",
        value: function _moveStart(e) {
            if (this.props.preventDefaultEvent) {
                e.preventDefault();
            }
            this.setState({
                x: parseFloat(e.clientX || e.touches[0].clientX).toFixed(2),
                y: parseFloat(e.clientY || e.touches[0].clientY).toFixed(2),
                status: true,
                detected: false
            });
        }
    }, {
        key: "_move",
        value: function _move(e) {
            if (this.state.status) {
                if (this.props.preventDefaultEvent) {
                    e.preventDefault();
                }
                var x = parseFloat(e.clientX || e.touches[0].clientX).toFixed(2),
                    y = parseFloat(e.clientY || e.touches[0].clientY).toFixed(2),
                    tX = parseFloat((x - this.state.x).toFixed(2)),
                    tY = parseFloat((y - this.state.y).toFixed(2));

                if (Math.abs(tX) > Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([tX, 0]);else if (Math.abs(tX) < Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([0, tY]);

                if (Math.abs(tX) >= this.props.delta) {
                    if (tX > this.props.delta) {
                        this.props.onSwipingRight(tX);
                    } else if (tX < -this.props.delta) {
                        this.props.onSwipingLeft(tX);
                    }
                } else if (Math.abs(tY) >= this.props.delta) {
                    if (tY > this.props.delta) {
                        this.props.onSwipingDown(tY);
                    } else if (tY < -this.props.delta) {
                        this.props.onSwipingUp(tY);
                    }
                }

                if (!this.state.detected) {
                    if (Math.abs(parseFloat(tX)) >= this.props.delta) {
                        if (parseFloat(tX) > this.props.delta) {
                            this.props.onSwipedRight(true);
                            this.setState({ detected: true });
                        } else if (parseFloat(tX) < -this.props.delta) {
                            this.props.onSwipedLeft(true);
                            this.setState({ detected: true });
                        }
                    } else if (Math.abs(parseFloat(tY)) >= this.props.delta) {
                        if (parseFloat(tY) > this.props.delta) {
                            this.props.onSwipedDown(true);
                            this.setState({ detected: true });
                        } else if (parseFloat(tY) < -this.props.delta) {
                            this.props.onSwipedUp(true);
                            this.setState({ detected: true });
                        }
                    }
                }
            }
        }
    }, {
        key: "_moveEnd",
        value: function _moveEnd(e) {
            if (this.props.preventDefaultEvent) {
                e.preventDefault();
            }
            this.setState({
                x: 0,
                y: 0,
                status: false,
                detected: false
            });
        }
    }]);

    return Swipe;
}(_react2.default.Component);

Swipe.defaultProps = {
    delta: 50,
    mouseSwipe: false,
    preventDefaultEvent: true,

    onSwipe: function onSwipe() {},
    onSwipingUp: function onSwipingUp() {},
    onSwipingRight: function onSwipingRight() {},
    onSwipingDown: function onSwipingDown() {},
    onSwipingLeft: function onSwipingLeft() {},
    onSwipedUp: function onSwipedUp() {},
    onSwipedRight: function onSwipedRight() {},
    onSwipedDown: function onSwipedDown() {},
    onSwipedLeft: function onSwipedLeft() {},
    onTransitionEnd: function onTransitionEnd() {}
};
Swipe.propTypes = {
    nodeName: _propTypes2.default.string,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,

    delta: _propTypes2.default.number,
    mouseSwipe: _propTypes2.default.bool,
    preventDefaultEvent: _propTypes2.default.bool,

    onSwipe: _propTypes2.default.func,
    onSwipingUp: _propTypes2.default.func,
    onSwipingRight: _propTypes2.default.func,
    onSwipingDown: _propTypes2.default.func,
    onSwipingLeft: _propTypes2.default.func,
    onSwipedUp: _propTypes2.default.func,
    onSwipedRight: _propTypes2.default.func,
    onSwipedDown: _propTypes2.default.func,
    onSwipedLeft: _propTypes2.default.func,
    onTransitionEnd: _propTypes2.default.func
};

exports.default = Swipe;