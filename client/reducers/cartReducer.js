import { ADD_TO_CART, FETCH_CART } from '../actions/types';

const initialState = {
    cart: []
};

export default function (state = initialState , action) {
    switch (action.type) {
        case ADD_TO_CART:
            if(!window.localStorage.bagelCart) {
                window.localStorage.bagelCart = JSON.stringify([]);
                window.localStorage.bagelCart = JSON.stringify(JSON.parse(window.localStorage.bagelCart).concat([action.payload]));
                return { ...state, cart: state.cart.concat([action.payload]) };
            } else {
                const cartHasBagelAlready = JSON.parse(window.localStorage.bagelCart).reduce((bool, bagel) => {
                    if(action.payload.type === bagel.type) {
                        bool = true;
                    }

                    return bool;
                }, false);

                if (!cartHasBagelAlready) {
                    window.localStorage.bagelCart = JSON.stringify(JSON.parse(window.localStorage.bagelCart).concat([action.payload]));
                    return { ...state, cart: state.cart.concat([action.payload]) };
                } else {
                    return { ...state };
                }
            }
        case FETCH_CART:
            if(window.localStorage.bagelCart) {
                return { ...state, cart: JSON.parse(window.localStorage.bagelCart) };
            } else {
                return { ...state };    
            }
        default:
            return { ...state };
    }
};