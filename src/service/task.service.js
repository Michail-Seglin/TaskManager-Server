const { getAllTasksDB, getTasksIdDB, createTaskDB, updateTaskDB, deleteTaskByIdDB } = require('../repository/task.repository');

async function getAllTasks() {
    const data = await getAllTasksDB();
    if (!data.length) throw new Error('no data');
    return data
}

async function getTasksId(id) {
    const data = await getTasksIdDB(id);
    if (!data.length) throw new Error('id not found');
    return data
}

async function createTask(task, user_id) {
    const data = await createTaskDB(task, user_id);
    if (!data.length) throw new Error('task not created');
    return data

}

async function updateTask(id, task, user_id) {
    const data = await updateTaskDB(id, task, user_id);
    if (!data.length) throw new Error('id not found');
    return data
}

async function deleteTaskById(id) {
    const data = await deleteTaskByIdDB(id);
    if (!data.length) throw new Error('id not found');
    return data
}


module.exports = { getAllTasks, createTask, updateTask, getTasksId, deleteTaskById }