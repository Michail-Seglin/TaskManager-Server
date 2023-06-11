const bcrypt = require('bcrypt');

const { createUserDB, getUserByEmailDB } = require('../repository/api.repository');

const saltround = 10;

async function createUser(name, surname, email, pwd) {
    const findUser = await getUserByEmailDB(email);

    if (findUser.length) throw new Error('user is exist');

    const hashedPassword = await bcrypt.hash(pwd, saltround);

    const data = await createUserDB(name, surname, email, hashedPassword);


    if (!data.length) throw new Error('user not created')
    return data
}

async function authorizationUser(email, pwd) {
    const findUser = await getUserByEmailDB(email);

    if (!findUser.length) throw new Error('email doesnt`t exist');
    const bool = await bcrypt.compare(pwd, findUser[0].pwd);
    if (!bool) throw new Error('password not math');
    return findUser

}

module.exports = { createUser, authorizationUser }