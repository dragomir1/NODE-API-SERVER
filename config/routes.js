const TaskController = require('./../controllers/tasks');
const express = require('express');
const router = express.Router();

router.get('/allTasks', TaskController.show_all);
router.post('/newTask', TaskController.create_new_task);
router.get('/show/:taskId', TaskController.get_one_task);
router.patch('/update/:taskId', TaskController.update_task);
router.delete('/delete/:taskId', TaskController.delete_task);

module.exports = router;
