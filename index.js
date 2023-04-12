const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const winston = require('winston');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Definir as origens permitidas e os métodos permitidos para o CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
app.use(cors({
  origin: allowedOrigins,
  methods: allowedMethods
}));

// Utilizar o logger winston para logar as requisições HTTP
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    headers: req.headers
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack
  });
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

