const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')

router.get('/tasks', adminController.getAllTask);

router.post('/add-task', adminController.postAddTask)

router.get('/completed-task',adminController.getCompletedTask)

router.get('/incompleted-task', adminController.getInCompletedTask)

router.post('/remove-task/:taskId', adminController.removeTask)

router.post('/toggle-task/:taskId',adminController.toggleTaskStatus)


module.exports = router;