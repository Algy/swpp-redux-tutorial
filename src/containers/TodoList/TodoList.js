import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';

import { NavLink } from 'react-router-dom';

import './TodoList.css';

import { connect } from 'react-redux';
import {withRouter} from 'react-router';

import * as actionCreators from '../../store/actions/index'

class TodoList extends Component {
  state = {
    todos: [],
    selectedTodo: null,
  }

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/'+td.id);
  }

  componentDidMount(){
    this.props.onGetAll();
  }

  render() {
    const todos = this.props.storedTodos.map(td => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickDetail = {()=>this.clickTodoHandler(td)}
          clickDone={()=>this.props.onToggleTodo(td.id)}
          clickDelete={()=>this.props.onDeleteTodo(td.id)}
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
      dispatch(actionCreators.toggleTodo(id)),
    onDeleteTodo: (id) =>
      dispatch(actionCreators.deleteTodo(id)),
    onGetAll: () => dispatch(actionCreators.getTodos()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));