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
            const ExisteAgendmento = await agendamentoModel.buscarPorHorario(sala, horario)
            if (ExisteAgendmento) 
            {
                return res.status(409).json({
                    erro: "Conflito de agendamento",
                    mensagem: `A ${sala} já está ocupada às ${horario}.`
                });
            }
        const novoAgendamento = await agendamentoModel.salvar({nome, sala, horario});
        return res.status(201).json(novoAgendamento)}
        catch (err) {
            console.error(err);
            return res.status(500).json({mensagem: "Erro ao slavar agendamento, tente novamente mais tarde."});
        }
    },

    CancelarAgendamento: async (req, res) => {
        const {id} = req.params;

        try
        {
            await agendamentoModel.Deletar(id)

            res.status(204).send();
        }catch (err) {
            console.error(err);
            return res.status(500).json({mensagem: "Erro ao cancelar. " + err});
        }
    },

    AtualizarAtendimento: async (req, res) => {
        const {id} = req.params;
        const {nome, sala, horario} = req.body;
        try
        {
            await agendamentoModel.Editar(id, {nome, sala, horario});
            res.status(200).json({id, nome, sala, horario});
        }catch (err) {
            console.error(err)
            res.status(500).json({mensagem: "Erro ao editar o agendamento: "+err})
        }
    }

}
