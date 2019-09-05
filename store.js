import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {products} from './api/products';

const exampleInitialState = {
    lastUpdate: 0,
    light: false,
    products: products,
    basketItems: [],
    totalPrice: 0,
};

export const actionTypes = {
    TICK: 'TICK',
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    BASKET_ITEM_INCREASED: 'BASKET_ITEM_INCREASED',
    BASKET_ITEM_DECREASED: 'BASKET_ITEM_DECREASED',
    BASKET_ITEM_REMOVED: 'BASKET_ITEM_REMOVED',
};



// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
    const items = [...state.basketItems];
    const itemIndex = items.findIndex(phone => phone.id === action.id);

    switch (action.type) {
        case actionTypes.TICK:
            return Object.assign({}, state, {
                lastUpdate: action.ts,
                light: !!action.light,
            });
        case actionTypes.ADD_TO_BASKET:
                if (itemIndex > -1) {
                    items[itemIndex] = {
                        ...items[itemIndex],
                        count: items[itemIndex].count + 1,
                        price: items[itemIndex].price + items[itemIndex].defaultPrice
                    };
                    return {
                        ...state,
                        basketItems: items,
                    };
                }
            return {
                ...state,
                basketItems: [...items, {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    defaultPrice: action.price,
                    count: 1,
                }],
            };

        case actionTypes.BASKET_ITEM_INCREASED:
            items[itemIndex] = {
                ...items[itemIndex],
                count: items[itemIndex].count + 1,
                price: items[itemIndex].price + items[itemIndex].defaultPrice,
            };
            return {
                ...state,
                basketItems: items
            };

        case actionTypes.BASKET_ITEM_DECREASED:
            if (items[itemIndex].count >= 2) {
                items[itemIndex] = {
                    ...items[itemIndex],
                    count: items[itemIndex].count - 1,
                    price: items[itemIndex].price - items[itemIndex].defaultPrice,
                };
            }
            return {
                ...state,
                basketItems: items,
            };

        case actionTypes.BASKET_ITEM_REMOVED:
            return {
                ...state,
                basketItems: state.basketItems.filter(item => item.id !== action.id),
            };
        default:
            return state
    }
}

// ACTIONS
export const serverRenderTimer = () => {
    return {type: actionTypes.TICK, light: false, ts: Date.now()}
};

export const startTimer = (endDate) => {
    return {type: actionTypes.TICK, light: true, ts: endDate,
    }
};

export const addToBasket = (name, id, price) => ({
    type: actionTypes.ADD_TO_BASKET,
    name,
    id,
    price: +price,
});

export const increaseBasketItem = (id) => ({
    type: actionTypes.BASKET_ITEM_INCREASED,
    id,
});

export const decreaseBasketItem = (id) => ({
    type: actionTypes.BASKET_ITEM_DECREASED,
    id,
});

export const removeBasketItem = id => ({
    type: actionTypes.BASKET_ITEM_REMOVED,
    id,
});

export function initializeStore(initialState = exampleInitialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware())
    )
}
