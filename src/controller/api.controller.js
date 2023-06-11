const express = require('express');

const routeApi = express.Router();

const { createUser, authorizationUser } = require('../service/api.service')

routeApi.post('/reg', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd)
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message);
    }
})

routeApi.post('/auth', async (req, res) => {
    try {
        const { email, pwd } = req.body;
        const data = await authorizationUser(email, pwd);
        res.status(200).send(data)
    } catch (er) {
        res.status(404).send(er.message);
    }
})

module.exports = routeApi;