import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import * as actionCretors from "../../../store/actions/index";
import "./RealDetail.css";

class RealDetail extends Component {
  componentDidMount() {
    this.props.onGetTodo(parseInt(this.props.match.params.id));
  }

  render() {
    let content = "",
      title = "";
    if (this.props.selectedTodo) {
      content = this.props.selectedTodo.content;
      title = this.props.selectedTodo.title;
    }
    return (
      <div className="RealDetail">
        <div className="row">
          <div className="left">Name</div>
          <div className="right">{title}</div>
        </div>
        <div className="row">
          <div className="left">Content</div>
          <div className="right">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTodo: state.td.selectedTodo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTodo: (id) => dispatch(actionCretors.getTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);
