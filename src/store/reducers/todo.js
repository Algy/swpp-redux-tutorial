import React from 'react';


import * as actionTypes from '../actions/actionTypes';

import axios from 'axios';

const initialState = {
    todos: [
    ],
    selectedTodo: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            const newTodo = {
                id: state.todos.length + 1,
                title: action.title, content: action.content, done:false
            }
            return {...state, todos: state.todos.concat(newTodo)};
        case actionTypes.DELETE_TODO:
            const deleted = state.todos.filter((todo) => {
                return todo.id !== action.targetID;
            });
            return { ...state, todos: deleted };
        case actionTypes.TOGGLE_DONE:
            const modified = state.todos.map((todo) => {
                if (todo.id === action.targetID) {
                    return { ...todo, done: !todo.done };
                } else {
                    return { ...todo };
                }
            });
            return { ...state, todos:modified };
        case actionTypes.GET_TODO:
            const target = state.todos.find(td => td.id === action.targetID);
            return { ...state, selectedTodo: target };
        case actionTypes.GET_ALL:
            return {...state, todos: action.todos};
        default:
            break;
    }

    return state;
}

export default reducer;