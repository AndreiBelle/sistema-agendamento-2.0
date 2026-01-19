const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');

router.get('/reunioes', agendamentoController.listarAgendamentos);
router.post('/reunioes', agendamentoController.criarAgendamento);
router.delete('/reunioes/:id', agendamentoController.CancelarAgendamento);
router.put('/reunioes/:id', agendamentoController.AtualizarAtendimento);

module.exports = router