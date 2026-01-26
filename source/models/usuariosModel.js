const pool = require ('../database/index');


const buscarUsuarioPorEmail = async (email) => {


const SQL = 'SELECT * FROM usuarios WHERE email= ?';

const [linhas] = await pool.execute(SQL, [email]);
return linhas[0]

};