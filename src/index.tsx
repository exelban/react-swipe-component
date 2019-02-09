import React from 'react'

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
interface State {
  x: number,
  y: number,
  status: boolean,
  detected: boolean,
  delta: number,
}
interface Position {
  x: number,
  y: number,
}

const isTouchEvent = (event: any): boolean => {
  if ((window as any).TouchEvent !== undefined) {
    return event instanceof TouchEvent
  }
  return event.touches !== undefined
}

class Swipe extends React.Component<Props, {}> {

  private store: State = {
    x: 0,
    y: 0,
    status: false,
    detected: false,
    delta: 50,
  }
  static readonly defaultProps = {
    delta: 50,

    detectMouse: true,
    detectTouch: false,

    preventDefault: false,
    stopPropagation: false,

    onSwipe: (p: Position): void => {},
    onSwipingLeft: (x: number): void => {},
    onSwipingRight: (x: number): void => {},
    onSwipingUp: (y: number): void => {},
    onSwipingDown: (y: number): void => {},
    onSwipedLeft: (): void => {},
    onSwipedRight: (): void => {},
    onSwipedUp: (): void => {},
    onSwipedDown: (): void => {},
    onSwipeEnd: (): void => {},
    onTransitionEnd: (): void => {}
  }

  public render () {
    const start = (e: React.MouseEvent<any> | React.TouchEvent<any>) => {
      const event: MouseEvent | TouchEvent = this.prepare(e)
      this.moveStart(event)
    }
    const move = (e: React.MouseEvent<any> | React.TouchEvent<any>) => {
      const event: MouseEvent | TouchEvent = this.prepare(e)
      this.move(event)
    }
    const end = (e: React.MouseEvent<any> | React.TouchEvent<any>) => {
      this.prepare(e)
      this.moveEnd()
    }

    const newProps: React.HTMLAttributes<any> = {
      className: this.props.className || undefined,
      style: this.props.style || {},
      onTouchStart: this.props.detectTouch ? start : (_: React.TouchEvent<any>): void => {},
      onTouchMove: this.props.detectTouch ? move : (_: React.TouchEvent<any>): void => {},
      onTouchEnd: this.props.detectTouch ? end : (_: React.TouchEvent<any>): void => {},
      onMouseDown: this.props.detectMouse ? start : (_: React.MouseEvent<any>): void => {},
      onMouseMove: this.props.detectMouse ? move : (_: React.MouseEvent<any>): void => {},
      onMouseUp: this.props.detectMouse ? end : (_: React.MouseEvent<any>): void => {},
      onTransitionEnd: this.props.onTransitionEnd,
    }
    if (newProps.style !== undefined) {
      newProps.style.touchAction = 'none'
    }

    // @ts-ignore
    const elementType: string = this.props.nodeName || this.props.node || 'div'
    return React.createElement(elementType, newProps, this.props.children)
  }

  private prepare = (e: React.MouseEvent<any> | React.TouchEvent<any>): MouseEvent | TouchEvent => {
    if (this.props.preventDefault) e.preventDefault()
    if (this.props.stopPropagation) e.stopPropagation()
    return e.nativeEvent
  }

  private moveStart = (e: MouseEvent | TouchEvent) => {
    let x: number = 0
    let y: number = 0
    const touches: TouchList = (e as TouchEvent).touches

    if (e instanceof MouseEvent) {
      x = e.clientX
      y = e.clientY
    }
    if (isTouchEvent(e) && touches) {
      if (!touches[0]) {
        throw new Error('touch is not find')
      }
      x = touches[0].clientX
      y = touches[0].clientY
    }

    this.store.x = parseFloat(x.toFixed(2))
    this.store.y = parseFloat(y.toFixed(2))
    this.store.status = true
    this.store.detected = false
  }
  private move = (e: MouseEvent | TouchEvent) => {
    if (!this.store.status) return

    let x: number = 0
    let y: number = 0
    const touches: TouchList = (e as TouchEvent).touches

    if (e instanceof MouseEvent) {
      x = e.clientX
      y = e.clientY
    }
    if (isTouchEvent(event) && touches) {
      if (!touches[0]) {
        throw new Error('touch is not find')
      }
      x = touches[0].clientX
      y = touches[0].clientY
    }

    x = parseFloat(x.toFixed(2))
    y = parseFloat(y.toFixed(2))
    const tX: number = parseFloat((x - this.store.x).toFixed(2))
    const tY: number = parseFloat((y - this.store.y).toFixed(2))

    if (this.props.onSwipe) {
      this.props.onSwipe({x: tX, y: tY})
    }

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

    if (!this.store.detected) {
      if (Math.abs(tX) >= this.props.delta) {
        if (tX > this.props.delta) {
          this.props.onSwipedRight()
          this.store.detected = true
        } else if (tX < -this.props.delta) {
          this.props.onSwipedLeft()
          this.store.detected = true
        }
      } else if (Math.abs(tY) >= this.props.delta) {
        if (tY > this.props.delta) {
          this.props.onSwipedDown()
          this.store.detected = true
        } else if (tY < -this.props.delta) {
          this.props.onSwipedUp()
          this.store.detected = true
        }
      }
    }
  }
  private moveEnd = () => {
    this.store.x = 0
    this.store.y = 0
    this.store.status = false
    this.store.detected = false
    this.props.onSwipeEnd()
  }
}

export { Swipe, Position }
