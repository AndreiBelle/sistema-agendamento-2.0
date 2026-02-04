const express = require('express');
const cors = require ('cors');

const agendamentosRoutes = require('./routes/agendamentosRoutes');
const loginRoutes = require('./routes/loginRoutes');
const salasRouter = require('./routes/salasRoutes');
const usuariosRouter = require('./routes/usuarioRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/agendamentos', agendamentosRoutes);
app.use('/login', loginRoutes);
app.use('/salas', salasRouter);
app.use('/cadastro', usuariosRouter);

module.exports = app;