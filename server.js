//carregar variáveis do arquivo .env na memória
require('dotenv').config();
const app = require('./source/app');

 const PORT = process.env.PORT || 3000; //utilizar variável ou a porta 3000

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando profissionalmente na porta ${PORT}`);
    console.log(`🔗 Link: http://localhost:${PORT}/reunioes`);
})