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
import React from "react"
import ReactDOM from "react-dom"
import {Swipe, Position} from "react-swipe-component"

class Demo extends React.Component<{}, {}>{
  render() {
    return <Swipe
      nodeName="div"
      className="test"
      onSwipeEnd={this.onSwipeEnd}
      onSwipedLeft={this.onSwipeLeftListener}
      onSwipedRight={this.onSwipeRightListener}
      onSwipedDown={this.onSwipeDownListener}
      onSwipedUp={this.onSwipeUpListener}
      onSwipe={this.onSwipeListener}>
      Demo
    </Swipe>
  }

  onSwipeEnd = () => {
    console.log("Swipe Ended")
  }
  onSwipeLeftListener = () => {
    console.log("Swiped left")
  }
  onSwipeRightListener = () => {
    console.log("Swiped right")
  }
  onSwipeUpListener = () => {
    console.log("Swiped Up")
  }
  onSwipeDownListener = () => {
    console.log("Swiped down")
  }
  onSwipeListener = (p) => {
    if (p.x !== 0) {
      console.log(`Swipe x: ${p.x}`)
    }
    if (p.y !== 0) {
      console.log(`Swipe y: ${p.y}`)
    }
  }
}

ReactDOM.render(<Demo/>, document.getElementById("app"))
```

### Props
**```nodeName```** is a string which determines the html element/node that this react component binds its touch events to then returns. The default value is 'div'.

**```node```** is a option if you'd like to pass a node instead of nodeName(e.g. styled-components).

**```className```** is a string which determines the html element/node class.

**```style```** is a object which determines the style for element.


**```delta```** is the amount of px before we start firing events. Also affects how far onSwipedUp, onSwipedRight, onSwipedDown, and onSwipedLeft need to be before they fire events. The default value is 50.

**```detectMouse```** is allow you to turn off swipe listener for mouse event. The default value is true.

**```detectTouch```** is allow you to turn on swipe listener for touch event. The default value is false.

**```preventDefault```** is whether to prevent the browser's touchmove event. Sometimes you would like the target to scroll natively. The default value is false.

**```stopPropagation```** prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

**```onSwipingUp```**, **```onSwipingRight```**, **```onSwipingDown```**, **```onSwipingLeft```**, are called with the event as well as the absolute delta of where the swipe started and where it's currently at. Return distance from starting point.

**```onSwipedUp```**, **```onSwipedRight```**, **```onSwipedDown```**, **```onSwipedLeft```** are called with the event as well as the x distance, + or -, from where the swipe started to where it ended. These only fire at the end of a touch event.

**```onSwipe```** are called when the swipe started. Return distance from starting point [x,y]. One value will be 0. If value is non 0 it means that it's main swipe axis.

**```onSwipeEnd```** are called when the swipe ended.

**```onTransitionEnd```** event is fired when a CSS transition has completed.


##### Types
```typescript
interface Props {
  nodeName?: string,
  node?: React.ReactNode,
  className?: string,
  style?: Object,

  detectTouch?: boolean,
  detectMouse?: boolean,

  delta: number,
  preventDefault?: boolean,
  stopPropagation?: boolean,

  children?: any,

  onSwipe: (p: Position) => void
  onSwipingLeft: (x: number) => void,
  onSwipingRight: (x: number) => void,
  onSwipingUp: (y: number) => void,
  onSwipingDown: (y: number) => void,
  onSwipedLeft: () => void,
  onSwipedRight: () => void,
  onSwipedUp: () => void,
  onSwipedDown: () => void,
  onSwipeEnd: () => void,
  onTransitionEnd: () => void,
}
interface Position {
  x: number,
  y: number,
}
```

## Developing
### Library
```sh
git clone git@github.com:exelban/react-swipe-component.git
cd react-swipe-component
yarn install
yarn build
```

### Demo
If You want to test a package on demo page:
```sh
cd docs
yarn install
yarn dev
```

## What's new
### v3.0.0 (BREAKING CHANGES)
    - rewrited library in typescript
    - removed eslint
    - removed flow
    - update all dependencies
    - added stopPropagation
    - changed returning values structure
    - updated example

### v2.1.0
    - updated some dependencies
    - removed unnecessary comments
    - fixed docs script for build
    
### v2.0.0
    - updated all dependencies
    - added flow types
    - added eslint
    - added onSwipeEnd to example
    - renamed ./lib/Swipe to ./lib/index
    - moved to Babel 7 for compiling

### v1.4.0
    - fixed Google Chrome preventDefault error in console
    - small fixed with main example
    - started using webpack to compile to ES5
    - updated dependency

## License
[Apache License 2.0](https://github.com/exelban/react-swipe-component/blob/master/LICENSE.md)
