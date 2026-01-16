const pool = require('../database/index'); // Importando o pool

module.exports = {
    listarTodos: async () => {
        const [linhas] = await pool.execute('SELECT * FROM agendamentos'); // O  [] ignora os dados técnicos das tabelas e traz só os dados 
        return linhas;                                                     //por isso a const fica como [linhas];
    },

    salvar: async (dados) => {
        const sql = 'INSERT INTO agendamentos (nome, sala, horario) VALUES (?, ?, ?)'

        const [resultado] = await pool.execute(sql, [dados.nome, dados.sala, dados.horario]);
        return { id: resultado.insertId, ...dados}
    }

    
}