import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import Router from './Router';
import reducers from './rootReducer';

const dev = NODE_ENV === 'development';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// only allow the redux dev tools chrome extension to work in development
const store = dev ? createStoreWithMiddleware(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) : createStoreWithMiddleware(reducers);

import './sass/style.scss';
import 'bootstrap-loader';

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <Router />
        </MuiThemeProvider>
    </Provider>, document.querySelector('#app'));