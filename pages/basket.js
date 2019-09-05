import React from 'react';
import BasketItems from '../components/BasketItems';
import {TimelineLite} from "gsap";

class BasketPage extends React.Component {
    constructor(props) {
        super(props);
        this.myElement = null;
        this.myTitle = null;
        this.myTween = new TimelineLite({paused: true});
    }

    componentDidMount() {
        this.myTween
            .from(this.myElement, 0.75, {opacity: 0})
            .to(this.myElement, 0.75, {opacity: 1})
            .play();
    }

    render() {
        return (
            <div ref={div => this.myElement = div}>
                <BasketItems/>
            </div>
        )
    }
}

export default BasketPage;