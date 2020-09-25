import * as actionTypes from './actionTypes'; 
import axios from 'axios';

export const getTodos_ = (todos) => { 
    return { type: actionTypes.GET_ALL, todos: todos }; 
};

export const getTodos = () => { // Why no argument? We’ll see later.
    return dispatch => { 
        return axios
            .get('/api/todo') 
            .then(res => dispatch(getTodos_(res.data))); 
    } 
} 
