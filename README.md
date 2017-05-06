# react-swipe-component

[![david-dm-badge](https://david-dm.org/exelban/react-swipe-component.svg)](https://david-dm.org/exelban/react-swipe-component)
[![build status](https://travis-ci.org/exelban/react-swipe-component.svg?branch=master)](https://travis-ci.org/exelban/react-swipe-component)
[![npm version](https://badge.fury.io/js/react-swipe-component.svg)](https://www.npmjs.com/package/react-swipe-component)
[![Download Count](http://img.shields.io/npm/dm/react-swipe-component.svg)](https://www.npmjs.com/package/react-swipe-component)

[![Demo image](https://s3.eu-central-1.amazonaws.com/serhiy/Github_repo/react-swipe-component.png)](https://exelban.github.io/react-swipe-component)

Swipe bindings for react.
[Demo](https://exelban.github.io/react-swipe-component/)

## Install
```javascript
npm install react-swipe-component
```

## Usage
### Example
```javascript
const React = require('react');
const ReactDOM = require('react-dom');
const Swipe = require('react-swipe-component');

let Home = React.createClass({
    render: function () {
        return (<Swipe 
                nodeName="div"
                className="test"
                mouseSwipe={false}
                onSwipedLeft={this.onSwipeLeftListener} 
                onSwipedRight={this.onSwipeRightListener} 
                onSwipedDown={this.onSwipeDownListener} 
                onSwipedUp={this.onSwipeUpListener}
                onSwipe={this.onSwipeListener}>
            Demo
        </Swipe>);
    },
    onSwipeLeftListener(){
        console.log("Swiped left");
    },
    onSwipeRightListener(){
        console.log("Swiped right");
    },
    onSwipeUpListener(){
        console.log("Swiped Up");
    },
    onSwipeDownListener() {
        console.log("Swiped down");
    },
    onSwipeListener(e){
        if (e[1]===0) console.log("Swipe x: "+e[0]);
        else if (e[0]===0) console.log("Swipe y: "+e[1]);
    },
});

ReactDOM.render(<Home/>, document.getElementById('app') );
```

### Props
**```onSwipingUp```**, **```onSwipingRight```**, **```onSwipingDown```**, **```onSwipingLeft```**, are called with the event as well as the absolute delta of where the swipe started and where it's currently at. These constantly fire throughout touch events.

**```onSwipedUp```**, **```onSwipedRight```**, **```onSwipedDown```**, **```onSwipedLeft```** are called with the event as well as the x distance, + or -, from where the swipe started to where it ended. These only fire at the end of a touch event.

**```onSwipe```** are called when the swipe started. Return distance from starting point [x,y]. One value will be 0. If value is non 0 it means that it's main swipe axis.

**```mouseSwipe```** is allow you to turn on swipe listener for mouse event for desktop browsers (touch listener will be working too). The default value is false.

**```nodeName```** is a string which determines the html element/node that this react component binds its touch events to then returns. The default value is 'div'.

**```className```** is a string which determines the html element/node class.

**```style```** is a object which determines the style for element.

**```delta```** is the amount of px before we start firing events. Also affects how far onSwipedUp, onSwipedRight, onSwipedDown, and onSwipedLeft need to be before they fire events. The default value is 50.

**```preventDefaultEvent```** is whether to prevent the browser's touchmove event. Sometimes you would like the target to scroll natively. The default value is false.

##### PropTypes
```javascript
    nodeName: React.PropTypes.string,
    mouseSwipe: React.PropTypes.bool,
    className: React.PropTypes.string,
    onSwipingUp: React.PropTypes.func,
    onSwipingRight: React.PropTypes.func,
    onSwipingDown: React.PropTypes.func,
    onSwipingLeft: React.PropTypes.func,
    onSwipedUp: React.PropTypes.func,
    onSwipedRight: React.PropTypes.func,
    onSwipedDown: React.PropTypes.func,
    onSwipedLeft: React.PropTypes.func,
    onSwipe: React.PropTypes.func,
    delta: React.PropTypes.number,
    preventDefaultEvent: React.PropTypes.bool,
    style: React.PropTypes.object
```
## License

[Apache License 2.0](https://github.com/exelban/react-swipe-component/blob/master/LICENSE.md)
