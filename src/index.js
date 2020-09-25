import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

// At index.js of project root
import { Provider } from 'react-redux';
import { createStore, comebineReducers, applyMiddleware } from 'redux';
import todoReducer from './store/reducers/todo';

const rootReducer = combineReducers({
    td: todoReducer,
});
const store = createStore(rootReducer, applyMiddleware());


const store = createStore((state = {}, action) => state); // TODO
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
