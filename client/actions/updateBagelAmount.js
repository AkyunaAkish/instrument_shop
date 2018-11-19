import { UPDATE_BAGEL_AMOUNT } from './types';

export default function (bagel, amt) {
    return {
        type: UPDATE_BAGEL_AMOUNT,
        payload: {
            bagel,
            amt
        }
    };
}