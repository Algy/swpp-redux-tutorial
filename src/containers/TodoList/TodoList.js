import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';

import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionTypes';

import './TodoList.css';

class TodoList extends Component {
  state = {
    selectedTodo: null,
  }

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/' + td.id);
  }


  render() {
    const todos = this.props.storedTodos.map(td => {
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

    let todo = null;
    if (this.state.selectedTodo) {
      todo = <TodoDetail
        title={this.state.selectedTodo.title}
        content={this.state.selectedTodo.content}
      />
    }
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

const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onToggleTodo: (id) =>
      dispatch({ type: actionTypes.TOGGLE_DONE, targetID: id}),
    onDeleteTodo: (id) =>
      dispatch({ type: actionTypes.DELETE_TODO, targetID: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));