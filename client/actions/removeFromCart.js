import { REMOVE_TO_CART } from './types';

export default function (bagel, amt) {
    return {
        type: REMOVE_TO_CART,
        payload: {
            bagel,
            amt
        }
    };
}