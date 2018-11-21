import { UPDATE_PAYMENT_DETAILS } from './types';

export default function (payload) {
    return {
        type: UPDATE_PAYMENT_DETAILS,
        payload
    };
}