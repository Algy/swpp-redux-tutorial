import React, {Component} from 'react';

import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import {NavLink} from 'react-router-dom';
import './TodoList.css';
import * as actionTypes from '../../store/actions/actionTypes';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import axios from 'axios';
import * as actionCreators from '../../store/actions/index';

class TodoList extends Component {

    componentDidMount() {
        this.props.onGetAll();
    }

    clickTodoHandler = (td) => {
        this.props.history.push('/todos/' + td.id);
    }

    render() {
        const todos = this.props.storedTodos.map(td => {  //아래 mapstatetoprops에 storedtodos
            return (
                <Todo
                    key={td.id}
                    title={td.title}
                    done={td.done}
                    clickDetail={() => this.clickTodoHandler(td)}
                    clickDone={() => this.props.onToggleTodo(td.id)}
                    clickDelete={() => this.props.onDeleteTodo(td.id)}
                />
            );
        });

        let todo = null;
        if (this.props.selectedTodo) { //should erase this? 안지워도 동작 잘 됨
            todo = <TodoDetail
                title={this.state.selectedTodo.title}
                content={this.state.selectedTodo.content}
            />
        }
        return (
            <div className="TodoList">
                <div className='title'>
                    {this.props.title}
                </div>
                <div className='todos'>
                    {todos}
                </div>
                {todo}
                <NavLink to='/new-todo' exact>New Todo</NavLink>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        storedTodos: state.td.todos, // 왜냐면 index.js 에 td 라 써서
        selectedTodos: state.td.selectedTodos // local state가 없어지면서 global과 map
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleTodo: (id) =>
            dispatch(actionCreators.toggleTodo(id)),
        onDeleteTodo: (id) =>
            dispatch(actionCreators.deleteTodo(id)),
        onGetAll: () => dispatch(actionCreators.getTodos()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList)); // connect에 항상 추가
