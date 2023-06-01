const express = require('express');
const { getAllUser, createUser, updateUser } = require('../service/user.service')
const user = express.Router();

user.get('/', async (req, res) => {
    const data = await getAllUser();
    res.send(data);
})


user.post('/', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message);
    }
})

user.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, pwd } = req.body;
        const data = await updateUser(id, name, surname, email, pwd)
        res.status(200).send(data);
    } catch (er) {
        res.status(404).send(er.message);
    }
})


module.exports = user;