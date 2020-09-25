import React, {Component} from 'react';
import './RealDetail.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
/*
*/
class RealDetail extends Component {
    componentDidMount() { // 브라우저에 마운트 된 직후에 불리는 훅
        this.props.onGetTodo(parseInt(this.props.match.params.id)); // app.js의 id
    }

    render() { // 렌더 한번 불리고난 다음에 불리는 훅. gettodo전에 null check를 해줘야 함.
        let title = '';
        let content = '';
        if (this.props.selectedTodo) {
            title = this.props.selectedTodo.title;
            content = this.props.selectedTodo.content;
        }
        return (
            <div className="RealDetail">
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

const mapStateToProps = state => {
    return {
        selectedTodo: state.td.selectedTodo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGetTodo: id =>
            dispatch(actionCreators.getTodo(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RealDetail);