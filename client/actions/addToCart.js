import { ADD_TO_CART } from './types';

export default function (bagel, amt) {
    return {
        type: ADD_TO_CART,
        payload: {
            bagel,
            amt
        }
    };
}