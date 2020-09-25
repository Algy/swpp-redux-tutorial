import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import * as actionCreators from '../../store/actions/index';
import{connect} from'react-redux';
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios'
import * as actionTypes from '../../store/actions/actionTypes'
import './TodoList.css';

class TodoList extends Component {
  componentDidMount()
  {
    this.props.onGetAll();
  }
  clickTodoHandler = (td) => {
    this.props.history.push(`/todos/ ${td.id}`)
  }

  render() {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickDelete={()=>this.props.onDeleteTodo(td.id)}
          clickDone={()=>this.props.onToggleTodo(td.id)}
          clickDetail={() => this.clickTodoHandler(td)}
        />
      );
    });

    let todo = null;
    
    return (
      <div className="TodoList">
        <div className='title'>
          {this.props.title}
        </div>
        <div className='todos'>
          {todos}
        </div>
        {todo}
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  }
}
//첫번째가 정보를 가져오는 함수 두번재가 정볼르 쏘는놈
const mapStateToProps=state=>{
  return{ 
    storedTodos:state.td.todos
 , selectedTodo: state.td.selectedTodo
  };
}
const mapDispatchToProps=dispatch=>{
  return{
    onToggleTodo: (id)=>dispatch({
      type:actionTypes.TOGGLE_DONE,targetID:id
    }),
    onDeleteTodo:(id)=> dispatch(actionCreators.deleteTodo(id)),
    onGetAll:()=> dispatch(actionCreators.getTodos())
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TodoList));