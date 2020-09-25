
import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';


const initialState = {
    todos: [ /*copy from TodoList!*/ 
        { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
        { id: 2, title: 'Movie', content: 'watch movie', done: false },
        { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ], selectedTodo: null
};
const reducer = (state = initialState, action) => {
    // at next page
    switch (action.type) {
        // we will handle actions via switch statement
        case actionTypes.ADD_TODO:
            // as React, do not mutate state directly, make new object
            const newTodo = {
                id: action.id, title: action.title, content: 
            action.content, done: action.done
            }
            return {...state, todos: [...state.todos, newTodo]};

        case actionTypes.DELETE_TODO:
            const deleted = state.todos.filter((todo) => {
                return todo.id !== action.targetID;
            });
            return {...state, todos: deleted};

        case actionTypes.TOGGLE_DONE:
            const modified = state.todos.map((todo)=>{
                if (todo.id === action.targetID){
                    return { ...todo, done: !todo.done };
                } else {
                    return { ...todo};
                }
            });
            return { ...state, todos: modified };

        case actionTypes.GET_TODO:
            return { ...state, selectedTodo: action.target };

        case actionTypes.GET_ALL:
            return {...state, todos: action.todos };

        default:
            break;
    }
    return state;
};


export default reducer;
export const getTodos_ = (todos) => {
    return { type: actionTypes.GET_ALL, todos: todos };
};

export const getTodos = () => { // Why no argument? We'll see later.
    return dispatch => {
        return axios.get('/api/todo')
            .then(res => dispatch(getTOdos_(res.data)));

    };
};