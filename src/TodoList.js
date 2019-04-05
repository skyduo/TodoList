import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem'
import './style.css'

class TodoList extends Component {
	//We should never change this.state, we need to create a new const equal to this.state and change it.
	constructor (props) {
		super(props);
		this.state = {
			input: '',
			list: []
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBtnClick = this.handleBtnClick.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this);
	}

	render () {
		return (
			<Fragment>
			<div> 
			{/*Below is a input box.*/}
			{/*Bind help us to change 'this' pointer and then handle functions help to change this.state.*/}
			{/*We have to use className instead of class, htmlFor instead of for id.*/}
			<label htmlFor="insertArea">Input</label>
				<input 
					id="insertArea"
					className='input'
					value={this.state.input}
					onChange={this.handleInputChange}
				/>
				<button onClick={this.handleBtnClick}> go </button>
			</div>
			<ul>
				{this.getTodoItem()}
			</ul>
			</Fragment>
		)
	}

	getTodoItem() {
		//We use map function to traverse the list and if input has html tags we just compile it.
		//Transfer value and function from parent module to child module. If we need to transfer function, 
		//we need bind(this) to make this point to constructor of parent module.
		return this.state.list.map((item, index) => {
			return (
					<TodoItem 
						key={index}
						content={item} 
						index={index}
						deleteItem={this.handleItemDelete}
					/>
			)
		})
	}
// We can use ES6 function to change the setState, and use prevState instead of this.state.
	handleInputChange (e) {
		const value = e.target.value
		this.setState(( ) => ({
			input: value
		}));
	}

	handleBtnClick () {
		this.setState((prevState) => ({
			list: [...prevState.list, prevState.input],
			input: ''
		}));
	}
	handleItemDelete (index) {		
		this.setState((prevState) => {
			const list = [...prevState.list];
			list.splice(index, 1);
			return {list}
		});
	}
}

export default TodoList;