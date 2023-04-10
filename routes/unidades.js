const express = require('express')
const router = express.Router()

// array para armazenar as unidades
const unidades = []

// rota para obter todas as unidades
router.get('/', (req, res) => {
  res.json(unidades)
})

// rota para obter uma unidade pelo ID
router.get('/:id', (req, res) => {
  const unidade = unidades.find(u => u.id === parseInt(req.params.id))
  if (!unidade) return res.status(404).send('Unidade não encontrada.')
  res.json(unidade)
})

// rota para adicionar uma nova unidade
router.post('/', (req, res) => {
  const unidade = {
    id: unidades.length + 1, // incrementa o ID para a próxima unidade
    nome: req.body.nome, // obtém o nome da unidade do corpo da requisição
    endereco: req.body.endereco // obtém o endereço da unidade do corpo da requisição
  }
  unidades.push(unidade) // adiciona a unidade ao array
  res.send('Unidade adicionada com sucesso!')
})

// rota para atualizar uma unidade pelo ID
router.put('/:id', (req, res) => {
  const unidade = unidades.find(u => u.id === parseInt(req.params.id))
  if (!unidade) return res.status(404).send('Unidade não encontrada.')

  // atualiza as propriedades da unidade
  unidade.nome = req.body.nome
  unidade.endereco = req.body.endereco

  res.send('Unidade atualizada com sucesso!')
})

// rota para remover uma unidade pelo ID
router.delete('/:id', (req, res) => {
  const index = unidades.findIndex(u => u.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).send('Unidade não encontrada.')

  unidades.splice(index, 1) // remove a unidade do array
  res.send('Unidade removida com sucesso!')
})

module.exports = router