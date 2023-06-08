const ExceptionType = require('../exceptions/exceptions');
const { getAllTasksDB, getTasksIdDB, createTaskDB, updateTaskDB, deleteTaskByIdDB } = require('../repository/task.repository');

async function getAllTasks() {
    const data = await getAllTasksDB();
    if (!data.length) throw new Error(ExceptionType.DB_GET_TASKS_NOT_FOUND);
    return data
}

async function getTasksId(id) {
    const data = await getTasksIdDB(id);
    if (!data.length) throw new Error(ExceptionType.DB_GET_TASK_NOT_FOUND);
    return data
}

async function createTask(task, user_id) {
    const data = await createTaskDB(task, user_id);
    if (!data.length) throw new Error(ExceptionType.DB_POST_TASK_NOT_CREATED);
    return data

}

async function updateTask(id, task, user_id) {
    const data = await updateTaskDB(id, task, user_id);
    if (!data.length) throw new Error(ExceptionType.DB_PUT_TASK_NOT_UPDATED);
    return data
}

async function deleteTaskById(id) {
    const data = await deleteTaskByIdDB(ExceptionType.DB_DELETE_TASK_NOT_DELETED);
    if (!data.length) throw new Error('id not found');
    return data
}


module.exports = { getAllTasks, createTask, updateTask, getTasksId, deleteTaskById }