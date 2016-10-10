import React from 'react';
import ReactDOM from 'react-dom';
import Swipe from 'react-swipe-component';

const Home = React.createClass({
    render: function () {
        return (<Swipe onSwipedLeft={this.onSwipeLeftListener} onSwipedRight={this.onSwipeRightListener} onSwipedDown={this.onSwipeDownListener} onSwipedUp={this.onSwipeUpListener}>
            Demo
        </Swipe>);
    },
    onSwipeLeftListener: function () {
        console.log("Swiped left");
    },
    onSwipeRightListener: function () {
        console.log("Swiped right");
    },
    onSwipeUpListener: function () {
        console.log("Swiped Up");
    },
    onSwipeDownListener: function () {
        console.log("Swiped down");
    }
});

ReactDOM.render(<Home/>, document.getElementById('app') );