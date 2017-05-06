const React = require("react");
const PropTypes = require("prop-types");

class Swipe extends React.Component {
    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0,
            status: false,
            detected: false,
            delta: 50,
            preventDefaultEvent: false
        };
        this.moveStart = this._moveStart.bind(this);
        this.move = this._move.bind(this);
        this.moveEnd = this._moveEnd.bind(this);
    }
    render() {
        let newProps = {
            onTouchStart: this.moveStart,
            onTouchMove: this.move,
            onTouchEnd: this.moveEnd,
            className: this.props.className || null,
            style: this.props.style || {}
        };
        if (this.props.mouseSwipe) {
            newProps.onMouseMove = this.move;
            newProps.onMouseDown = this.moveStart;
            newProps.onMouseUp = this.moveEnd;
        }
        return React.createElement(this.props.nodeName || 'div', newProps, this.props.children);
    }
    _moveStart(e){
        if (this.props.preventDefaultEvent) e.preventDefault();
        let X = Math.abs(e.clientX).toFixed(2) || Math.round(e.touches[0].clientX).toFixed(2);
        let Y = Math.abs(e.clientY).toFixed(2) || Math.round(e.touches[0].clientY).toFixed(2);

        this.setState({
            x: X,
            y: Y,
            status: true,
            detected: false
        });
    }
    _move(e){
        if (this.state.status) {
            let x = Math.abs(e.clientX).toFixed(2) || Math.round(e.touches[0].clientX).toFixed(2);
            let y = Math.abs(e.clientY).toFixed(2) || Math.round(e.touches[0].clientY).toFixed(2);

            let tX = parseFloat((x - this.state.x).toFixed(2));
            let tY = parseFloat((y - this.state.y).toFixed(2));

            if (Math.abs(tX) > Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([tX, 0]);
            else if (Math.abs(tX) < Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([0, tY]);

            if (Math.abs(tX) >= this.props.delta) {
                if (tX > this.props.delta) this.props.onSwipingRight(tX);
                else if (tX < -this.props.delta) this.props.onSwipingLeft(tX);
            } else if (Math.abs(tY) >= this.props.delta) {
                if (tY > this.props.delta) this.props.onSwipingDown(tY);
                else if (tY < -this.props.delta) this.props.onSwipingUp(tY);
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
    _moveEnd(e){
        if (this.props.preventDefaultEvent) e.preventDefault();
        this.setState({
            x: 0,
            y: 0,
            status: false,
            detected: false
        });
    }
}

Swipe.defaultProps = {
    delta: 50,
    mouseSwipe: false,
    preventDefaultEvent: true,

    onSwipe: ()=>{},
    onSwipingUp: ()=>{},
    onSwipingRight: ()=>{},
    onSwipingDown: ()=>{},
    onSwipingLeft: ()=>{},
    onSwipedUp: ()=>{},
    onSwipedRight: ()=>{},
    onSwipedDown: ()=>{},
    onSwipedLeft: ()=>{}
};

Swipe.propTypes = {
    nodeName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,

    delta: PropTypes.number,
    mouseSwipe: PropTypes.bool,
    preventDefaultEvent: PropTypes.bool,

    onSwipe: PropTypes.func,
    onSwipingUp: PropTypes.func,
    onSwipingRight: PropTypes.func,
    onSwipingDown: PropTypes.func,
    onSwipingLeft: PropTypes.func,
    onSwipedUp: PropTypes.func,
    onSwipedRight: PropTypes.func,
    onSwipedDown: PropTypes.func,
    onSwipedLeft: PropTypes.func
};

export default Swipe;