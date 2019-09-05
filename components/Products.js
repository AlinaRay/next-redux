import React from 'react';
import {connect} from 'react-redux';
import {addToBasket} from '../store';
import TimerWrapper from "./TimerWrapper";
import SaleTag from './Saletag' ;

const Products = ({products, addProductToBasket}) => {
    return (
        <div className="row mb-2">
            {
                products.map(({id, title, description, price, image}) => (
                    <div key={id}
                         className="col-md-6 mb-4 custom-card">
                        <div className="card">
                            <div
                                className="card-body no-gutters border rounded overflow-hidden d-flex flex-column flex-lg-row position-relative">
                                <div className="col p-4 d-flex flex-column position-static">
                                    <h6 className="card-subtitle mb-2 text-muted">subtitle</h6>
                                    <h4 className="card-title mb-4 text-primary">{title}</h4>
                                    <p className="card-text text-justify">{description}</p>
                                </div>
                                <div className="col p-1 d-flex flex-column justify-content-between position-static">
                                    <div className="picture-wrapper mb-4">
                                        <img className="picture"
                                             src={image}/>
                                        <div className="picture-sticker m-3">
                                            <SaleTag/>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="card-text text-center mb-2">
                                            <span>You have </span>
                                            <TimerWrapper/>
                                            <span>to buy with the </span>
                                        </div>

                                        <div className="card-text text-center text-warning mb-4">PRICE: {price}</div>

                                        <button
                                            type="button"
                                            className="btn custom-button btn-primary w-100 card-link mb-2"
                                            onClick={() => addProductToBasket(title, id, price)}
                                        >
                                            Add to basket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <style jsx>{`
                            .picture {
                                object-fit: cover;
                                position: absolute;
                                top: 0;
                                right: 0;
                                width: 100%;
                                height: 100%;
                            }
                            .picture-wrapper {
                                position: relative;
                                width: 100%;
                                padding-top: 71%;
                            }
                            .picture-sticker {
                                position: absolute;
                                top: 0;
                                right: 0;
                                display: flex;
                                align-items: flex-start;
                                justify-content: flex-end;
                                transform-origin: top right;
                            }
                            .card:hover .picture-sticker {
                                animation: shaking 0.5s 1 linear;
                            }
                            @keyframes shaking {
                                 0% {
                                    transform: rotate(0);
                                }
                                25% {
                                    transform: rotate(-5deg);
                                }
                                50% {
                                    transform: rotate(0);
                                }
                                75% {
                                    transform: rotate(5deg);
                                }
                                 100% {
                                    transform: rotate(0);
                                }
                            }
                            .custom-button {
                                transition: background-color 0.3s ease, opacity 0.3s ease;
                            }
                            .custom-button:active, .custom-button:focus {
                                background-color: #f0ad4e;
                                opacity: 1;
                            }
                            .custom-button:hover:active, .custom-button:hover:focus {
                                background-color: #f0ad4e;
                                opacity: 1;
                            }
                            .custom-button:hover {
                                opacity: 0.5;
                            }   
                        `}</style>
                    </div>
                ))
            }
        </div>
    )
};


const mapStateToProps = state => ({
    products: state.products,
});

const mapDispatchToState = dispatch => ({
    addProductToBasket: (title, id, price) => dispatch(addToBasket(title, id, price)),
});

export default connect(mapStateToProps, mapDispatchToState)(Products);
