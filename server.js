const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

const { insertTodo, getAllTodos, updateTodo, deleteTodo, deleteAll, deleteDone } = require('./database/routes')

app.use(express.json())

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'POST']
  })
)

app.post('/', async (req, res) => {
  try {
    const result = await insertTodo(req.body)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})
app.get('/', async (req, res) => {
  try {
    const result = await getAllTodos()
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})
app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await updateTodo({ _id: ObjectId(id) }, req.body)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})
app.delete('/', async (req, res) => {
  try {
    const result = await deleteAll()
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})
app.delete('/done', async (req, res) => {
  try {
    const result = await deleteDone(req.body)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteTodo({ id: ObjectId(id) })
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
