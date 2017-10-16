import { TOGGLE_SIDE_BAR } from './types';

export default function(bool) {
    return {
        type: TOGGLE_SIDE_BAR,
        payload: bool
    };
}