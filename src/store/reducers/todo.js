import { Provider } from 'react-redux';
import * as actionTypes from '../actions/actionTypes';


const initialState = {
    todos: [
          ],
    selectedTodo: null,
  };
const reducer =(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_TODO:
            const newTodo={
                id: state.todos.length+1,
                title:action.title,content:action.content,done:false

            }; 
            return {...state,todos:[... state.todos,newTodo]};
        case actionTypes.TOGGLE_DONE:
            const modified=state.todos.map(td=>{
                if(td.id===action.targetID)
                {
                    return {...td, done: !td.done};
                }
                else return td;
            });
            return {...state,todos:modified}
        case actionTypes.DELETE_TODO:
            const deleted=state.todos.filter((todo)=>{
                return todo.id!==action.targetID;
            }
            );
            return {...state,todos:deleted};
        case actionTypes.GET_TODO:
            return {...state,selectedTodo:action.target};
        case actionTypes.GET_ALL:
            return {...state,todos:action.todos}
        
    }
    return state;
}



export default reducer;