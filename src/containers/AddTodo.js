import React, { Component } from 'react';
import {Form,Button} from "react-bootstrap"

class AddTodo extends React.Component {
	state = {
		taskName : "", 
		dateTime : "" 
	}
	
	handleTaskChange(event){
		event.preventDefault();
		this.setState({taskName : event.target.value })
	}

	handleDateChange(event){
		event.preventDefault();
		this.setState({dateTime : event.target.value })
	}


	// addTask 
	createTask = (e) => {
		
	}
	// Remove Task 


	render(){
		return (
			<Form>
				<Form.Group>
					<Form.Label>Task Name</Form.Label>
					<Form.Control type="text" placeholder="Enter your task here" onChange={this.handleTaskChange}/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Deadline</Form.Label>
					<Form.Control type="text" placeholder="Enter your task here" onChange={this.handleDateChange}/>
				</Form.Group>
				<Button variant="primary" type="submit" onClick={}>
   					Submit
  				</Button>
			</Form>
		)
	}
}