const Task = require('../model/task')

exports.postAddTask = (req, res, next ) => {
	const taskName = req.body.taskName
	const dateTime = req.body.dateTime
	const addedTask = new Task({
		name: taskName,
		dateTime : dateTime,
		isCompleted : false
	})

	addedTask
	.save()
	.then(result => {
		console.log('Product is Created')
	}).
	catch(err => {
		console.log(err)
	})
}

exports.getAllTask = (req, res, next) => {
	Task.find()
	.then(task => {
		
	})
}
