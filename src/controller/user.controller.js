const express = require('express');
const { isValidId } = require('../helper/validation');
const { isValidUserBody } = require('../helper/validation')
const { getAllUser, createUser, updateUser, deleteUserById, patchUser } = require('../service/user.service')
const user = express.Router();

user.get('/', async (req, res) => {
    const data = await getAllUser();
    res.send(data);
})


user.post('/', isValidUserBody, async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message);
    }
})

user.put('/:id', isValidId, isValidUserBody, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, pwd } = req.body;
        const data = await updateUser(id, name, surname, email, pwd)
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message);
    }
})

user.delete('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteUserById(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
});

user.patch('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const clientData = req.body;
        const data = await patchUser(clientData, id);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message)
    }
})

module.exports = user;