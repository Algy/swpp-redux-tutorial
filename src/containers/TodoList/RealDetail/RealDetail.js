import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';

import './RealDetail.css';

class RealDetail extends Component {
 componentDidMount() {
  // it’s safe to get state after component mounted
  this.props.onGetTodo(this.props.match.params.id);
 }

 render() {
    let title = ''; let content = '';
    console.log(this.props);
    if (this.props.selectedTodo) {
      title = this.props.selectedTodo.title;
      content = this.props.selectedTodo.content;
    }
    return (
      <div className="RealDetail" >
        <div className="row">
          <div className="left">
            <div className="right">{title}</div>
        </div>
          <div className="right">
          </div>
        </div>
        <div className="row">
          <div className="left">
            <div className="right">{content}</div>
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
          selectedTodo: state.td.selectedTodo,
               };
};
const mapDispatchToProps = dispatch => {
     return {
          onGetTodo: id =>
               dispatch({ type: actionTypes.GET_TODO, targetID: id }),
               };
};
export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);
