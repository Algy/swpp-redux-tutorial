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
        id: state.todos.length + 1,
        title: action.title, content: action.content,
        done: false
      };
      // state.todos.push(newTodo);//Bad!!
      return { ...state, todos: [...state.todos,newTodo] };
      // concat has the same meaning
    case actionTypes.TOGGLE_DONE:
      const modified = state.todos.map((td) => {
        if (td.id === action.targetID) {
          return { ...td, done: !td.done };
        } else {
          return { ...td };
        }
      });
      return { ...state, todos: modified };
    case actionTypes.DELETE_TODO:
      const deletedTodos = state.todos.filter((todo) => {
          return todo.id !== action.targetID;
      });
      return { ...state, todos: deletedTodos };
    case actionTypes.GET_TODO:
      /*
      const target = { ...state.todos[action.targetID - 1] };
      return { ...state, selectedTodo: target };*/
      const selectedTodo = state.todos.find(td=> td.id===action.targetID);
      return {...state, selectedTodo};
    default:
      break;
  }
  return state;
};

export default reducer;
//you can import this name as any name you want in other js files. (cuz it's exported as default)