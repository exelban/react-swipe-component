var React = require('react');

var Swipe = React.createClass({
    displayName: 'Swipe',
    propTypes: {
        nodeName: React.PropTypes.string,
        onSwipingUp: React.PropTypes.func,
        onSwipingRight: React.PropTypes.func,
        onSwipingDown: React.PropTypes.func,
        onSwipingLeft: React.PropTypes.func,
        onSwipedUp: React.PropTypes.func,
        onSwipedRight: React.PropTypes.func,
        onSwipedDown: React.PropTypes.func,
        onSwipedLeft: React.PropTypes.func,
        delta: React.PropTypes.number,
        preventDefaultEvent: React.PropTypes.bool,
        style: React.PropTypes.object
    },
    getInitialState: function() {
        return {
            x: 0,
            y: 0,
            status: false,
            detected: false,
            delta: 50,
            preventDefaultEvent: false
        };
    },
    render: function() {
        var newProps = {
            onTouchStart: this._touchStart,
            onTouchMove: this._touchMove,
            onTouchEnd: this._touchEnd,
            className: this.props.className || "",
            style: this.props.style || {}
        };
        return React.createElement(this.props.nodeName || "div", newProps, this.props.children);
    },
    _touchStart: function (e) {
        if(this.props.preventDefaultEvent && this.props.preventDefaultEvent!=this.state.preventDefaultEvent) this.setState({preventDefaultEvent: this.props.preventDefaultEvent});
        if(this.props.delta && this.props.delta!=this.state.delta) this.setState({delta: this.props.delta});

        this.setState({
            x: Math.abs(e.touches[0].pageX).toFixed(2),
            y: Math.abs(e.touches[0].pageY).toFixed(2),
            status: true,
            detected: false
        });
        if(this.state.preventDefaultEvent) e.preventDefault();
    },
    _touchMove: function (e) {
        if (e.touches.length > 1) {
            return
        }

        var x = (e.touches[0].pageX).toFixed(2);
        var y = (e.touches[0].pageY).toFixed(2);
        var tX = (x - this.state.x).toFixed(2);
        var tY = (y - this.state.y).toFixed(2);


        if(Math.abs(tX)>=this.state.delta){
            if(tX>50){
                if(this && this.props && this.props.onSwipingRight) this.props.onSwipingRight(true);
                if(this && this.props && this.props.right) this.props.right(true);
            }
            else if(tX<(-this.state.delta)){
                if(this && this.props && this.props.onSwipingLeft) this.props.onSwipingLeft(true);
                if(this && this.props && this.props.left) this.props.left(true);
            }
        }
        else{
            if(Math.abs(tY)>=this.state.delta){
                if(tY>50){
                    if(this && this.props && this.props.onSwipingDown) this.props.onSwipingDown(true);
                }
                else if(tY<(-this.state.delta)){
                    if(this && this.props && this.props.onSwipingUp) this.props.onSwipingUp(true);
                    if(this && this.props && this.props.up) this.props.up(true);
                }
            }
        }

        if(!this.state.detected){
            if(Math.abs(parseFloat(tX))>=this.state.delta){
                if(parseFloat(tX)>50){
                    if(this && this.props && this.props.onSwipedRight) this.props.onSwipedRight(true);
                    this.setState({detected: true});
                }
                else if(parseFloat(tX)<(-this.state.delta)){
                    if(this && this.props && this.props.onSwipedLeft) this.props.onSwipedLeft(true);
                    this.setState({detected: true});
                }
            }
            else{
                if(Math.abs(parseFloat(tY))>=this.state.delta){
                    if(parseFloat(tY)>50){
                        if(this && this.props && this.props.onSwipedDown) this.props.onSwipedDown(true);
                        this.setState({detected: true});
                    }
                    else if(parseFloat(tY)<(-this.state.delta)){
                        if(this && this.props && this.props.onSwipedUp) this.props.onSwipedUp(true);
                        this.setState({detected: true});
                    }
                }
            }
        }

        if(this.state.preventDefaultEvent) e.preventDefault();
    },
    _touchEnd: function (e) {
        this.setState({
            x: 0,
            y: 0,
            status: false,
            detected: false
        });
        if(this.state.preventDefaultEvent) e.preventDefault();
    }
});

module.exports = Swipe;