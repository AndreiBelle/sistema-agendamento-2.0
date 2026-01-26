const express = require('express');
const cors = require ('cors');
const rotasAgendamentos = require('./routes/agendamentosRoutes')

const app = express();

app.use(express.json());
app.use(cors());

app.use(rotasAgendamentos);

module.exports = app;