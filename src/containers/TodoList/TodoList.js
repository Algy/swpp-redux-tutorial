import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import * as actionTypes from '../../store/actions/actionTypes';
import './TodoList.css';
import * as actionCreators from '../../store/actions/index';

class TodoList extends Component {
	state = {
		selectedTodo: null,
	}

	// clickTodoHandler = (td) => {
	// 	if (this.state.selectedTodo === td) {
	// 		this.setState({ ...this.state, selectedTodo: null });
	// 	} else {
	// 		this.setState({ ...this.state, selectedTodo: td });
	// 	}
	// }


	componentDidMount() {
		// axios.get('/api/todo')
		// 	.then(result => console.log(result));
		// axios.get('/api/todoerror')
		// 	.then(result => console.log(result))
		// 	.catch(err => console.log(err));
		this.props.onGetAll();
	}

	clickTodoHandler = (td) => {
		this.props.history.push('/todos/' + td.id);
	}

	render() {
		const todos = this.props.storedTodos.map((td) => {
			return (
			<Todo
				key={td.id}
				title={td.title}
				done={td.done}
				clicked={() => this.clickTodoHandler(td)}
				clickDetail={() => this.clickTodoHandler(td)}
				clickDone={() => this.props.onToggleTodo(td.id)}
				clickDelete={() => this.props.onDeleteTodo(td.id)}
			/>
			);
		});

		let todo = null;
		if (this.state.selectedTodo) {
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
		storedTodos: state.td.todos
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetAll: () => dispatch(actionCreators.getTodos()),
		onDeleteTodo: (id) => dispatch(actionCreators.deleteTodo(id)),
		onToggleTodo: (id) => dispatch(actionCreators.toggleTodo(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));
