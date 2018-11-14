import { REMOVE_FROM_CART } from './types';

export default function (bagel, amt) {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            bagel,
            amt
        }
    };
}