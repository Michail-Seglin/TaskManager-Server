const pool = require('../db');

async function getAllTasksDB() {
    const client = await pool.connect();
    const sql = ' select *from tasks';
    const data = (await client.query(sql)).rows
    return data
}

async function getTasksIdDB(id) {
    const client = await pool.connect();
    const sql = ' select *from tasks where id = $1';
    const data = (await client.query(sql, [id])).rows
    return data
}


async function createTaskDB(task, user_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'insert into tasks (task, user_id) values ($1,$2) returning *';
        const data = (await client.query(sql, [task, user_id])).rows;
        await client.query('COMMIT')
        return data
    } catch (er) {
        await client.query('ROLLBACK');
        console.log(`createTaskDB: ${er.message}`);
        return []
    }
}

async function updateTaskDB(id, task, user_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'update tasks set task = $1, user_id = $2 where id = $3 returning *';
        const data = (await client.query(sql, [task, user_id, id])).rows;
        await client.query('COMMIT');
        return data
    } catch (er) {
        await client.query('ROLLBACK');
        console.log(`updateTaskDB: ${er.message}`);
        return []
    }
}

module.exports = { getAllTasksDB, getTasksIdDB, createTaskDB, updateTaskDB }