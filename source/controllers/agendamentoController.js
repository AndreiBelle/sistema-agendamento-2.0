//
const agendamentosModel = require('../models/agendamentosModel');

module.exports = {
    listarAgendamentos: async (req, res) => {
        try {
        const lista = await agendamentosModel.listarTodos();
        return res.status(200).json(lista);
        } catch (err) {
            console.error(err)
            return res.status(500).json({ mensagem: "Erro interno no servidor, tente mais tarde."});
        }
    },

    criarAgendamento: async (req, res) => {
        const {sala_id, usuario_id, titulo, data_inicio, data_fim} = req.body;

        if(!sala_id || !usuario_id || !titulo || !data_inicio || !data_fim)
        {
            return res.status(400).json({
                erro: "Dados inválidos",
                mensagem: "Você precisa enviar nome, sala e horario."
            });
        }
        try {
            const Existeconflito = await agendamentosModel.VerificaConflitos(sala_id, data_inicio, data_fim)  
            if (Existeconflito) 
            {
                return res.status(409).json({
                    erro: "Conflito de agendamento",
                    mensagem: `Já existe uma reunião nesse horário.`
                });
            }
        const novoAgendamento = await agendamentosModel.salvar({sala_id, usuario_id, titulo, data_inicio, data_fim});
        return res.status(201).json(novoAgendamento)}
        catch (err) {
            console.error(err);
            return res.status(500).json({mensagem: "Erro ao salvar agendamento, tente novamente mais tarde."});
        }
    },

    CancelarAgendamento: async (req, res) => {
        const {id} = req.params;

        try
        {
            await agendamentosModel.Deletar(id)

            res.status(204).send();
        }catch (err) {
            console.error(err);
            return res.status(500).json({mensagem: "Erro ao cancelar. " + err});
        }
    },

    BuscarAgendamento: async (req, res) => {
        try {
            const {id} =req.params;
            const agendamento = await agendamentosModel.BuscarPorId(id);
            if (!agendamento) {
                return res.status(404).json({ mensagem: "Não encontrado!"});
                return res.json(agendamento);
            }
        } catch (err) {
            return res.status(500).json({ mensagem: "Erro ao buscar."});
        }
    },

    atualizarAgendamento: async (req, res) => {
        const {id} = req.params;
        const {sala_id, titulo, data_inicio, data_fim} = req.body;

        try {
            await agendamentosModel.Editar(id, {
                sala_id, titulo, data_inicio, data_fim
            });

            return res.status(200).json({ mensagem: "Atualizado com sucesso"});
        } catch (err) {
            console.error(err);
            return res.status(500).json({ mensagem: "Erro ao atualizar " + err})
        }
    }
};
