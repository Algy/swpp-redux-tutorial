
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from '../reducers/todo';


import { createStore, combineReducers } from 'redux';
const rootReducer = combineReducers({
    td: todoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));


