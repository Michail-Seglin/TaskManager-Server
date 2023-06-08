const routeTask = require('express').Router();
const { isValidId } = require('../helper/validation');
const { isValidTaskBody } = require('../helper/validation')
const { getAllTasks, createTask, updateTask, getTasksId, deleteTaskById } = require('../service/task.service');

routeTask.get('/', async (req, res) => {
    try {
        const data = await getAllTasks();
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

routeTask.get('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getTasksId(id);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

routeTask.post('/', isValidTaskBody, async (req, res) => {
    try {
        const { task, user_id } = req.body;
        const data = await createTask(task, user_id);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

routeTask.put('/:id', isValidTaskBody, isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const { task, user_id } = req.body;
        const data = await updateTask(id, task, user_id);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})

routeTask.delete('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteTaskById(id);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})


module.exports = routeTask;