const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// configurar o body parser para receber dados via JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// habilitar o CORS
app.use(cors());

// logar as solicitações HTTP
app.use(morgan('tiny'));

// definir as rotas
app.use('/clientes', require('./routes/clientes'));
app.use('/produtos', require('./routes/produtos'));
app.use('/pedidos', require('./routes/pedidos'));
app.use('/distribuidora', require('./routes/distribuidora'));
app.use('/unidades', require('./routes/unidades'));
app.use('/funcionarios', require('./routes/funcionarios'));

// middleware de rota não encontrada
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// middleware de erro personalizado
app.use((err, req, res, next) => {
  console.error('Erro:', err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
