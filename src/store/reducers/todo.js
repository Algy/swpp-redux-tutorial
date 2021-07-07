import {ADD_TODO, DELETE_TODO, TOGGLE_DONE, GET_TODO, GET_ALL} from '../actions/actionTypes';
// ADD_TODO DELETE_TODO 등등이 *에 해당한다. 
//import ADD_TODO 이런 식으로 하면, case ADD_TODO ㅣㅇ렇게 하면 된다. 

const initialState = {
    todos: [
      // { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
      // { id: 2, title: 'Movie', content: 'watch movie', done: false },
      // { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ],
    selectedTodo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: 
      const newTodo = {
        id: action.id,
        title: action.title,
        content:action.content,
        done: action.done
      }
      // state.todos.push(newTodo) // BAD
      // state.todos.concat(newTodo) 뒤에 나오는 인자를 붙여서 새로운 리스트를 만들어준다 
      // 두번째 방법은 사용할 수 있다 ㅎㅎㅎㅎㅎㅎㅎㅎ 
      
      return {...state, todos: state.todos.concat(newTodo)};
      // return {...state, todos: [ ...state.todos, newTodo]};
      // action.targetID => parseInt(action.targetID)
    case DELETE_TODO:
      const filtered = state.todos.filter(td => {return td.id !== action.targetID});
      return {...state, todos: filtered};

    case TOGGLE_DONE: 
      const modified = state.todos.map((todo) => {
        if(todo.id === action.targetID) {
          return { ...todo, done: !todo.done};
        } else {
          return {...todo}; // todo;
        }
      });
      return { ...state, todos: modified };
    
    case GET_TODO:
      // const selectedTodo = state.todos.find(td => td.id === action.targetId);
      return {...state, selectedTodo: action.target};

    case GET_ALL:
      return {...state, todos: action.todos};
    default: 
      break;
  }
  return state;
};

export default reducer;