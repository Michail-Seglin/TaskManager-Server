const routeTask = require('express').Router();
const { getAllTasks, createTask, updateTask, getTasksId } = require('../service/task.service');

routeTask.get('/', async (req, res) => {
    try {
        const data = await getAllTasks();
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

routeTask.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getTasksId(id);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

routeTask.post('/', async (req, res) => {
    try {
        const { task, user_id } = req.body;
        const data = await createTask(task, user_id);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

routeTask.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, user_id } = req.body;
        const data = await updateTask(id, task, user_id);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message)
    }
})



module.exports = routeTask;