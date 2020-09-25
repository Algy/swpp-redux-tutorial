import * as actionTypes from "../actions/actionTypes";
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
    case actionTypes.ADD_TODO:
      const newTodo = {
        id: state.todos.length + 1,
        title: action.title,
        content: action.content,
        done: false,
      };
      return { ...state, todos: state.todos.concat(newTodo) };
    default:
      break;
  }
  return state;
};
export default reducer;
