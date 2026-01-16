const express = require('express');
const rotasAgendamentos = require('./routes/agendamentosRoutes')

const app = express();

app.use(express.json());

app.use(rotasAgendamentos)

module.exports = app;