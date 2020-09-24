import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import todoReducer from './store/reducers/todo';

import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    /* in this case, we have only single reducer,
    * but we can merge reducers by using combineReducers for bigger project */
    td: todoReducer,
});   

const logger = store => {
        return next => {
            return action => {
                console.log('[Middleware] Dispatching', action);
                const result = next(action);
                console.log('[Middleware] Next State', store.getState());
                return result;
        }
    }
};
 
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
