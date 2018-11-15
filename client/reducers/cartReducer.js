import { ADD_TO_CART, FETCH_CART, REMOVE_FROM_CART } from '../actions/types';

const initialState = {
    cart: {}
};

export default function (state = initialState , action) {
    const newBagelState = { ...state.cart };

    switch (action.type) {
        case ADD_TO_CART:
            if(newBagelState[action.payload.bagel.type]) {
                newBagelState[action.payload.bagel.type].amt += action.payload.amt;
            } else {
                newBagelState[action.payload.bagel.type] = { ...action.payload.bagel, amt: action.payload.amt };
            }
            
            window.localStorage.bagelCart = JSON.stringify({ cart: newBagelState });
            return { cart: newBagelState };

        case REMOVE_FROM_CART:
            if(newBagelState[action.payload.bagel.type].amt) {
                newBagelState[action.payload.bagel.type].amt -= (action.payload.amt || 0);
            }
            
            window.localStorage.bagelCart = JSON.stringify({ cart: newBagelState });
            return { cart: newBagelState };

        case FETCH_CART:
            if(window.localStorage.bagelCart) {
                return JSON.parse(window.localStorage.bagelCart);
            } else {
                return { ...state };    
            }

        default:
            return { ...state };
    }
};