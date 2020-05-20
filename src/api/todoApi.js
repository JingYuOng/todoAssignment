import axios from "axios"

const ipAddres = "http://localhost:5000";

export function addTask(params) {
	var link = ipAddres + "/add-task"
	return axios.post(link, params)
}

export function getAllTask() {
	var link = ipAddres + "/tasks"
	return axios.get(link)
}

export function getCompletedTask() {
	var link = ipAddres + "/completed-task"
	return axios.get(link)
}

export function getInCompletedTask() {
	var link = ipAddres + "/incompleted-task"
	return axios.get(link)
}

export function removeTask(params) {
	var taskId = params.taskId
	var link = ipAddres + "/remove-task/" + taskId
	return axios.post(link, params)
}

export function toggleTask(params) {
	var taskId = params.taskId
	var link = ipAddres + "/toggle-task/" + taskId
	return axios.post(link, params)
}




