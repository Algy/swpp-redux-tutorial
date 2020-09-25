import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';

import { NavLink } from 'react-router-dom';

import './TodoList.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import {withRouter} from 'react-router';
import axios from 'axios';
import * as actionCreators from '../../store/actions/index';
//chrome extension에서 redux 탭이 있는지 확인한다. 



const mapStateToProps = state => {
  return {
   // debugger 를 통해서 breakpoint를 만든다. 
    storedTodos: state.td.todos,
    selectedTodo: state.td.selectedTodo
  };
}

class TodoList extends Component {
  componentDidMount() {
    axios.get('/api/todo/')
      .then(result => console.log(result.data))
      .then(err => console.log(err));
    return this.props.onGetAll();
  }

  clickTodoHandler = (td) => {
    // if (this.state.selectedTodo === td) {
    //   this.setState({ ...this.state, selectedTodo: null });
    // } else {
    //   this.setState({ ...this.state, selectedTodo: td });
    // }
    this.props.history.push(`/todos/${td.id}/`); 
    // `/todos/${td.id}`
  }

  render() {
    const todos = this.props.storedTodos.map((td) => {
      
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clicked={() => this.clickTodoHandler(td)}
          clickDetail={() => this.clickTodoHandler(td)}
          clickDone={() => this.props.onToggleTodo(td.id)}
          clickDelete={() => this.props.onDeleteTodo(td.id)}
        />
      );
    });

    // let todo = null;
    // if (this.props.selectedTodo) {
    //   todo = <TodoDetail
    //     title={this.props.selectedTodo.title}
    //     content={this.props.selectedTodo.content}
    //   />
    // }
    return (
      <div className="TodoList">
        <div className='title'>
          {this.props.title}
        </div>
        <div className='todos'>
          {todos}
        </div>
        {/* {todo} */}
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleTodo: (id) =>
      // dispatch({type:actionTypes.TOGGLE_DONE, targetID:id}),
      dispatch(actionCreators.toggleTodo(id)),
    onDeleteTodo: (id) =>
      // dispatch({type:actionTypes.DELETE_TODO, targetID:id}),
      dispatch(actionCreators.deleteTodo(id)),
    // onToggleTodo: (id) => 
      // dispatch(actionCreators.toggleTodo(id)),
    onGetAll: () =>
      dispatch(actionCreators.getTodos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));