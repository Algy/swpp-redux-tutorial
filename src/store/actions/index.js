
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './todo';


import { createStore, combineReducers } from 'redux';
const rootReducer = combineReducers({
    td: todoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));


