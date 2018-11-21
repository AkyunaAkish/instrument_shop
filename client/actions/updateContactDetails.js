import { UPDATE_CONTACT_DETAILS } from './types';

export default function (payload) {
    return {
        type: UPDATE_CONTACT_DETAILS,
        payload
    };
}