const React = require('react');
const PropTypes = require('prop-types');

const Swipe = React.createClass({
    displayName: 'Swipe',
    propTypes: {
        nodeName: PropTypes.string,
        mouseSwipe: PropTypes.bool,
        className: PropTypes.string,
        onSwipingUp: PropTypes.func,
        onSwipingRight: PropTypes.func,
        onSwipingDown: PropTypes.func,
        onSwipingLeft: PropTypes.func,
        onSwipedUp: PropTypes.func,
        onSwipedRight: PropTypes.func,
        onSwipedDown: PropTypes.func,
        onSwipedLeft: PropTypes.func,
        onSwipe: PropTypes.func,
        delta: PropTypes.number,
        preventDefaultEvent: PropTypes.bool,
        style: PropTypes.object
    },
    getInitialState() {
        return {
            x: 0,
            y: 0,
            status: false,
            detected: false,
            delta: 50,
            preventDefaultEvent: false
        };
    },
    render() {
        let newProps = {
            onTouchStart: this._touchStart,
            onTouchMove: this._touchMove,
            onTouchEnd: this._touchEnd,
            className: this.props.className || "",
            style: this.props.style || {}
        };
        if (this.props.mouseSwipe){
            newProps.onMouseMove = this._mouseMove;
            newProps.onMouseDown = this._mouseStart;
            newProps.onMouseUp = this._mouseEnd;
        }
        return React.createElement(this.props.nodeName || "div", newProps, this.props.children);
    },
    _mouseStart(e){
        if(this.props.preventDefaultEvent && this.props.preventDefaultEvent!==this.state.preventDefaultEvent) this.setState({preventDefaultEvent: this.props.preventDefaultEvent});
        if(this.props.delta && this.props.delta!==this.state.delta) this.setState({delta: this.props.delta});

        this.setState({
            x: Math.abs(e.clientX).toFixed(2),
            y: Math.abs(e.clientY).toFixed(2),
            status: true,
            detected: false
        });
        if(this.state.preventDefaultEvent) e.preventDefault();
    },
    _mouseMove(e){
        if (this.state.status){
            let x = (e.clientX).toFixed(2);
            let y = (e.clientY).toFixed(2);
            let tX = parseFloat((x - this.state.x).toFixed(2));
            let tY = parseFloat((y - this.state.y).toFixed(2));

            if (Math.abs(tX) > Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([tX, 0]);
            else if (Math.abs(tX) < Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([0, tY]);

            if(Math.abs(tX)>=this.state.delta){
                if(tX>this.state.delta){
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
                    if(tY>this.state.delta){
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
                    if(parseFloat(tX)>this.state.delta){
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
                        if(parseFloat(tY)>this.state.delta){
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
        }
    },
    _mouseEnd(e){
        this.setState({
            x: 0,
            y: 0,
            status: false,
            detected: false
        });
        if(this.state.preventDefaultEvent) e.preventDefault();
    },
    _touchStart(e) {
        if(this.props.preventDefaultEvent && this.props.preventDefaultEvent!==this.state.preventDefaultEvent) this.setState({preventDefaultEvent: this.props.preventDefaultEvent});
        if(this.props.delta && this.props.delta!==this.state.delta) this.setState({delta: this.props.delta});

        this.setState({
            x: Math.abs(e.touches[0].pageX).toFixed(2),
            y: Math.abs(e.touches[0].pageY).toFixed(2),
            status: true,
            detected: false
        });
        if(this.state.preventDefaultEvent) e.preventDefault();
    },
    _touchMove(e) {
        if (e.touches.length > 1) {
            return
        }

        let x = (e.touches[0].pageX).toFixed(2);
        let y = (e.touches[0].pageY).toFixed(2);
        let tX = parseFloat((x - this.state.x).toFixed(2));
        let tY = parseFloat((y - this.state.y).toFixed(2));

        if (Math.abs(tX) > Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([tX, 0]);
        else if (Math.abs(tX) < Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([0, tY]);


        if(Math.abs(tX)>=this.state.delta){
            if(tX>this.state.delta){
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
                if(tY>this.state.delta){
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
                if(parseFloat(tX)>this.state.delta){
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
                    if(parseFloat(tY)>this.state.delta){
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
    _touchEnd(e) {
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
