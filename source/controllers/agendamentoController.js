//
const agendamentoModel = require('../models/agendamentosModel');

module.exports = {
    listarAgendamentos: async (req, res) => {
        try {
        const lista = await agendamentoModel.listarTodos();
        return res.status(200).json(lista);
        } catch (err) {
            console.error(err)
            return res.status(500).json({ mensagem: "Erro interno no servidor, tente mais tarde."});
        }
    },

    criarAgendamento: async (req, res) => {
        const {nome, sala, horario} = req.body;

        if(!nome || !sala || !horario)
        {
            return res.status(400).json({
                erro: "Dados inválidos",
                mensagem: "Você precisa enviar nome, sala e horario."
            });
        }
        try {
        const agendamentoCriado = await agendamentoModel.salvar({nome, sala, horario});
        return res.status(201).json(agendamentoCriado)}
        catch (err) {
            console.error(err);
            return res.status(500).json({mensagem: "Erro ao slavar agendamento, tente novamente mais tarde."});
        }
    }
}
