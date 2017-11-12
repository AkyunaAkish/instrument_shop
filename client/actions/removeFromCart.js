import { REMOVE_TO_CART } from './types';

export default function (bagel, onlyRemoveOne) {
    return {
        type: REMOVE_TO_CART,
        payload: {
            bagel,
            onlyRemoveOne
        }
    };
}