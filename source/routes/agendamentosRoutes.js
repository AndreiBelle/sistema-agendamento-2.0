const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');

router.get('/', agendamentoController.listarAgendamentos);
router.get('/:id', agendamentoController.BuscarAgendamento);
router.post('/', agendamentoController.criarAgendamento);
router.put('/:id', agendamentoController.atualizarAgendamento);
router.delete('/:id', agendamentoController.CancelarAgendamento);


module.exports = router