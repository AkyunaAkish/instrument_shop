import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sideBarReducer from './sideBarReducer';

const rootReducer = combineReducers({
    form: formReducer,
    sideBar: sideBarReducer
});

export default rootReducer;