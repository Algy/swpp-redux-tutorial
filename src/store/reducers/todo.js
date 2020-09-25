import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos: [
        { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
        { id: 2, title: 'Movie', content: 'watch movie', done: false },
        { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ],
    selectedTodo: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            const newTodo = {
                id: state.todos.length + 1, // temporary
                title: action.title, content: action.content, done:false
            };
            return {...state, todos: state.todos.concat(newTodo)};
        case actionTypes.TOGGLE_DONE:
            const modified = state.todos.map((td) => {
                if (td.id === action.targetID) {
                    return { ...td, done: !td.done };
                } else {
                    return { ...td };
                }
            });
            return { ...state, todos: modified }
        case actionTypes.DELETE_TODO:
            const deleted = state.todos.filter((td) => td.id !== action.targetID);
            return { ...state, todos: deleted };    
        case actionTypes.GET_TODO:
            //const selectedTodo = state.todos.find(td => td.id === action.targetID);
            //return {...state, selectedTodo};
            const target = {...state.todos[action.targetID - 1]}; // temporary
            return { ...state, selectedTodo: action.target };   
        case actionTypes.GET_ALL:
            return {...state, todos: action.todos };    
        default:
            break;
    }
    return state;
   };

   export default reducer;