//carregar variáveis do arquivo .env na memória
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./source/app');

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});


io.on('connection', (socket) => {
    console.log('Um usuario se conectou: ', socket.id);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado!')
    });
});

 const PORT = process.env.PORT || 3000; //utilizar variável ou a porta 3000

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando profissionalmente na porta ${PORT}`);
    console.log(`🔗 Link: http://localhost:${PORT}/reunioes`);
})

module.exports = { io };