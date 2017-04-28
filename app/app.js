import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import appReducer from './reducers/appReducer';

import Main from './components/Main';

injectTapEventPlugin();

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
}

const store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Main />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);
