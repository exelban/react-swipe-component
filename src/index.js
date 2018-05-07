// @flow

import React from 'react'
import PropTypes from 'prop-types'

type Props = {
  nodeName?: string,
  className?: string,
  style?: Object,

  delta: number,
  mouseSwipe?: boolean,
  preventDefaultEvent?: boolean,

  children?: any,

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

type State = {
  x: number,
  y: number,
  status: boolean,
  detected: boolean,
  delta: number,
}

export default class Swipe extends React.Component<Props, State> {
  moveStart: PropTypes.func
  move: PropTypes.func
  moveEnd: PropTypes.func

  static defaultProps = {
    delta: 50,
    mouseSwipe: false,
    preventDefaultEvent: false,

    onSwipe: () => {},
    onSwipeEnd: () => {},
    onSwipingUp: () => {},
    onSwipingRight: () => {},
    onSwipingDown: () => {},
    onSwipingLeft: () => {},
    onSwipedUp: () => {},
    onSwipedRight: () => {},
    onSwipedDown: () => {},
    onSwipedLeft: () => {},
    onTransitionEnd: () => {},
  }

  constructor () {
    super()

    this.state = {
      x: 0,
      y: 0,
      status: false,
      detected: false,
      delta: 50,
    }

    this.moveStart = this._moveStart.bind(this)
    this.move = this._move.bind(this)
    this.moveEnd = this._moveEnd.bind(this)
  }

  render () {
    const newProps = {
      className: this.props.className || null,
      style: this.props.style || {},
      onTouchStart: this.moveStart,
      onTouchMove: this.move,
      onTouchEnd: this.moveEnd,
      onTransitionEnd: this.props.onTransitionEnd,
      onMouseMove: this.props.mouseSwipe ? this.move : null,
      onMouseDown: this.props.mouseSwipe ? this.moveStart : null,
      onMouseUp: this.props.mouseSwipe ? this.moveEnd : null,
    }
    newProps.style.touchAction = 'none'
    return React.createElement(this.props.nodeName || 'div', newProps, this.props.children)
  }

  _moveStart (e: Object) {
    if (this.props.preventDefaultEvent) e.preventDefault()
    this.setState({
      x: parseFloat((e.clientX || e.touches[0].clientX).toFixed(2)),
      y: parseFloat((e.clientY || e.touches[0].clientY).toFixed(2)),
      status: true,
      detected: false,
    })
  }
  _move (e: Object) {
    if (!this.state.status) return
    if (this.props.preventDefaultEvent) e.preventDefault()

    const x: number = parseFloat((e.clientX || e.touches[0].clientX).toFixed(2))
    const y: number = parseFloat((e.clientY || e.touches[0].clientY).toFixed(2))
    const tX: number = parseFloat((x - this.state.x).toFixed(2))
    const tY: number = parseFloat((y - this.state.y).toFixed(2))


    if (Math.abs(tX) > Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([tX, 0])
    else if (Math.abs(tX) < Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([0, tY])

    if (Math.abs(tX) >= this.props.delta) {
      if (tX > this.props.delta) {
        this.props.onSwipingRight(tX)
      } else if (tX < -this.props.delta) {
        this.props.onSwipingLeft(tX)
      }
    } else if (Math.abs(tY) >= this.props.delta) {
      if (tY > this.props.delta) {
        this.props.onSwipingDown(tY)
      } else if (tY < -this.props.delta) {
        this.props.onSwipingUp(tY)
      }
    }

    if (!this.state.detected) {
      if (Math.abs(parseFloat(tX)) >= this.props.delta) {
        if (parseFloat(tX) > this.props.delta) {
          this.props.onSwipedRight(true)
          this.setState({ detected: true })
        } else if (parseFloat(tX) < -this.props.delta) {
          this.props.onSwipedLeft(true)
          this.setState({ detected: true })
        }
      } else if (Math.abs(parseFloat(tY)) >= this.props.delta) {
        if (parseFloat(tY) > this.props.delta) {
          this.props.onSwipedDown(true)
          this.setState({ detected: true })
        } else if (parseFloat(tY) < -this.props.delta) {
          this.props.onSwipedUp(true)
          this.setState({ detected: true })
        }
      }
    }
  }
  _moveEnd (e: Object) {
    if (this.props.preventDefaultEvent) e.preventDefault()
    this.setState({
      x: 0,
      y: 0,
      status: false,
      detected: false,
    })
    this.props.onSwipeEnd(true)
  }
}
