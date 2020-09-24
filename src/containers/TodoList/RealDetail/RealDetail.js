import React, { Component } from 'react';
import { connect } from 'react-redux'

import './RealDetail.css';
import * as actionCreators from '../../../store/actions'
import * as actionTypes from '../../../store/actions/actionTypes'


class RealDetail extends Component {
  componentDidMount() {
    // this.props.match.params.id is string, not integer
    // 주소창의 parameter가 string으로 온다
    this.props.onGetTodo(parseInt(this.props.match.params.id))
  }

  render() {
    let title = ''
    let content = ''

    if (this.props.selectedTodo) {
      title = this.props.selectedTodo.title
      content = this.props.selectedTodo.content
    }

    return (
      <div className="RealDetail" >
        <div className="row">
          <div className="left">
            Name: {title}
        </div>
          <div className="right">
          </div>
        </div>
        <div className="row">
          <div className="left">
            Content: {content}
        </div>
          <div className="right">
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    selectedTodo: state.td.selectedTodo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTodo: id => dispatch(actionCreators.getTodo(id))
    // onGetTodo: id => dispatch({type: actionTypes.GET_TODO, targetID: id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);