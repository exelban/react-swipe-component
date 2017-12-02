import React, {Component} from "react";
import { render } from "react-dom";
import "./style.css";
import "react-toggle/style.css";
import Swipe from "react-swipe-component";
import Toggle from "react-toggle";


class AppView extends Component {
    constructor(){
        super();
        this.state = {
            actionText: "Please swipe...",
            continuousSwipeListener: false
        };
        this.onSwipeLeftListener = this._onSwipeLeftListener.bind(this);
        this.onSwipeRightListener = this._onSwipeRightListener.bind(this);
        this.onSwipeUpListener = this._onSwipeUpListener.bind(this);
        this.onSwipeDownListener = this._onSwipeDownListener.bind(this);
        this.onSwipeListener = this._onSwipeListener.bind(this);
        this.handleToggleSwipe = this._handleToggleSwipe.bind(this);
    }
    render(){
        return (
            <div className="root">
                <Swipe nodeName="div"
                       mouseSwipe={true}
                       className="test"
                       preventDefaultEvent={true}
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
        );
    }
    _onSwipeLeftListener(){
        this.setState({actionText: "Swiped left"});
    }
    _onSwipeRightListener(){
        this.setState({actionText: "Swiped right"});
    }
    _onSwipeUpListener(){
        this.setState({actionText: "Swiped Up"});
    }
    _onSwipeDownListener() {
        this.setState({actionText: "Swiped down"});
    }
    _onSwipeListener(e){
        if (e[1]===0 && this.state.continuousSwipeListener) this.setState({actionText: "Swipe x: "+e[0]});
        else if (e[0]===0 && this.state.continuousSwipeListener) this.setState({actionText: "Swipe y: "+e[1]});
    }
    _handleToggleSwipe(e){
        this.setState({continuousSwipeListener: e.target.checked, actionText: "Please swipe..."});
    }
}



render(<AppView/>, document.getElementById("app"));