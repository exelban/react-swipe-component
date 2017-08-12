# react-swipe-component


[![Codacy grade](https://img.shields.io/codacy/grade/c43c0f7bf541405e9d1cb073b602a35d.svg?style=flat-square)](https://www.codacy.com/app/exelban/react-swipe-component)
[![David](https://img.shields.io/david/exelban/react-swipe-component.svg?style=flat-square)](https://david-dm.org/exelban/react-swipe-component)
[![Travis](https://img.shields.io/travis/exelban/react-swipe-component.svg?style=flat-square)](https://travis-ci.org/exelban/react-swipe-component)
[![Download Count](https://img.shields.io/npm/dm/react-swipe-component.svg?style=flat-square)](http://www.npmjs.com/package/react-swipe-component)


[![Demo image](https://s3.eu-central-1.amazonaws.com/serhiy/Github_repo/react-swipe-component.png)](https://exelban.github.io/react-swipe-component)

Swipe bindings for react.
[Demo](https://exelban.github.io/react-swipe-component/)

## Install
```javascript
npm install react-swipe-component --save
```

## Usage
### Example
```javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import Swipe from 'react-swipe-component';

class Demo extends Component{
    constructor(){
        super();
        this.onSwipeLeftListener = this._onSwipeLeftListener.bind(this);
        this.onSwipeRightListener = this._onSwipeRightListener.bind(this);
        this.onSwipeDownListener = this._onSwipeUpListener.bind(this);
        this.onSwipeUpListener = this._onSwipeDownListener.bind(this);
        this.onSwipeListener = this._onSwipeListener.bind(this);
    }
    render() {
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
    }
    _onSwipeLeftListener(){
        console.log("Swiped left");
    }
    _onSwipeRightListener(){
        console.log("Swiped right");
    }
    _onSwipeUpListener(){
        console.log("Swiped Up");
    }
    _onSwipeDownListener() {
        console.log("Swiped down");
    }
    _onSwipeListener(e){
        if (e[1]===0) console.log("Swipe x: "+e[0]);
        else if (e[0]===0) console.log("Swipe y: "+e[1]);
    }
}

render(<Demo/>, document.getElementById('app') );
```

### Props
**```nodeName```** is a string which determines the html element/node that this react component binds its touch events to then returns. The default value is 'div'.

**```className```** is a string which determines the html element/node class.

**```style```** is a object which determines the style for element.


**```delta```** is the amount of px before we start firing events. Also affects how far onSwipedUp, onSwipedRight, onSwipedDown, and onSwipedLeft need to be before they fire events. The default value is 50.

**```mouseSwipe```** is allow you to turn on swipe listener for mouse event for desktop browsers (touch listener will be working too). The default value is false.

**```preventDefaultEvent```** is whether to prevent the browser's touchmove event. Sometimes you would like the target to scroll natively. The default value is true.


**```onSwipingUp```**, **```onSwipingRight```**, **```onSwipingDown```**, **```onSwipingLeft```**, are called with the event as well as the absolute delta of where the swipe started and where it's currently at. Return distance from starting point.

**```onSwipedUp```**, **```onSwipedRight```**, **```onSwipedDown```**, **```onSwipedLeft```** are called with the event as well as the x distance, + or -, from where the swipe started to where it ended. These only fire at the end of a touch event.

**```onSwipe```** are called when the swipe started. Return distance from starting point [x,y]. One value will be 0. If value is non 0 it means that it's main swipe axis.

**```onTransitionEnd```** event is fired when a CSS transition has completed.


##### PropTypes
```javascript
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
    onSwipedLeft: PropTypes.func,
    onTransitionEnd: PropTypes.func
```
## License

[Apache License 2.0](https://github.com/exelban/react-swipe-component/blob/master/LICENSE.md)
