const express = require('express')
const router = express.Router()

// middleware para processar o corpo das requisições como JSON
router.use(express.json())

// array para armazenar os funcionários
const funcionarios = []

// rota para obter todos os funcionários
router.get('/', (req, res) => {
  res.json(funcionarios)
})

// rota para obter um funcionário pelo ID
router.get('/:id', (req, res) => {
  const funcionario = funcionarios.find(f => f.id === parseInt(req.params.id))
  if (!funcionario) return res.status(404).send('Funcionário não encontrado.')
  res.json(funcionario)
})

// rota para adicionar um novo funcionário
router.post('/', (req, res) => {
  const funcionario = {
    id: funcionarios.length + 1, // incrementa o ID para o próximo funcionário
    nome: req.body.nome, // obtém o nome do funcionário do corpo da requisição
    cargo: req.body.cargo // obtém o cargo do funcionário do corpo da requisição
  }
  funcionarios.push(funcionario) // adiciona o funcionário ao array
  res.send('Funcionário adicionado com sucesso!')
})

// rota para atualizar um funcionário pelo ID
router.put('/:id', (req, res) => {
  const funcionario = funcionarios.find(f => f.id === parseInt(req.params.id))
  if (!funcionario) return res.status(404).send('Funcionário não encontrado.')

  // atualiza as propriedades do funcionário
  funcionario.nome = req.body.nome
  funcionario.cargo = req.body.cargo

  res.send('Funcionário atualizado com sucesso!')
})

// rota para remover um funcionário pelo ID
router.delete('/:id', (req, res) => {
  const index = funcionarios.findIndex(f => f.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).send('Funcionário não encontrado.')

  funcionarios.splice(index, 1) // remove o funcionário do array
  res.send('Funcionário removido com sucesso!')
})

module.exports = router
