import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';

import './TodoList.css';

class TodoList extends Component {
  componentDidMount() {
    this.props.onGetAll();
  }

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/' + td.id);
  }

  render() {
    //
      console.log(this.props.storedTodos)
      const todos = this.props.storedTodos.map(td => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickDetail={() => this.clickTodoHandler(td)}
          clickDone={() => this.props.onToggleTodo(td.id)}
          clickDelete={() => this.props.onDeleteTodo(td.id)}
        />
      );
    });

/*    let todo = null;
    if (this.props.selectedTodo) {
      todo = <TodoDetail
        title={this.state.selectedTodo.title}
        content={this.state.selectedTodo.content}
      />
    }*/
    return (
      <div className="TodoList">
        <div className='title'>
          {this.props.title}
        </div>
        <div className='todos'></div>
          {todos}
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos,
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onToggleTodo: (id) => dispatch( {type: actionTypes.TOGGLE_DONE, targetID: id }),
    onDeleteTodo: (id) => dispatch({ type: actionTypes.DELETE_TODO, targetID: id}),
    onGetAll: ()=> dispatch(actionCreators.getTodos()),
    onDeleteTodo: (id)=> dispatch(actionCreators.deleteTodo(id)),
    onToggleTodo:(id)=> dispatch(actionCreators.toggleTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));