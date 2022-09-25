import { insertTodo, getAllTodos, updateTodo, deleteTodo, deleteAll, deleteDone } from './database/db.js'
import { Router } from 'express'
const todoRouter = Router()

todoRouter.post('/', async (req, res) => {
  try {
    const result = await insertTodo(req.body) // 1. create hashmap. 2. get its key. 3. push its key to a list 4. save it to local todo data
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})
todoRouter.get('/', async (req, res) => {
  try {
    const result = await getAllTodos() // 1. get list. 2. iterate over list to access hashmap for each list item
    res.json(result)
  } catch (err) {
    console.error(err)
  }
})
todoRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('in update', id, req.body)
    const result = await updateTodo(id, req.body.field, req.body.value) // 1. get hashmap from id. 2. convert it to json
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})
todoRouter.delete('/done', async (req, res) => {
  try {
    console.log('indone delete')
    const result = await deleteDone(req.body)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})
todoRouter.delete('/:key', async (req, res) => {
  try {
    const { key } = req.params
    const result = await deleteTodo(key)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

todoRouter.delete('/', async (req, res) => {
  try {
    const result = await deleteAll()
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})

export default todoRouter
