import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

const initialState = {
    todos: [
        // { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
        // { id: 2, title: 'Movie', content: 'watch movie', done: false },
        // { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
      ],
      selectedTodo: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TODO:
            const newTodo = {
                id: action.id,
                title: action.title,
                content: action.content,
                done: action.done
            }
            return {...state, todos: [...state.todos, newTodo]};
            case actionTypes.TOGGLE_DONE:
                const modified = state.todos.map((todo) => {
                    if(todo.id === action.targetID){
                        return { ...todo, done: !todo.done };
                    } else {
                        return { ...todo };
                    }
                });
                return {...state, todos: modified};
        case actionTypes.DELETE_TODO:
            const deleted = state.todos.filter((todo) => {
                return todo.id !== action.targetID;
            });
            return {...state, todos: deleted};
        case actionTypes.GET_TODO:
            return {...state, selectedTodo: action.target };

        case actionTypes.GET_ALL:
            return {...state, todos: action.todos };

        default:
            break;
    }
    return state;
}

export const getTodos_ = (todos) => {
    return { type: actionTypes.GET_ALL, todos: todos };
};

export const getTodos = () => {
    return dispatch => {
        return axios.get('/api/todo')
            .then(res => dispatch(getTodos_(res.data)));
    }
};

export const postTodo_ = (td) => {
    return {
        type: actionTypes.ADD_TODO,
        id: td.id,
        title: td.title,
        content: td.content
    };
};

export const postTodo = (td) => {
    return (dispatch) => {
        return axios.post('/api/todo/', td)
            .then(res => {
                dispatch(postTodo_(res.data));
            });
    }
}

export const deleteTodo_ = (id) => {
    return {
        type: actionTypes.DELETE_TODO,
        targetID: id
    };
};

export const deleteTodo = (id) => {
    return (dispatch) => {
        return axios.delete('/api/todo/' + id)
            .then(res => {
                dispatch(deleteTodo_(id));
            });
    };
};

export const toggleTodo_ = (id) => {
    return {
        type: actionTypes.TOGGLE_DONE,
        targetID: id
    };
};

export const toggleTodo = (id) => {
    return (dispatch) => {
        return axios.put("/api/todo/" + id)
            .then(res => {dispatch(toggleTodo_(id));});
    }
}

export const getTodo_ = (todo) => {
    return {
        type: actionTypes.GET_TODO,
        target: todo
    };
};

export const getTodo = (id) => {
    return (dispatch) => {
        return axios.get('/api/todo/' + id)
            .then(res => {
                dispatch(getTodo_(res.data));
            });
    };
};

export default reducer;