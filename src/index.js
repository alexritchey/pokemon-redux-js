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
import { TRAINER_TYPES } from './constants.js';

const reducers = coreReducers;
const logger = createLogger();
const initialState = {};

// Initial Store
const store = createStore(reducers, initialState, applyMiddleware(thunk, logger));

store.dispatch(coreActions.dispatchInitialSetup());
store.dispatch(coreActions.setTrainerPkmn([3], TRAINER_TYPES.PLAYER));
store.dispatch(coreActions.setTrainerPkmn([1], TRAINER_TYPES.OPPONENT));

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
