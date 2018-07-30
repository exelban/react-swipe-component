# react-swipe-component


[![Download Count](https://img.shields.io/npm/dt/react-swipe-component.svg?style=flat-square)](http://www.npmjs.com/package/react-swipe-component)


[![Demo image](https://s3.eu-central-1.amazonaws.com/serhiy/Github_repo/react-swipe-component.png)](https://exelban.github.io/react-swipe-component)

Swipe bindings for react.
[Demo](https://exelban.github.io/react-swipe-component/)

## Install
```sh
yarn add react-swipe-component
```  
Or with npm:  
```sh
npm install react-swipe-component --save
```

## Usage
### Example
```javascript
import React, { Component } from 'react'
import { render } from 'react-dom'
import Swipe from 'react-swipe-component'

class Demo extends Component{
  constructor(){
    super()
    this.onSwipeEnd = this._onSwipeEnd.bind(this)
    this.onSwipeLeftListener = this._onSwipeLeftListener.bind(this)
    this.onSwipeRightListener = this._onSwipeRightListener.bind(this)
    this.onSwipeDownListener = this._onSwipeUpListener.bind(this)
    this.onSwipeUpListener = this._onSwipeDownListener.bind(this)
    this.onSwipeListener = this._onSwipeListener.bind(this)
  }
  render() {
    return (<Swipe
                nodeName="div"
                className="test"
                mouseSwipe={false}
                onSwipeEnd={this.onSwipeEnd}
                onSwipedLeft={this.onSwipeLeftListener}
                onSwipedRight={this.onSwipeRightListener}
                onSwipedDown={this.onSwipeDownListener}
                onSwipedUp={this.onSwipeUpListener}
                onSwipe={this.onSwipeListener}>
            Demo
    </Swipe>)
  }

  _onSwipeEnd () {
    this.setState({ actionText: 'Swipe Ended' })
  }
  _onSwipeLeftListener () {
    this.setState({ actionText: 'Swiped left' })
  }
  _onSwipeRightListener () {
    this.setState({ actionText: 'Swiped right' })
  }
  _onSwipeUpListener () {
    this.setState({ actionText: 'Swiped Up' })
  }
  _onSwipeDownListener () {
    this.setState({ actionText: 'Swiped down' })
  }
  _onSwipeListener (e) {
    if (e[1] === 0 && this.state.continuousSwipeListener) this.setState({ actionText: `Swipe x: ${e[0]}` })
    else if (e[0] === 0 && this.state.continuousSwipeListener) this.setState({ actionText: `Swipe y: ${e[1]}` })
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

**```preventDefaultEvent```** is whether to prevent the browser's touchmove event. Sometimes you would like the target to scroll natively. The default value is false.

**```onSwipingUp```**, **```onSwipingRight```**, **```onSwipingDown```**, **```onSwipingLeft```**, are called with the event as well as the absolute delta of where the swipe started and where it's currently at. Return distance from starting point.

**```onSwipedUp```**, **```onSwipedRight```**, **```onSwipedDown```**, **```onSwipedLeft```** are called with the event as well as the x distance, + or -, from where the swipe started to where it ended. These only fire at the end of a touch event.

**```onSwipe```** are called when the swipe started. Return distance from starting point [x,y]. One value will be 0. If value is non 0 it means that it's main swipe axis.

**```onSwipeEnd```** are called when the swipe ended.

**```onTransitionEnd```** event is fired when a CSS transition has completed.


##### PropTypes
```javascript
{
  nodeName?: string,
  className?: string,
  style?: Object,

  delta: number,
  mouseSwipe?: boolean,
  preventDefaultEvent?: boolean,

  onSwipe: PropTypes.func,
  onSwipeEnd: PropTypes.func,
  onSwipingUp: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipingDown: PropTypes.func,
  onSwipingLeft: PropTypes.func,
  onSwipedUp: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipedDown: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onTransitionEnd: PropTypes.func,
}
```

## Developing
### Library
```sh
git clone git@github.com:exelban/react-swipe-component.git
cd react-swipe-component
yarn install

yarn build:prod
```

### Demo
If You want to test a package on demo page:
```sh
cd docs
yarn install
yarn dev
```

## What's new


### v2.1.0
    - updated some dependencies;
    - removed unnecessary comments;
    - fixed docs script for build;
    
### v2.0.0
    - updated all dependencies;
    - added flow types;
    - added eslint;
    - added onSwipeEnd to example;
    - renamed ./lib/Swipe to ./lib/index;
    - moved to Babel 7 for compiling;

### v1.4.0
    - fixed Google Chrome preventDefault error in console;
    - small fixed with main example;
    - started using webpack to compile to ES5;
    - updated dependency;

## License

[Apache License 2.0](https://github.com/exelban/react-swipe-component/blob/master/LICENSE.md)
