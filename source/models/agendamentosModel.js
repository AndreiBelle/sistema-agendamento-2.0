
const pool = require('../database/index'); // Importando o pool

module.exports = {
    listarTodos: async () => {
        // O  [] ignora os dados técnicos das tabelas e traz só os dados 
        const [linhas] = await pool.execute('SELECT a.id, a.data_inicio, a.data_fim, a.titulo, s.nome AS nome_sala, u.nome AS nome_usuario FROM agendamentos a JOIN salas s ON a.sala_id = s.id JOIN usuarios u on a.usuario_id = u.id WHERE DATE_ADD(a.data_fim, INTERVAL 5 MINUTE) > NOW() AND a.data_inicio <= NOW() + INTERVAL 30 DAY ORDER BY a.data_inicio DESC'); 
        return linhas; //por isso a const fica como [linhas];
    },

    salvar: async (dados) => {
        const sql = 'INSERT INTO agendamentos (sala_id, usuario_id, titulo, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)'

        const [resultado] = await pool.execute(sql, [dados.sala_id, dados.usuario_id, dados.titulo, dados.data_inicio, dados.data_fim]);
        return { id: resultado.insertId, ...dados}

    },

    VerificaConflitos: async (sala_id, data_inicio, data_fim) => {
        const slq = `
        SELECT * FROM agendamentos 
        WHERE sala_id = ? 
        AND (
            (data_inicio < ? AND data_fim > ?)
        )
    `;
    
    const [conflitos] = await pool.execute(slq, [sala_id, data_fim, data_inicio]);
    return conflitos.length > 0;
    },

    Deletar: async (id) => {
        const sql = 'DELETE FROM agendamentos WHERE id = ?'

        const [resultado] = await pool.execute(sql, [id])
        return resultado;
    },

    Editar: async (id, dados) => {
        const sql = 'UPDATE agendamentos SET sala_id = ?, usuario_id = ?, titulo = ?, data_inicio = ?, data_fim = ? WHERE id = ?'

        const [resultado] = await pool.execute (sql, [dados.sala_id, dados.titulo, dados.data_inicio, dados.data_fim, id])
        return resultado
    },

    BuscarPorId: async(id) => {
        const sql = 'SELECT * FROM agendamentos WHERE id = ?';
        const [linhas] = await pool.execute (sql, [id]);
        return linhas[0];
    },

    ApagarPorData: async () => {
        const sql = ''
    }
    
}