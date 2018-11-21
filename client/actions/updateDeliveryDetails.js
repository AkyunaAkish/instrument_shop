import { UPDATE_DELIVERY_DETAILS } from './types';

export default function (payload) {
    return {
        type: UPDATE_DELIVERY_DETAILS,
        payload
    };
}