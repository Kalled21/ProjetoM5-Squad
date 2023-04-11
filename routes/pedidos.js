const express = require('express');
const app = express();
const port = 3000;

// Array para armazenar os pedidos
const orders = [];

app.use(express.json());

// Rota para obter todos os pedidos
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Rota para obter um pedido pelo ID
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Pedido não encontrado.');
  res.json(order);
});

// Rota para criar um novo pedido
app.post('/orders', (req, res) => {
  const order = {
    id: orders.length + 1, // Incrementa o ID para o próximo pedido
    customerName: req.body.customerName, // Obtém o nome do cliente do corpo da requisição
    items: req.body.items // Obtém os itens do pedido do corpo da requisição
  };
  orders.push(order); // Adiciona o pedido ao array
  res.send('Pedido adicionado com sucesso!');
});

// Rota para atualizar um pedido existente pelo ID
app.put('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Pedido não encontrado.');

  // Atualiza as propriedades do pedido
  order.customerName = req.body.customerName;
  order.items = req.body.items;

  res.send('Pedido atualizado com sucesso!');
});

// Rota para remover um pedido pelo ID
app.delete('/orders/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Pedido não encontrado.');

  orders.splice(index, 1); // Remove o pedido do array
  res.send('Pedido removido com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
