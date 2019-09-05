import {connect} from 'react-redux';
import React from 'react';

import {
    increaseBasketItem,
    decreaseBasketItem,
    removeBasketItem,
} from '../store';

const BasketItems = ({
                         tweenTitle,
                         products,
                         totalProducts,
                         totalProductsPrice,
                         increaseItem,
                         decreaseItem,
                         removeItem,

                     }) => {
    return (
        <div className="row rounded">
            <div className="col-md-8 mb-4">
                <h3
                    className="title d-flex justify-content-between align-items-center mb-3"
                >
                    <div ref={div => tweenTitle = div}
                         className="text-muted">Your Basket
                    </div>
                    <span className="badge badge-pill badge-dark">{totalProducts}</span>
                </h3>
                <ul className="list-group mb-3">
                    {products.map(({name, id, count, price}) => (
                        <li
                            key={id}
                            className="list-group-item d-flex justify-content-between align-items-center lh-condensed"
                        >
                            <div className="text-secondary p-1">{name}</div>
                            <div className=" d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => decreaseItem(id)}
                                >
                                    -
                                </button>
                                <div className="p-2">{count}</div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => increaseItem(id)}
                                >
                                    +
                                </button>

                            </div>
                            <div className="text-warning text-left">Price: {price}</div>
                            <button
                                type="button"
                                className="btn btn-warning "
                                onClick={() => removeItem(id)}
                            >
                                x
                            </button>
                        </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-end">
                        <div className="text-secondary p-2">
                            <span>Total price: </span> <span>{totalProductsPrice}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <style jsx>{`
             .custom-button {
                transition: background-color 0.5s ease;
             }
             @media (max-width: 500px) {
                .btn {
                    padding:0 0.25rem;
                }
                .list-group-item {
                     padding: 0.5rem;
                }
             }
            `}</style>
        </div>
    )
};

const mapStateToProps = state => ({
    products: state.basketItems,
    totalProducts: state.basketItems
        .map(item => item.count)
        .reduce((sum, current) => {
            return sum + current;
        }, 0),
    totalProductsPrice: state.basketItems
        .map(item => item.price)
        .reduce((sum, current) => {
            return sum + current;
        }, 0),
});

const mapDispatchToProps = dispatch => ({
    increaseItem: (id) => dispatch(increaseBasketItem(id)),
    decreaseItem: (id) => dispatch(decreaseBasketItem(id)),
    removeItem: (productId) => dispatch(removeBasketItem(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItems);