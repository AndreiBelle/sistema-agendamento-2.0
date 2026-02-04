const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuariosModel');

module.exports = {
   cadastrarUsuario: async (req, res) => {
    try {
        const {nome, email, senha} = req.body
        
        const validaUsuario = await usuarioModel.buscarUsuarioPorEmail(email);

        if (validaUsuario.length > 0) {
            return res.status(409).json({ mensagem: 'Cadastro já existente'})
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCript = await bcrypt.hash(senha, salt)

        const novoUsuario = await usuarioModel.novoUsuario({
            nome: nome, 
            email: email, 
            senhaCript: senha})
        return res.status(201).json(novoUsuario);
    } catch (err) {
        return res.status(500).json({mensagem : "Erro ao cadastar novo usuario" + err})
    }
   }
}