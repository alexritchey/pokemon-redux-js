import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Root from './App';
import coreReducers from './core/reducers/index.js';
import * as coreActions from './core/actions/index.js';

const reducers = coreReducers;
const logger = createLogger();
const initialState = {};

// Initial Store
const store = createStore(reducers, initialState, applyMiddleware(thunk, logger));

store.dispatch(coreActions.dispatchInitialSetup());
store.dispatch(coreActions.setTrainerPkmn([7], 'player'));
store.dispatch(coreActions.setTrainerPkmn([1], 'opponent'));

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
