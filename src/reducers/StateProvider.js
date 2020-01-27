// External
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Application
import todo from './index.js';

const rootReducer = combineReducers( {
    todo
} );

const store = createStore( rootReducer, applyMiddleware( thunk ) );

const StateProvider = props =>
    <Provider store={ store } {...props } />;

export default StateProvider;

