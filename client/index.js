import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import Router from './Router';
import reducers from './reducers/rootReducer';

import './sass/roboto_font.scss';
import './sass/style.scss';
import 'bootstrap-loader';
import 'font-awesome/css/font-awesome.min.css';

const dev = NODE_ENV === 'development';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = dev ? createStoreWithMiddleware(reducers,
                                              window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                              window.__REDUX_DEVTOOLS_EXTENSION__()) : createStoreWithMiddleware(reducers);

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'rgb(245, 222, 179)',
        primary2Color: 'rgb(245, 222, 179)',
        primary3Color: 'rgb(245, 222, 179)',
        accent1Color: '#282C34',
        accent2Color: 'rgb(245, 222, 179)',
        accent3Color: 'rgb(245, 222, 179)',
        textColor: 'rgb(245, 222, 179)',
        alternateTextColor: 'rgb(245, 222, 179)',
        canvasColor: '#282C34',
        borderColor: 'rgb(245, 222, 179)',
        disabledColor: 'rgb(245, 222, 179)',
        pickerHeaderColor: 'rgb(245, 222, 179)',
        clockCircleColor: 'rgb(245, 222, 179)',
        shadowColor: 'rgb(245, 222, 179)',
    }
});

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
            <Router />
        </MuiThemeProvider>
    </Provider>, document.querySelector('#app'));