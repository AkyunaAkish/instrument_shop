import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sideBarReducer from './sideBarReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    form: formReducer,
    sideBar: sideBarReducer,
    cart: cartReducer
});

export default rootReducer;