import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import todoReducer from './store/reducers/todo';
import thunk from 'redux-thunk';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory();
const rootReducer = combineReducers({
  td: todoReducer, router:connectRouter(history)
});

// const store = createStore((state = {}, action) => state); // TODO 
// 
const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching', action);
      const reusult = next(action);
      console.log('[Middleware] Next State', store.getState());
      return reusult;
    }
  }
}
const composeEnhancers = window.__REDUX__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
// const store = createStore(rootReducer, applyMiddleware(logger, thunk, routerMiddleware(history))) ;
const store = createStore(rootReducer, 
  composeEnhancers(
      applyMiddleware(logger, thunk, routerMiddleware(history)))
  );
  //  applyMiddleware(thunk, routerMiddleware(history)));
// applyMiddleware(thunk, routerMiddleware(history))
// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}><App history={history} /></Provider>, 
  document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
