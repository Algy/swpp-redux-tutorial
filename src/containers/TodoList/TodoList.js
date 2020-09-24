import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';

import { NavLink } from 'react-router-dom';

import './TodoList.css';
import { connect } from  'react-redux';
import * as actionCreators from '../../store/actions/index';

import { withRouter } from 'react-router';


const mapStateToProps = state => {
  return{
    storedTodos: state.td.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAll: () =>
      dispatch(actionCreators.getTodos()),
    onDeleteTodo: (id) =>
      dispatch(actionCreators.deleteTodo(id)),
    onToggleTodo: (id) =>
      dispatch(actionCreators.toggleTodo(id)),
  };
};

class TodoList extends Component {
  state = {
    todos: [
      { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
      { id: 2, title: 'Movie', content: 'watch movie', done: false },
      { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ],
    selectedTodo: null,
  }
  
  componentDidMount() {
    this.props.onGetAll();
  }

  clickTodoHandler = (td) => {
    this.props.history.push(this.props.match.url + '/' + td.id);
  }

  render() {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickedDetail={() => this.clickTodoHandler(td)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));