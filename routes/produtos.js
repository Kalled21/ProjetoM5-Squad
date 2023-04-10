const express = require('express')
const router = express.Router()

// array para armazenar os produtos
const produtos = []

// rota para obter todos os produtos
router.get('/', (req, res) => {
  res.json(produtos)
})

// rota para obter um produto pelo ID
router.get('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id))
  if (!produto) return res.status(404).send('Produto não encontrado.')
  res.json(produto)
})

// rota para adicionar um novo produto
router.post('/', (req, res) => {
  const produto = {
    id: produtos.length + 1, // incrementa o ID para o próximo produto
    nome: req.body.nome, // obtém o nome do produto do corpo da requisição
    preco: req.body.preco // obtém o preço do produto do corpo da requisição
  }
  produtos.push(produto) // adiciona o produto ao array
  res.send('Produto adicionado com sucesso!')
})

// rota para atualizar um produto pelo ID
router.put('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id))
  if (!produto) return res.status(404).send('Produto não encontrado.')

  // atualiza as propriedades do produto
  produto.nome = req.body.nome
  produto.preco = req.body.preco

  res.send('Produto atualizado com sucesso!')
})

// rota para remover um produto pelo ID
router.delete('/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).send('Produto não encontrado.')

  produtos.splice(index, 1) // remove o produto do array
  res.send('Produto removido com sucesso!')
})

module.exports = router