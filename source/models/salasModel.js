const pool = require('../database/index');

module.exports = {
    ListarTodasSalas: async () => {
       // const SQL = 'SELECT * FROM salas';

        const [linhas] = await pool.execute('SELECT * FROM salas');
        return linhas;
    }
}