import React, { Component } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";
import "./TodoList.css";

class TodoList extends Component {
  componentDidMount() {
    this.props.onGetAll();
  }

  clickTodoHandler = (td) => {
    this.props.history.push("/todos/" + td.id);
  };

  render() {
    const todos = this.props.storedTodos.map((td) => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clicked={() => this.clickTodoHandler(td)}
          clickDone={() => this.props.onToggleTodo(td.id)}
          clickDelete={() => this.props.onDeleteTodo(td.id)}
          clickDetail={() => this.clickTodoHandler(td.id)}
        />
      );
    });

    let todo = null;
    if (this.props.selectedTodo) {
      todo = (
        <TodoDetail
          title={this.props.selectedTodo.title}
          content={this.props.selectedTodo.content}
        />
      );
    }
    return (
      <div className="TodoList">
        <div className="title">{this.props.title}</div>
        <div className="todos">{todos}</div>
        {todo}
        <NavLink to="/new-todo" exact>
          New Todo
        </NavLink>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => dispatch(actionCreators.toggleTodo(id)),
    onDeleteTodo: (id) => dispatch(actionCreators.deleteTodo(id)),
    onGetAll: () => dispatch(actionCreators.getTodos()),
  };
};
const mapStateToProps = (state) => {
  return {
    storedTodos: state.td.todos,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TodoList));
