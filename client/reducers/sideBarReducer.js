import { TOGGLE_SIDE_BAR } from '../actions/types';

const initialState = {
    sideBarOpen: false
};

export default function (state = initialState , action) {
    switch (action.type) {
        case TOGGLE_SIDE_BAR:
            return { ...state, sideBarOpen: action.payload !== undefined ? action.payload : !state.sideBarOpen };
        default:
            return { ...state };
    }
};