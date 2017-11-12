import { ADD_TO_CART, FETCH_CART, REMOVE_TO_CART } from '../actions/types';

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
                window.localStorage.bagelCart = JSON.stringify(JSON.parse(window.localStorage.bagelCart).concat([action.payload]));
                return { ...state, cart: state.cart.concat([action.payload]) };
            }
        case REMOVE_TO_CART:
            if(window.localStorage.bagelCart) {
                let hasRemovedOneAlready = false;

                const filteredCart = JSON.parse(window.localStorage.bagelCart).filter((bagel) => {
                    if(hasRemovedOneAlready && action.payload.onlyRemoveOne) {
                        return true;
                    } else if(!action.payload.onlyRemoveOne || !hasRemovedOneAlready) {
                        if (action.payload.bagel.type !== bagel.type) {
                            return true;
                        } else {
                            hasRemovedOneAlready = true;
                            return false;
                        }
                    }              
                });

                window.localStorage.bagelCart = JSON.stringify(filteredCart);
                return { ...state, cart: filteredCart };
            } else {
                return { ...state };    
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