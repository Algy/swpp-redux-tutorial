import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreators from '../../../store/actions/index';

import './RealDetail.css';

class RealDetail extends Component {
  componentDidMount() {
    this.props.onGetTodo(this.props.match.params.id);
  }

  render() {
    let title = '';
    let content = '';
    if (this.props.selectedTodo) {
      title = this.props.selectedTodo.title;
      content = this.props.selectedTodo.content;
    }

    return (
      <div className="RealDetail" >
        <div className="row">
          <div className="left">
            Name:{title}
        </div>
          <div className="right">
          </div>
        </div>
        <div className="row">
          <div className="left">
            Content:{content}
        </div>
          <div className="right">
          </div>
        </div>
      </div>
    );
  }
};

const mapstateToProps = dispatch => {
  return {
    onGetTodo: id => dispatch(actionCreators.getTodo(id)),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTodo: id => dispatch(actionCreators.getTodo(id))
  }
}

export default connect(mapstateToProps, mapDispatchToProps)(RealDetail);