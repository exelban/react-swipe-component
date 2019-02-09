var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
var isTouchEvent = function (event) {
    if (window.TouchEvent !== undefined) {
        return event instanceof TouchEvent;
    }
    return event.touches !== undefined;
};
var Swipe = (function (_super) {
    __extends(Swipe, _super);
    function Swipe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.store = {
            x: 0,
            y: 0,
            status: false,
            detected: false,
            delta: 50,
        };
        _this.prepare = function (e) {
            if (_this.props.preventDefault)
                e.preventDefault();
            if (_this.props.stopPropagation)
                e.stopPropagation();
            return e.nativeEvent;
        };
        _this.moveStart = function (e) {
            var x = 0;
            var y = 0;
            var touches = e.touches;
            if (e instanceof MouseEvent) {
                x = e.clientX;
                y = e.clientY;
            }
            if (isTouchEvent(e) && touches) {
                if (!touches[0]) {
                    throw new Error('touch is not find');
                }
                x = touches[0].clientX;
                y = touches[0].clientY;
            }
            _this.store.x = parseFloat(x.toFixed(2));
            _this.store.y = parseFloat(y.toFixed(2));
            _this.store.status = true;
            _this.store.detected = false;
        };
        _this.move = function (e) {
            if (!_this.store.status)
                return;
            var x = 0;
            var y = 0;
            var touches = e.touches;
            if (e instanceof MouseEvent) {
                x = e.clientX;
                y = e.clientY;
            }
            if (isTouchEvent(event) && touches) {
                if (!touches[0]) {
                    throw new Error('touch is not find');
                }
                x = touches[0].clientX;
                y = touches[0].clientY;
            }
            x = parseFloat(x.toFixed(2));
            y = parseFloat(y.toFixed(2));
            var tX = parseFloat((x - _this.store.x).toFixed(2));
            var tY = parseFloat((y - _this.store.y).toFixed(2));
            if (_this.props.onSwipe) {
                _this.props.onSwipe({ x: tX, y: tY });
            }
            if (Math.abs(tX) >= _this.props.delta) {
                if (tX > _this.props.delta) {
                    _this.props.onSwipingRight(tX);
                }
                else if (tX < -_this.props.delta) {
                    _this.props.onSwipingLeft(tX);
                }
            }
            else if (Math.abs(tY) >= _this.props.delta) {
                if (tY > _this.props.delta) {
                    _this.props.onSwipingDown(tY);
                }
                else if (tY < -_this.props.delta) {
                    _this.props.onSwipingUp(tY);
                }
            }
            if (!_this.store.detected) {
                if (Math.abs(tX) >= _this.props.delta) {
                    if (tX > _this.props.delta) {
                        _this.props.onSwipedRight();
                        _this.store.detected = true;
                    }
                    else if (tX < -_this.props.delta) {
                        _this.props.onSwipedLeft();
                        _this.store.detected = true;
                    }
                }
                else if (Math.abs(tY) >= _this.props.delta) {
                    if (tY > _this.props.delta) {
                        _this.props.onSwipedDown();
                        _this.store.detected = true;
                    }
                    else if (tY < -_this.props.delta) {
                        _this.props.onSwipedUp();
                        _this.store.detected = true;
                    }
                }
            }
        };
        _this.moveEnd = function () {
            _this.store.x = 0;
            _this.store.y = 0;
            _this.store.status = false;
            _this.store.detected = false;
            _this.props.onSwipeEnd();
        };
        return _this;
    }
    Swipe.prototype.render = function () {
        var _this = this;
        var start = function (e) {
            var event = _this.prepare(e);
            _this.moveStart(event);
        };
        var move = function (e) {
            var event = _this.prepare(e);
            _this.move(event);
        };
        var end = function (e) {
            _this.prepare(e);
            _this.moveEnd();
        };
        var newProps = {
            className: this.props.className || undefined,
            style: this.props.style || {},
            onTouchStart: this.props.detectTouch ? start : function (_) { },
            onTouchMove: this.props.detectTouch ? move : function (_) { },
            onTouchEnd: this.props.detectTouch ? end : function (_) { },
            onMouseDown: this.props.detectMouse ? start : function (_) { },
            onMouseMove: this.props.detectMouse ? move : function (_) { },
            onMouseUp: this.props.detectMouse ? end : function (_) { },
            onTransitionEnd: this.props.onTransitionEnd,
        };
        if (newProps.style !== undefined) {
            newProps.style.touchAction = 'none';
        }
        var elementType = this.props.nodeName || this.props.node || 'div';
        return React.createElement(elementType, newProps, this.props.children);
    };
    Swipe.defaultProps = {
        delta: 50,
        detectMouse: true,
        detectTouch: false,
        preventDefault: false,
        stopPropagation: false,
        onSwipe: function (p) { },
        onSwipingLeft: function (x) { },
        onSwipingRight: function (x) { },
        onSwipingUp: function (y) { },
        onSwipingDown: function (y) { },
        onSwipedLeft: function () { },
        onSwipedRight: function () { },
        onSwipedUp: function () { },
        onSwipedDown: function () { },
        onSwipeEnd: function () { },
        onTransitionEnd: function () { }
    };
    return Swipe;
}(React.Component));
export { Swipe };
