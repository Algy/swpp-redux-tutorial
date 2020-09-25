import * as actionTypes from "../actions/actionTypes";
<<<<<<< HEAD
const initialState = {
  todos: [
    { id: 1, title: "SWPP", content: "take swpp class", done: true },
    { id: 2, title: "Movie", content: "watch movie", done: false },
    { id: 3, title: "Dinner", content: "eat dinner", done: false },
  ],
  selectedTodo: null,
};
=======

const initialState = {
  todos: [],
  selectedTodo: null,
};

>>>>>>> http-request
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      const newTodo = {
<<<<<<< HEAD
        id: state.todos.length + 1,
        title: action.title,
        content: action.content,
        done: false,
      };
      return { ...state, todos: state.todos.concat(newTodo) };
=======
        id: action.id,
        title: action.title,
        content: action.content,
        done: action.done,
      };
      return { ...state, todos: state.todos.concat(newTodo) };
    case actionTypes.DELETE_TODO:
      const deletedTodos = state.todos.filter((todo) => {
        return todo.id !== action.targetID;
      });
      return { ...state, todos: deletedTodos };
    case actionTypes.TOGGLE_DONE:
      const modified = state.todos.map((todo) => {
        if (todo.id === action.targetID) {
          return { ...todo, done: !todo.done };
        } else {
          return { ...todo };
        }
      });
      return { ...state, todos: modified };
    case actionTypes.GET_TODO:
      return { ...state, selectedTodo: action.target };
    case actionTypes.GET_ALL:
      return { ...state, todos: action.todos };
>>>>>>> http-request
    default:
      break;
  }
  return state;
};
<<<<<<< HEAD
=======

>>>>>>> http-request
export default reducer;
