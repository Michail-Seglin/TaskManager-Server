const pool = require('../db');

async function getAllUserDB() {
    const client = await pool.connect();

    const sql = 'select *from users';
    const data = (await client.query(sql)).rows;

    return data;
}

async function createUserDB(name, surname, email, pwd) {
    console.log('+')
    const client = await pool.connect();
    console.log(client)

    try {
        await client.query('BEGIN');
        const sql = 'insert into users (name,surname,email,pwd) values ($1,$2,$3,$4) returning*';
        const data = (await client.query(sql, [name, surname, email, pwd])).rows;

        await client.query('COMMIT')
        return data
    } catch (er) {
        await client.query('ROLLBACK');
        console.log(`createUserDB: ${er.message}`);
        return []
    }
}


async function updateUserDB(id, name, surname, email, pwd) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'update users set name = $1, surname = $2, email = $3, pwd = $4 where id = $5 returning*';
        const data = (await client.query(sql, [name, surname, email, pwd, id])).rows;
        await client.query('COMMIT')

        return data
    } catch (er) {
        await client.query('ROLLBACK');
        console.log(`createUserDB: ${er.message}`);
        return []
    }
}


async function deleteUserByIdDB(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'delete from users where id = $1';
        const data = (await client.query(sql, [id])).rows;
        return data;
    } catch (er) {
        await client.query('ROLLBACK');
        console.log(`createUserDB: ${er.message}`);
        return []
    }
}

async function patchUserId(clientData, id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql1 = 'select *from users where id= $1';
        const data1 = (await client.query(sql1, [id])).rows;

        const newObj = { ...data1[0], ...clientData };
        const sql2 = `update users set name = $1, surname = $2, email = $3, pwd = $4
         where id=$5 returning *`;
        const data2 = (await client.query(sql2, [newObj.name, newObj.surname, newObj.email, newObj.pwd, id])).rows;
        await client.query('COMMIT');
        return data2
    } catch (er) {
        await client.query('ROLLBACK');
        console.log(`patchUserID: ${er.message}`)
    }
}

module.exports = { getAllUserDB, createUserDB, updateUserDB, deleteUserByIdDB, patchUserId };