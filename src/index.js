import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//provider안에있는 모든 컴포넌트들이 스토어를 이용가능하게 만들어줌
import {createStore,combineReducers,applyMiddleware} from 'redux';
import todoReducer from './store/reducers/todo'

const rootReducer=combineReducers({
    td: todoReducer //td 는 네임스페이스로 사용됨

});

const store=createStore(rootReducer,applyMiddleware(thunk));



ReactDOM.render(<Provider store={store}> <App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
