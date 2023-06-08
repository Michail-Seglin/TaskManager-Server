const ExceptionType = require('../exceptions/exceptions')
const { getAllUserDB, createUserDB, updateUserDB, deleteUserByIdDB, patchUserId } = require('../repository/user.repository');

async function getAllUser() {
    const data = await getAllUserDB();
    if (!data.length) throw new Error(ExceptionType.DB_GET_USERS_NOT_FOUND);
    return data
}


async function createUser(name, surname, email, pwd) {
    const data = await createUserDB(name, surname, email, pwd);
    if (!data.length) throw new Error(ExceptionType.DB_POST_USER_NOT_CREATED);
    return data
}

async function updateUser(id, name, surname, email, pwd) {
    const data = await updateUserDB(id, name, surname, email, pwd);
    if (!data.length) throw new Error(ExceptionType.DB_PUT_USER_NOT_UPDATED);

    return data
}
async function deleteUserById(id) {
    const data = await deleteUserByIdDB(id);
    if (!data.length) throw new Error(ExceptionType.DB_DELETE_USER_NOT_DELETED);
    return data;
}

async function patchUser(clientData, id) {
    const data = await patchUserId(clientData, id);
    if (!data.length) throw new Error(ExceptionType.DB_PATCH_USER_NOT_PATCHED);
    return data
}

module.exports = { getAllUser, createUser, updateUser, deleteUserById, patchUser }