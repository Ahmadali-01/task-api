const express = require('express');
const ctrl = require('../controllers/tasksController');

const router = express.Router();

router.get('/',       ctrl.listTasks);
router.get('/:id',    ctrl.getTask);
router.post('/',      ctrl.createTask);
router.put('/:id',    ctrl.replaceTask);
router.patch('/:id',  ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
