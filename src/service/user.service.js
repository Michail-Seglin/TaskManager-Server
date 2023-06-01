const { getAllUserDB, createUserDB, updateUserDB } = require('../repository/user.repository');

async function getAllUser() {
    const data = await getAllUserDB();
    return data
}


async function createUser(name, surname, email, pwd) {
    const data = await createUserDB(name, surname, email, pwd);
    return data
}

async function updateUser(id, name, surname, email, pwd) {
    const data = await updateUserDB(id, name, surname, email, pwd);
    if (!data.length) throw new Error('user is not created');

    return data
}

module.exports = { getAllUser, createUser, updateUser }