import React, { Component } from 'react';
import { connect } from 'react-redux';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import * as actionTypes from '../../store/actions/actionTypes';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import * as actionCreators from '../../store/actions/todo';
import './TodoList.css';

class TodoList extends Component {
  componentDidMount() {
    this.props.onGetAll();
  }
    
  clickTodoHandler = (td) => {
    this.props.history.push('/todos/' + td.id);
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

  /*let todo = null;
  if (this.props.selectedTodo) {
    todo = <TodoDetail
      title={this.props.selectedTodo.title}
      content={this.props.selectedTodo.content}
    />
  }*/
  
  return (
      <div className="TodoList">
        <div className='title'>
          {this.props.title}
        </div>
        <div className='todos'>
          {todos}
        </div>
        {/*todo*/}
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
  )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectTodo: (selectedTodo) =>
      dispatch({ type: actionTypes.SELECT_TODO, selectedTodo: selectedTodo }),
    onToggleTodo: (id) =>
         dispatch(actionCreators.toggleTodo(id)),
    /*onToggleTodo: (id) =>
      dispatch({ type: actionTypes.TOGGLE_DONE, targetID: id }),*/
    onDeleteTodo: (id) =>
         dispatch(actionCreators.deleteTodo(id)),
    /*onDeleteTodo: (id) =>
      dispatch({ type: actionTypes.DELETE_TODO, targetID: id }),*/
    onGetAll: () => dispatch(actionCreators.getTodos()),
  };
};

const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos,
    selectedTodo: state.td.selectedTodo
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));
