import React, { Component } from 'react';
import { SpringSystem, MathUtil } from 'rebound'
import Scrollbars from './Scrollbars';

export default class ColoredScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.handleSpringUpdate = this.handleSpringUpdate.bind(this)
        this.renderThumb = this.renderThumb.bind(this);
    }

    componentDidMount() {
        this.springSystem = new SpringSystem()
        this.spring = this.springSystem.createSpring()
        this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate })
    }

    componentWillUnmount() {
        this.springSystem.deregisterSpring(this.spring)
        this.springSystem.removeAllListeners()
        this.springSystem = undefined
        this.spring.destroy()
        this.spring = undefined
    }

    getScrollTop() {
        return this.refs.scrollbars.getScrollTop()
    }

    getScrollHeight() {
        return this.refs.scrollbars.getScrollHeight()
    }

    getHeight() {
        return this.refs.scrollbars.getHeight()
    }

    scrollToBottom() {
        return this.refs.scrollbars.scrollToBottom()
    }

    scrollTop(top) {
        const { scrollbars } = this.refs
        const scrollTop = scrollbars.getScrollTop()
        const scrollHeight = scrollbars.getScrollHeight()
        const val = MathUtil.mapValueInRange(top, 0, scrollHeight, scrollHeight * 0.2, scrollHeight * 0.8)
        this.spring.setCurrentValue(scrollTop).setAtRest()
        this.spring.setEndValue(val)
    }

    handleSpringUpdate(spring) {
        const { scrollbars } = this.refs
        const val = spring.getCurrentValue()
        scrollbars.scrollTop(val)
    }

    // renderView({ style, ...props }) {
    //     const { top } = this.state;
    //     const viewStyle = {
    //         padding: 15,
    //         backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(top * 255)}, ${Math.round(255)})`,
    //         color: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
    //     };
    //     return (
    //         <div
    //             className="box"
    //             style={{ ...style, ...viewStyle }}
    //             {...props}
    //         />
    //     );
    // }

    renderThumb({ style, ...props }) {
        // const { top } = this.state;
        const thumbStyle = {
            // backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`,
            backgroundColor: 'rgb(134, 134, 134)',
            borderRadius: '8px'
        };
        return (
            <div style={{ ...style, ...thumbStyle }} {...props} />
        );
    }

    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                ref="scrollbars"
                {...this.props}
            />
        );
    }
}