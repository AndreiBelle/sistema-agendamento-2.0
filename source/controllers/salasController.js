const salasModel = require('../models/salasModel');

module.exports = {
    Listar: async (req, res) => {
        try {
            const lista = await salasModel.ListarTodasSalas();
            return res.status(200).json(lista)
        } catch (err) {
            console.log(err)
            return res.status(500).json({mensagem: "Erro insterno no Servidor."})
        }
    }
}