const { getAllUserDB, createUserDB, updateUserDB, deleteUserByIdDB } = require('../repository/user.repository');

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
async function deleteUserById(id) {
    const data = await deleteUserByIdDB(id);
    if (!data.length) throw new Error('id not found');
    return data;
}

module.exports = { getAllUser, createUser, updateUser, deleteUserById }