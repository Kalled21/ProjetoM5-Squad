// Importa o módulo 'express' e cria um objeto Router
const express = require('express');
const router = express.Router();

// Array para armazenar os pedidos
const orders = [];

// Rota para obter todos os pedidos
router.get('/', (req, res) => {
res.json(orders);
});

// Rota para obter um pedido pelo ID
router.get('/:id', (req, res) => {
const order = orders.find(o => o.id === parseInt(req.params.id));
if (!order) return res.status(404).send('Pedido não encontrado.');
res.json(order);
});

// Rota para criar um novo pedido
router.post('/', (req, res) => {
const order = {
id: orders.length + 1, // Incrementa o ID para o próximo pedido
customerName: req.body.customerName, // Obtém o nome do cliente do corpo da requisição
items: req.body.items // Obtém os itens do pedido do corpo da requisição
};
orders.push(order); // Adiciona o pedido ao array
res.send('Pedido adicionado com sucesso!');
});

// Rota para atualizar um pedido existente pelo ID
router.put('/:id', (req, res) => {
const order = orders.find(o => o.id === parseInt(req.params.id));
if (!order) return res.status(404).send('Pedido não encontrado.');

// Atualiza as propriedades do pedido
order.customerName = req.body.customerName;
order.items = req.body.items;

res.send('Pedido atualizado com sucesso!');
});

// Rota para remover um pedido pelo ID
router.delete('/:id', (req, res) => {
const index = orders.findIndex(o => o.id === parseInt(req.params.id));
if (index === -1) return res.status(404).send('Pedido não encontrado.');

orders.splice(index, 1); // Remove o pedido do array
res.send('Pedido removido com sucesso!');
});

// Exporta o objeto Router para uso em outros arquivos
module.exports = router;




