const pool = require ('../database/index');

module.exports = {
    buscarUsuarioPorEmail: async (email) => {
    const SQL = 'SELECT * FROM usuarios WHERE email= ?';

    const [linhas] = await pool.execute(SQL, [email]);
    return linhas[0]
    }
};