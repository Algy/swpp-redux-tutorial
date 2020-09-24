import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';

import './NewTodo.css';

class NewTodo extends Component {
  state = {
    title: '',
    content: '',
    submitted: false
  }

  postTodoHandler = () => {
    this.props.onStoreTodo(this.state.title,this.state.content);
    this.setState({ submitted: true });
    alert('submitted ' + this.state.title);
    this.props.history.goBack();
  }

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
        <textarea rows="4" type="text" value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.content })}
        >
        </textarea>
        <button onClick={() => this.postTodoHandler()}>Submit</button>
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onStoreTodo:(title,content)=>
      dispatch(actionCreators.postTodo({title,content}))
  };
};

export default connect(null,mapDispatchToProps)(NewTodo);