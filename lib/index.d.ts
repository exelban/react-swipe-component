import React from 'react';
interface Props {
    nodeName?: string;
    node?: React.ReactNode;
    className?: string;
    style?: Object;
    detectTouch?: boolean;
    detectMouse?: boolean;
    delta: number;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    children?: any;
    onSwipe: (p: Position) => void;
    onSwipingLeft: (x: number) => void;
    onSwipingRight: (x: number) => void;
    onSwipingUp: (y: number) => void;
    onSwipingDown: (y: number) => void;
    onSwipedLeft: () => void;
    onSwipedRight: () => void;
    onSwipedUp: () => void;
    onSwipedDown: () => void;
    onSwipeEnd: () => void;
    onTransitionEnd: () => void;
}
interface Position {
    x: number;
    y: number;
}
declare class Swipe extends React.Component<Props, {}> {
    private store;
    static readonly defaultProps: {
        delta: number;
        detectMouse: boolean;
        detectTouch: boolean;
        preventDefault: boolean;
        stopPropagation: boolean;
        onSwipe: (p: Position) => void;
        onSwipingLeft: (x: number) => void;
        onSwipingRight: (x: number) => void;
        onSwipingUp: (y: number) => void;
        onSwipingDown: (y: number) => void;
        onSwipedLeft: () => void;
        onSwipedRight: () => void;
        onSwipedUp: () => void;
        onSwipedDown: () => void;
        onSwipeEnd: () => void;
        onTransitionEnd: () => void;
    };
    render(): React.DOMElement<React.HTMLAttributes<any>, Element>;
    private prepare;
    private moveStart;
    private move;
    private moveEnd;
}
export { Swipe, Position };
