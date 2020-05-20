const Task = require('../model/task')

exports.postAddTask = (req, res, next) => {
	console.log("Post add task here @@@@ ")
	console.log("Task Name is " + req.body.taskName)
	const taskName = req.body.taskName
	const dateTime = req.body.dateTime

	const addedTask = new Task({
		name: taskName,
		dateTime: dateTime,
		isCompleted: false
	})

	addedTask
		.save()
		.then(result => {
			console.log('Product is Created')
			res.redirect('/tasks')
		}).
		catch(err => {
			console.log(err)
		})
}

exports.getAllTask = (req, res, next) => {
	Task.find()
		.then(tasks => {
			res.json({
				data: tasks
			})
		})
		.catch(err => {
			console.log(err)
		})
}

exports.getCompletedTask = (req, res, next) => {
	let completedTask = []
	Task.find()
		.then(tasks => {
			tasks.forEach(cur => {
				if (cur.isCompleted === true) {
					completedTask.push(cur)
				}
			})
			res.send({
				data: completedTask
			})
		})
		.catch(err => {
			console.log(err)
		})
}

exports.getInCompletedTask = (req, res, next) => {
	let inCompletedTask = []
	Task.find()
		.then(tasks => {
			tasks.forEach(cur => {
				if (cur.isCompleted === false) {
					inCompletedTask.push(cur)
				}
			})
			res.send({
				data: inCompletedTask
			})
		})
		.catch(err => {
			console.log(err)
		})
}

exports.removeTask = (req, res, next) => {
	const taskId = req.params.taskId
	Task.findByIdAndRemove(taskId)
		.then((result) => {
			console.log("Remove the product " + result);
			res.send({
				data : result
			})
		})
		.catch(err => console.log(err))
}

// tooggle task status
exports.toggleTaskStatus = (req, res, next) => {
	const taskId = req.params.taskId

	Task.findById(taskId)
		.then(task => {
			task.isCompleted = !task.isCompleted
			return task.save()
		})
		.then(result => {
			console.log(result)
			res.send({
				data : result
			})
		}).catch(err => {
			console.log(err)
		})
}


