import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import Todo from '../../components/Todo/Todo';
import * as actionCreators from '../../store/actions/index';

import { NavLink } from 'react-router-dom';

import './TodoList.css';

class TodoList extends Component {
  /*state = {
    todos: [
      { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
      { id: 2, title: 'Movie', content: 'watch movie', done: false },
      { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ],
    selectedTodo: null,
  }*/

  componentDidMount() {
    this.props.onGetAll();
  }

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/'+td.id);
    if (this.props.selectedTodo === td) {
      this.setState({ ...this.state, selectedTodo: null });
    } else {
      this.setState({ ...this.state, selectedTodo: td });
    }
  }

  render() {
    
    const todos = this.props.storedTodos.map(td => 
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickDelete = {() => this.props.onDeleteTodo(td.id)}
          clickDone = {() => this.props.onToggleTodo(td.id)}
          clickDetail = {() => this.clickTodoHandler(td)}
        />
      );

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
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTodo: (id) => {
      dispatch(actionCreators.deleteTodo(id))
    },
    onToggleTodo: (id) => {
      dispatch(actionCreators.toggleTodo(id))
    },
    onGetAll: () => dispatch(actionCreators.getTodos())
  }
}
const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos,
    selectedTodo: state.td.selectedTodo,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));