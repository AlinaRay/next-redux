import ActiveLink from '../lib/ActiveLink';
import {connect} from "react-redux";
import React from 'react'
import {TimelineLite} from "gsap";


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.myElement = null;
        this.myTween = new TimelineLite({paused: true});
    }

    componentDidMount() {
        this.myTween
            .from(this.myElement, 0.5, {y: -100, opacity: 0})
            .to(this.myElement, 0.5, {y: 0, opacity: 1})
            .play().delay(0.5);
    };

    render() {
        const {totalBasketItems} = this.props;
        return (
            <nav ref={nav => this.myElement = nav} className="navbar navbar-expand navbar-light bg-light mb-4">
                <div className="container">
                    <a className="navbar-brand" href="/">Test</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav align-items-center ml-auto">
                            <li className="nav-item custom-item">
                                <ActiveLink href="/" activeClassName="active">
                                    <a className="custom-nav-link">
                                        <span>Products</span>
                                    </a>
                                </ActiveLink>
                            </li>
                            <li className="nav-item custom-item">
                                <ActiveLink href="/basket" activeClassName="active">
                                    <a className="custom-nav-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/>
                                        </svg>
                                        {
                                            totalBasketItems > 0
                                                ?
                                                <span className="badge badge-pill badge-dark"> {totalBasketItems}</span>
                                                : ''
                                        }
                                    </a>
                                </ActiveLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <style jsx>{`
                    .custom-item {
                        margin: 0 0.5rem;
                    }
                    .nav-item .custom-nav-link {
                        opacity: 1;
                        transition: opacity 0.5s ease, color 0.5s ease, fill 0.5s ease;
                        text-decoration: none;
                    }
                    .custom-nav-link:hover {
                        color: #f0ad4e;
                        fill: #f0ad4e;
                        opacity: 1;
                    }
                    .nav-item .active {
                        opacity: 0.5;
                    }
              `}</style>
            </nav>
        )
    }
};


const mapStateToProps = state => ({
    totalBasketItems: state.basketItems
        .map(item => item.count)
        .reduce((sum, current) => {
            return sum + current;
        }, 0),
});
export default connect(
    mapStateToProps,
    null
)(Navbar)