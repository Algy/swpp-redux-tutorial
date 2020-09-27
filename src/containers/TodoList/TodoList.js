import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';

import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

import './TodoList.css';

class TodoList extends Component {
  state = {
    selectedTodo: null
  };

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/' + td.id);
  };

  deleteTodoHandler = (td) => {
    if (this.state.selectedTodo && td.id === this.state.selectedTodo.id) {
      this.setState({...this.state, selectedTodo: null});
    }
    this.props.onDeleteTodo(td.id);
  }

  render() {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo key={td.id} title={td.title} done={td.done}
          clickDetail={() => this.clickTodoHandler(td)}
          clickDone={() => this.props.onToggleTodo(td.id)}
          clickDelete={() => this.deleteTodoHandler(td)} />
      );
    });

    return (
      <div className="TodoList">
        <div className='title'>
          {this.props.title}
        </div>
        <div className='todos'>
          {todos}
        </div>
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    storedTodos: state.td.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => {
      dispatch({ type: actionTypes.TOGGLE_DONE, targetID: id });
    },
    onDeleteTodo: (id) => {
      dispatch({ type: actionTypes.DELETE_TODO, targetID: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));
