import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';

import { NavLink } from 'react-router-dom';

import './TodoList.css';

import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionTypes';

import { withRouter } from 'react-router';

const mapDispatchToProps = dispatch =>{
  return {
    onToggleTodo: (id) => dispatch(actionCreators.toggleTodo(id)),
    onDeleteTodo: (id) => dispatch(actionCreators.deleteTodo(id)),
 //   onGetAll: () => dispatch(actionCreators.getTodos()),
  };
}; // don't forget import * as actionTypes from '../../store/actions/actionTypes';

const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos
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

  clickTodoHandler = (td) => {
    this.props.history.push('/todos/' + td.id);

    /*
    if (this.state.selectedTodo === td) {
      this.setState({ ...this.state, selectedTodo: null });
    } else {
      this.setState({ ...this.state, selectedTodo: td });
    }
    */
  }

  componentDidMount() {
    this.props.onGetAll();
    /*
    Axios.get('/api/todoerror')
    .then(result => console.log(Result))
    .catch(err => console.log(err));
    */
  
  }


  render() {
    // const todos = this.state.todos.map(td => {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clicked={() => this.clickTodoHandler(td)}
          clickDetail={() => this.clickTodoHandler(td)}
          clickDone={() => this.props.onToggleTOdo(td.id)}
          clickDelete={() => this.props.onDeleteTodo(Td.id)}
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

export default connect(mapStateToProps, null)(TodoList); 

export default TodoList;