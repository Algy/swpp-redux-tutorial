import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';


import './RealDetail.css';

const mapStateToProps = state => {
  return {
    selectedTodo: state.td.selectedTodo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetTodo: id => dispatch(actionCreators.getTodo(id)),
  };
};
class RealDetail extends Component {
  componentDidMount() {
    this.props.onGetTodo(parseInt(this.props.match.params.id));
  }

  render() {
    let title = 'a'; let content = 'b';
    if (this.props.selectedTodo) {
      title = this.props.selectedTodo.title;
      content = this.props.selectedTodo.content;
    }
    return (
      <div className="RealDetail" >
        <div className="row">
          <div className="left">
            Name:
        </div>
          <div className="right">
            {title}
          </div>
        </div>
        <div className="row">
          <div className="left">
            Content:
        </div>
          <div className="right">
            {content}
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);