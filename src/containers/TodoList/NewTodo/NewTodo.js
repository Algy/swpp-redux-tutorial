import React, { Component } from "react";
<<<<<<< HEAD
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import { Redirect } from "react-router-dom";

import "./NewTodo.css";
=======

import "./NewTodo.css";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
>>>>>>> http-request

class NewTodo extends Component {
  state = {
    title: "",
    content: "",
<<<<<<< HEAD
    submitted: false,
=======
>>>>>>> http-request
  };

  postTodoHandler = () => {
    this.props.onStoreTodo(this.state.title, this.state.content);
<<<<<<< HEAD
    this.setState({ submitted: true });
=======
>>>>>>> http-request
  };

  render() {
    return (
      <div className="NewTodo">
        <h1>Add a New Todo!</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        ></input>
        <label>Content</label>
        <textarea
          rows="4"
          type="text"
          value={this.state.content}
<<<<<<< HEAD
          onChange={(event) => this.setState({ content: event.target.content })}
=======
          onChange={(event) => this.setState({ content: event.target.value })}
>>>>>>> http-request
        ></textarea>
        <button onClick={() => this.postTodoHandler()}>Submit</button>
      </div>
    );
  }
}
<<<<<<< HEAD
const mapDispatchToProps = (dispatch) => {
  return {
    onStoreTodo: (title, content) =>
      dispatch({ type: actionTypes.ADD_TODO, title: title, content: content }),
  };
};
=======

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreTodo: (title, content) =>
      dispatch(actionCreators.postTodo({ title: title, content: content })),
  };
};

>>>>>>> http-request
export default connect(null, mapDispatchToProps)(NewTodo);
