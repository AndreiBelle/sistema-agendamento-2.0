const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuariosModel = require ('../models/usuariosModel');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({message: 'Email e senha são obrigatórios'})
    
    } 
    try {
        const procuraUsuario = await usuariosModel.buscarUsuarioPorEmail(email);
        const usuario = procuraUsuario[0]

        if(!usuario) {
            return res.status(401).json({message: 'Credenciais inválidas'})
        }

        

        const senhaValida = await bcrypt.compare(password, usuario.senha);

        const token = jwt.sign(
            {id : usuario.id, nome: usuario.nome},
            JWT_SECRET,
            {expiresIn: '8h'}
        );

        return res.status(200).json({
            message: 'login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (err) {
        console.error('Erro no Login: ', err);
        return res.status(500).json({ message: 'Erro interno no servidor.'});
    }
};

module.exports = {
    login
};