const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('../src/controller/user.controller')

const routeTask = require('../src/controller/task.controller')

const routeApi = require('../src/controller/api.controller')

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/user', user);

app.use('/api', routeApi);

app.use('/task', routeTask)

app.use((error, req, res, next) => res.send(error.message));

module.exports = app;