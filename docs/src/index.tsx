import * as React from "react"
import * as ReactDOM from "react-dom"

import Toggle from "react-toggle"
import {Swipe, Position} from "../../lib"

import "react-toggle/style.css"
import './style.css'

interface State {
  actionText: string
  continuousSwipeListener: boolean
}

class Main extends React.Component<{}, State>{
  public state: State = {
    actionText: "Please swipe...",
    continuousSwipeListener: false,
  }

  render() {
    return <div className="root">
      <Swipe
        nodeName="div"
        className="test"
        onSwipeEnd={this.onSwipeEnd}
        onSwipedLeft={this.onSwipeLeftListener}
        onSwipedRight={this.onSwipeRightListener}
        onSwipedDown={this.onSwipeDownListener}
        onSwipedUp={this.onSwipeUpListener}
        onSwipe={this.onSwipeListener}>
        <div>
          Swipe to see results.<br/><br/>
          <label>
            <Toggle
              defaultChecked={this.state.continuousSwipeListener}
              onChange={this.handleToggleSwipe}/>
            <span>Continuous swipe listener</span>
          </label>
        </div>
      </Swipe>

      <footer>{this.state.actionText}</footer>
    </div>
  }

  onSwipeEnd = (): void => {
    this.setState({ actionText: 'Swipe Ended' })
  }
  onSwipeLeftListener = (): void => {
    this.setState({ actionText: 'Swiped left' })
  }
  onSwipeRightListener = (): void => {
    this.setState({ actionText: 'Swiped right' })
  }
  onSwipeUpListener = (): void => {
    this.setState({ actionText: 'Swiped Up' })
  }
  onSwipeDownListener = (): void => {
    this.setState({ actionText: 'Swiped down' })
  }
  onSwipeListener = (p: Position): void => {
    if (!this.state.continuousSwipeListener) return
    this.setState({ actionText: `Swipe position (${p.x}, ${p.y})` })
  }

  handleToggleSwipe = (e: React.ChangeEvent<any>) => {
    this.setState({
      continuousSwipeListener: e.target.checked,
      actionText: 'Please swipe...'
    })
  }
}

ReactDOM.render(<Main/>, document.getElementById("app"))
