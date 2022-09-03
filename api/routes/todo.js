const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

// Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find()
  return res.json(todos)
})

// Create a new todo
router.post('/', async (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo = await todo.save()
  return res.json(todo)
})

// Delete todo by id
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id)
  if (!todo) return res.status(404).send('The todo was not found')

  return res.json({ todo })
})

// Get todos completed
router.get('/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) return res.status(404).send('The todo was not found')

  todo.complete = !todo.complete
  todo.save()
  return res.json(todo)
})

router.put('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id,
    {
      text: req.body.text,
      complete: req.body.complete
    },
    { new: true })

  if (!todo) return res.status(404).send('The todo was not found')
  return res.json(todo)
})

module.exports = router
