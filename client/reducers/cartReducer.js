import { ADD_TO_CART, FETCH_CART, REMOVE_TO_CART } from '../actions/types';

const initialState = {
    cart: []
};

export default function (state = initialState , action) {
    switch (action.type) {
        case ADD_TO_CART:
            const newBagelInstances = [];

            if (action.payload.amt && typeof action.payload.amt == 'number') {
                for(let i = 0; i < action.payload.amt; i++) {
                    newBagelInstances.push(action.payload.bagel);
                }
            } else {
                newBagelInstances.push(action.payload.bagel);
            }

            if(!window.localStorage.bagelCart) {
                window.localStorage.bagelCart = JSON.stringify([]);
                window.localStorage.bagelCart = JSON.stringify(JSON.parse(window.localStorage.bagelCart).concat(newBagelInstances));
                return { ...state, cart: state.cart.concat(newBagelInstances) };
            } else {
                window.localStorage.bagelCart = JSON.stringify(JSON.parse(window.localStorage.bagelCart).concat(newBagelInstances));
                return { ...state, cart: state.cart.concat(newBagelInstances) };
            }
        case REMOVE_TO_CART:
            if(window.localStorage.bagelCart) {
                let amtToRemove = action.payload.amt;

                const filteredCart = JSON.parse(window.localStorage.bagelCart).filter((bagel) => {
                    if (action.payload.bagel.type == bagel.type && amtToRemove > 0) {
                        amtToRemove--;
                        return false;
                    } else { 
                        return true;
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