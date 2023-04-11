const express = require('express')
const router = express.Router()

// array para armazenar as distribuidoras
const distribuidoras = []

// middleware para permitir o uso de JSON no corpo da requisição
router.use(express.json())

// rota para obter todas as distribuidoras
router.get('/', (req, res) => {
  res.json(distribuidoras)
})

// rota para obter uma distribuidora pelo ID
router.get('/:id', (req, res) => {
  const distribuidora = distribuidoras.find(d => d.id === parseInt(req.params.id))
  if (!distribuidora) return res.status(404).send('Distribuidora não encontrada.')
  res.json(distribuidora)
})

// rota para adicionar uma nova distribuidora
router.post('/', (req, res) => {
  const distribuidora = {
    id: distribuidoras.length + 1, // incrementa o ID para a próxima distribuidora
    nome: req.body.nome, // obtém o nome da distribuidora do corpo da requisição
    endereco: req.body.endereco // obtém o endereço da distribuidora do corpo da requisição
  }
  distribuidoras.push(distribuidora) // adiciona a distribuidora ao array
  res.send('Distribuidora adicionada com sucesso!')
})

// rota para atualizar uma distribuidora pelo ID
router.put('/:id', (req, res) => {
  const distribuidora = distribuidoras.find(d => d.id === parseInt(req.params.id))
  if (!distribuidora) return res.status(404).send('Distribuidora não encontrada.')

  // atualiza as propriedades da distribuidora
  distribuidora.nome = req.body.nome
  distribuidora.endereco = req.body.endereco

  res.send('Distribuidora atualizada com sucesso!')
})

// rota para remover uma distribuidora pelo ID
router.delete('/:id', (req, res) => {
  const index = distribuidoras.findIndex(d => d.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).send('Distribuidora não encontrada.')

  distribuidoras.splice(index, 1) // remove a distribuidora do array
  res.send('Distribuidora removida com sucesso!')
})

module.exports = router

