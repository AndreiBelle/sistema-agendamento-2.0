const app = require('./source/app');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando profissionalmente na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/reunioes`);
})