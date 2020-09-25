import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import './NewTodo.css';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';

const mapDispatchToProps = dispatch => {
	return {
    onStoreTodo: (title, content) =>
      dispatch(actionCreators.postTodo({title: title, content: content}))
//		dispatch({ type: actionTypes.ADD_TODO, title: title, content: content })
//	};
  }
};

class NewTodo extends Component {
  state = {
    title: '',
    content: '',
    submitted: false
  }

  postTodoHandler = () => {
	  this.props.onStoreTodo(this.state.title, this.state.content);
	  //this.setState({ submitted: true });
	 
    const data =
      { title: this.state.title, content: this.state.content }
    alert('submitted' + data.title);
    // this.props.history.push('/todos');
    this.props.history.goBack();
    this.setState({ submitted: true });
	
  }

  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to='/todos' />
    }
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
          onChange={(event) => this.setState({ content: event.target.value })}
        >
        </textarea>
        <button onClick={() => this.postTodoHandler()}>Submit</button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(NewTodo);
