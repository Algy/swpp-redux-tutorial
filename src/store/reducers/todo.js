import {
  ADD_TODO,
  TOGGLE_DONE,
  DELETE_TODO,
  GET_TODO,
  GET_ALL,
} from "../actions/actionTypes";

const initialState = {
  todos: [
    { id: 1, title: "SWPP", content: "take swpp class", done: true },
    { id: 2, title: "Movie", content: "watch movie", done: false },
    { id: 3, title: "Dinner", content: "eat dinner", done: false },
  ],
  selectedTodo: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        id: action.id,
        title: action.title,
        content: action.content,
        done: action.done,
      };
      return { ...state, todos: [...state.todos.concat(newTodo)] };

    case TOGGLE_DONE:
      const modified = state.todos.map((todo) => {
        if (todo.id === action.targetID) {
          return { ...todo, done: !todo.done };
        } else {
          return { ...todo };
        }
      });
      return { ...state, todos: modified };

    case DELETE_TODO:
      const deleted = state.todos.filter((todo) => {
        return todo.id !== action.targetID;
      });
      return { ...state, todos: deleted };

    case GET_TODO:
      const selectedTodo = state.todos.find((td) => td.id === action.targetID);
      return { ...state, selectedTodo: action.target };

    case GET_ALL:
      return { ...state, todos: action.todos };
  }
  return state;
};

export default reducer;
