const express = require('express')
const router = express.Router()

const clientes = []

// obter todos os clientes
router.get('/', (req, res) => {
  res.json(clientes)
})

// obter um cliente pelo ID
router.get('/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id))
  if (!cliente) return res.status(404).send('Cliente não encontrado.')
  res.json(cliente)
})

// adicionar um novo cliente
router.post('/', (req, res) => {
  const cliente = {
    id: clientes.length + 1, // incrementa o ID para o próximo cliente
    nome: req.body.nome, // obtém o nome do cliente do corpo da requisição
    email: req.body.email // obtém o email do cliente do corpo da requisição
  }
  clientes.push(cliente) // adiciona o cliente ao array
  res.send('Cliente adicionado com sucesso!')
})

module.exports = router