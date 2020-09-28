import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';

import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';

import './TodoList.css';

class TodoList extends Component {
  componentDidMount() {
    this.props.onGetAll();
  }

  state = {
    selectedTodo: null
  };

  clickTodoHandler = (id) => {
    this.props.history.push('/todos/' + id);
    this.props.onGetTodoDetail(id);
  };

  deleteTodoHandler = (td) => {
    if (this.state.selectedTodo && td.id === this.state.selectedTodo.id) {
      this.setState({...this.state, selectedTodo: null});
    }
    this.props.onDeleteTodo(td.id);
  };

  render() {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo key={td.id} title={td.title} done={td.done}
          clickDetail={() => this.clickTodoHandler(td.id)}
            // this.props.onGetTodoDetail(td.id)}
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
    onGetAll: () => dispatch(actionCreators.getTodos()),
    onGetTodoDetail: (id) => dispatch(actionCreators.getTodoDetail(id)),
    onToggleTodo: (id) => dispatch(actionCreators.toggleTodo(id)),
    onDeleteTodo: (id) => dispatch(actionCreators.deleteTodo(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));
