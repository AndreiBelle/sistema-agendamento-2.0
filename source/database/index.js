//Versão PROMISE importada no mysql, para conseguir utilizar async/await;
const mysql = require('mysql2/promise');

const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection().then(conn => {
    console.log('Conectado ao Banco com sucesso!')
}).catch((err) => {
    console.error('Falha na conexão: ' + err)
});

module.exports = pool;