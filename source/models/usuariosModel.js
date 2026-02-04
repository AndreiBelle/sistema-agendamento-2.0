const pool = require ('../database/index');

module.exports = {
    buscarUsuarioPorEmail: async (email) => {
    const sql = 'SELECT * FROM usuarios WHERE email= ?';

    const [linhas] = await pool.execute(sql, [email]);
    return linhas;
    },

    novoUsuario: async (dados) => {
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'

        const [linhas] = await pool.execute(sql, [dados.nome, dados.email, dados.senhaCript])
        return linhas;
    }
};