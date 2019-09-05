import React from 'react'
import {connect} from 'react-redux'
import {startTimer, serverRenderTimer} from '../store'
import Products from '../components/Products'

import {TweenMax, TimelineLite} from "gsap";

const endDate = new Date("Sep 1, 2019 02:00:00").getTime();

class Index extends React.Component {
    static getInitialProps({reduxStore, req}) {
        const isServer = !!req;
        reduxStore.dispatch(serverRenderTimer(isServer));

        return {}
    }

    constructor(props) {
        super(props);
        this.myElement = null;
        this.myTitle = [];
        this.myTween = new TimelineLite({paused: true});
    }

    componentDidMount() {
        TweenMax
            .staggerFrom(this.myTitle, 0.5, {x: 30, rotationX: 100, autoAlpha: 0}, 0.05);

        this.myTween
            .from(this.myElement, 0.5, {y: 100, opacity: 0})
            .to(this.myElement, 0.5, {y: 0, opacity: 1})
            .play().delay(0.5);

        this.timer = setInterval(() => {
            const now = new Date().getTime();
            const t = endDate - now;
            this.props.startTimer(t);
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const sentence = "Welcome to the Store".replace(/ /g, '\u00a0').split('');
        return (
            <div>
                <div
                    className="charm-wrapper text-center mb-4">
                    {sentence.map((word) => {
                        return (
                            <div className="charm" key={Date.now()} ref={span => this.myTitle.push(span)}>{word}</div>
                        )
                    })}
                </div>
                <div ref={div => this.myElement = div}>
                    <Products/>
                </div>
                <style jsx>{`
                    .charm-wrapper {
                        // display: inline-flex;
                        font-weight: 900;
                          font-size: 3.5em;
                        }
                    .charm {
                        display: block;
                          display: inline-block;
                    line-height: 1em;
                    }
              `}</style>
            </div>
        )
    }
}

const mapDispatchToProps = {startTimer};
export default connect(
    null,
    mapDispatchToProps
)(Index)
