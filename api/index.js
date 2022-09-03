const todo = require('./routes/todo')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1:27017/react-todo')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connected to MongoDB', err))

// Middlewares
app.use(express.json())
app.use(cors())
app.use('/todo/', todo)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
