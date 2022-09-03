const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

router.get('/', async (req, res) => {
  const todos = await Todo.find()
  return res.json(todos)
})

router.post('/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  todo.save()
  return res.json(todo)
})

router.delete('/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id)
  return res.json({ result })
})

router.get('/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  todo.complete = !todo.complete
  todo.save()
  return res.json(todo)
})

router.put('/update/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  todo.text = req.body.text
  todo.save()
  return res.json(todo)
})

module.exports = router
