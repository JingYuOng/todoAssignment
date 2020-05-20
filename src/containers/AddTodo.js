import React from 'react';
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import * as TodoApi from '../api/todoApi'
import ReactTable from "react-table-v6";
import cssStyle from '../style'

class AddTodo extends React.Component {
	constructor() {
		super()
		this.state = {
			taskName: "",
			dateTime: "",
			isCompleted: false,
			taskList: [],
		}
	}


	handleTaskChange = (event) => {
		event.preventDefault();
		this.setState({ taskName: event.target.value })
	}

	handleDateChange = (event) => {
		event.preventDefault();
		this.setState({ dateTime: event.target.value })
	}


	// addTask 
	createTask = (e) => {
		e.preventDefault();
		if (this.state.taskName === '' || this.state.dateTime === '') {
			alert("Please enter task and deadline")
		} else {
			var params = {
				taskName: this.state.taskName,
				dateTime: this.state.dateTime,
				isCompleted: false
			}
			TodoApi.addTask(params)
				.then(result => {
					this.setState({ isTaskListEmpty: false, dateTime: "", taskName: "" })
					this.retrieveAllTask();
				})
				.catch(err => {
					console.log(err)
				})
		}

	}

	// Retrive all Task 
	retrieveAllTask = () => {
		TodoApi.getAllTask()
			.then((response) => {
				if (response.data.data !== null && response.data.data !== undefined) {
					this.setState({ taskList: response.data.data })
				} else {
					console.log("is empty task list ")
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	// Set Task to Completed; 
	toggleTask = (task) => {
		var params = {
			taskId: task._id
		}
		TodoApi.toggleTask(params)
			.then(result => {
				console.log("toggle result " + result.data.data._id)
				let index;
				index = this.state.taskList.findIndex(cur => {
					return result.data.data._id === cur._id
				})
				console.log("toggle @@@" + index)
				let temp = [...this.state.taskList];
				temp[index].isCompleted = result.data.data.isCompleted;
				this.setState({ taskList: temp })

			})
			.catch(err => {
				console.log(err)
			})
	}

	// Remove Task 
	removeTask = (task) => {
		let index;
		var params = {
			taskId: task._id
		}
		console.log("remove task !!")
		TodoApi.removeTask(params)
			.then(result => {
				// Update state
				index = this.state.taskList.findIndex(cur => {
					return cur._id === result.data.data._id
				})
				console.log("selected removed result is " + result.data.data._id + " idnex is " + index)
				let temp = [...this.state.taskList];
				temp.splice(index, 1);

				this.setState({ taskList: temp })
			}).catch(err => {
				console.log(err)
			})
	}

	// Display InCompleted Task
	retrieveIncompletedTask = () => {

		TodoApi.getInCompletedTask()
			.then(response => {
				if (response.data.data !== null && response.data.data !== undefined) {
					this.setState({ taskList: response.data.data })
				} else {
					console.log("is empty task list ")
				}
			}).catch(err => {
				console.log(err)
			})
	}

	// Display Completed Task 
	retrieveCompletedTask = () => {

		TodoApi.getCompletedTask()
			.then(response => {
				if (response.data.data !== null && response.data.data !== undefined) {
					this.setState({ taskList: response.data.data })
				} else {
					console.log("is empty task list ")
				}
			}).catch(err => {
				console.log(err)
			})
	}

	// render table 
	renderTableData() {
		// TodoApi.getAllTask()
		// 	.then((response) => {
		// 		if (response.data.data !== null && response.data.data !== undefined) {
		// 			this.setState({ taskList: response.data.data })
		// 		} else {
		// 			console.log("is empty task list ")
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
		return this.state.taskList.map((task, index) => {
			let status = "";
			if (task.isCompleted === true) {
				status = "Completed"
			} else {
				status = "In-Completed"
			}
			return (
				<tr key={index}>
					<td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.name}</td>
					<td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.dateTime}</td>
					<td style={{ border: "1px solid #ddd", padding: "8px" }}>{status}</td>
					<td style={{ border: "1px solid #ddd" }}>
						<Button
							style={{ display: "block", margin: "auto" }} onClick={(e) => { this.toggleTask(task) }}>
							Toggle Task Status
						</Button>
					</td>
					<td style={{ border: "1px solid #ddd" }}>
						<Button
							style={{ display: "block", margin: "auto" }} onClick={(e) => { this.removeTask(task) }}>
							Remove Task
						</Button>
					</td>
				</tr>
			)
		})
	}

	render() {

		let columns = [
			{
				Header: `Task Name`,
				accessor: "name",
				width: 170,
			}, {
				Header: `Deadline`,
				accessor: "dateTime",
				width: 170
			}, {
				Header: `Task Status`,
				accessor: "isCompleted"
			}
			, {
				Header: `Action`,
				Cell: (task) => (
					<span>
						<Button
							style={{ display: "block", margin: "auto", color: "white", borderRadius: "8px", backgroundColor: "#008000" }} onClick={(e) => { this.toggleTask(task) }}>
							Toggle Task Status
						</Button>
						<Button
							style={{ display: "block", margin: "auto", color: "white", borderRadius: "8px", backgroundColor: "#008000" }} onClick={(e) => { this.removeTask(task) }}>
							Remove Task
						</Button>
					</span>
				)
			}
		]
		return (


			<Container>
				<div
					style={{
						backgroundColor: "#FFF",
						padding: "22px",
						marginTop: "5px",
						border: "3px solid #C0CE3E",
						boxShadow: " 0 0 0 3px #FFF, 0 0 0 5px #3CA8E8",
					}}
				>
					<Row>
						<Col xs={12}>
							<p style={{ fontWeight: "bold", fontSize: "40px", color: "red", textAlign: "center" }}>
								TodoList App By JingYu
						</p>
							<Form>
								<Form.Group>
									<Form.Label style={{ fontWeight: "bold", fontSize: "30px", marginTop: "10px" }}>
										Task Name
								</Form.Label>
									<Form.Control style={{ marginLeft: "40px", fontSize: "30px", marginTop: "10px" }} value={this.state.taskName} type="text" placeholder="Enter Task" onChange={this.handleTaskChange}>
									</Form.Control>
								</Form.Group>

								<Form.Group>
									<Form.Label style={{ fontWeight: "bold", fontSize: "30px", marginTop: "10px" }}>Deadline</Form.Label>
									<Form.Control style={{ marginLeft: "67px", fontSize: "30px", marginTop: "10px" }} value={this.state.dateTime} type="text" placeholder="Enter Deadline" onChange={this.handleDateChange}>
									</Form.Control>
								</Form.Group>
							</Form>

							<Button type="submit" style={{
								color: "white", borderRadius: "8px", backgroundColor: "#008000",
								marginTop: "15px", height: "60px", width: "150px", fontSize: "15px", font: "bold"
							}}
								onClick={this.createTask}>
								Create Task
  								</Button>
							<Button type="submit" style={{
								color: "white", borderRadius: "8px", backgroundColor: "#0000FF",
								marginTop: "15px", height: "60px", width: "150px", fontSize: "15px", font: "bold", marginLeft: "20px"
							}}
								onClick={this.retrieveAllTask}>
								All Tasks
  								</Button>

							<Button type="submit" style={{
								color: "white", borderRadius: "8px", backgroundColor: "#008000",
								height: "60px", width: "150px", fontSize: "15px", font: "bold", marginLeft: "20px", marginTop: "1px"
							}}
								onClick={this.retrieveIncompletedTask}>
								InCompleted Tasks
  								</Button>

							<Button type="submit" style={{
								color: "white", borderRadius: "8px", backgroundColor: "#0000FF",
								height: "60px", width: "150px", fontSize: "15px", font: "bold", marginLeft: "20px"
							}}
								onClick={this.retrieveCompletedTask}>
								Completed Tasks
  								</Button>

						</Col>
					</Row>
				</div>
				<Row style={{ marginTop: "20px" }}>
					<Col xs={12}>
						<div style={{ backgroundColor: "#FFF", padding: "20px" }}>
							{this.state.taskList.length > 0 ? (
								// <ReactTable
								// 	data={this.state.taskList}
								// 	columns={columns}
								// 	showPagination={true}
								// 	defaultPageSize={10}
								// 	className="-striped -highlight"
								// />

								<div>
									<h1 id='title' style={(cssStyle.tableTitle)}>Task Tracker</h1>
									<table id='taskList' style={(cssStyle.table)}>
										<tbody>
											<th style={(cssStyle.th)}>Task Name </th>
											<th style={(cssStyle.th)}>Deadline </th>
											<th style={(cssStyle.th)}>Status </th>
											<th style={(cssStyle.th)}>Toggle Task Status </th>
											<th style={(cssStyle.th)}>Remove Task </th>
											{this.renderTableData()}
										</tbody>
									</table>
								</div>

							) : (
									<p style={{ textAlign: "center", marginTop: "10px" }}>
										You have no Task List.
									</p>
								)
							}
						</div>
					</Col>
				</Row>
			</Container >

		)
	}
}

export default AddTodo