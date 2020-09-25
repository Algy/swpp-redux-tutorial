import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router' ;
import { createBrowserHistory } from 'history' ;
import { applyMiddleware } from 'redux';


import thunk from 'redux-thunk';
import todoReducer from './store/reducers/todo';
const history = createBrowserHistory();
const rootReducer = combineReducers({
    td: todoReducer, router: connectRouter(history)
});

const store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));


<Provider store={store}> <App history={history} /> </Provider>,document.getElementById('root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
