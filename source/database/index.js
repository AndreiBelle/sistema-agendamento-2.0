//Versão PROMISE importada no mysql, para conseguir utilizar async/await;
const mysql = require('mysql2/promise');

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sistema_agendamentos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection().then(conn => {
    console.log('deu certo!!')
}).catch((err) => {
    console.error('VISH DEU ERRADO ' + err)
});

module.exports = pool;