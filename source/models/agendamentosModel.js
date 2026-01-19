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
    },

    buscarPorHorario: async (sala, horario) => {
        const sql = 'SELECT * FROM agendamentos WHERE sala = ? and horario = ?'

        const [linhas] = await pool.execute(sql, [sala, horario]);

        return linhas[0]
    },

    Deletar: async (id) => {
        const sql = 'DELETE FROM agendamentos WHERE id = ?'

        const [resultado] = await pool.execute(sql, [id])
        return resultado;
    },

    Editar: async (id, dados) => {
        const sql = 'UPDATE agendamentos SET nome = ?, sala = ?, horario = ? WHERE id = ?'

        const [resultado] = await pool.execute (sql, [dados.nome, dados.sala, dados.horario, id])
        return resultado
    }
    
}