import client from './client.js'

async function insertTodo (doc) {
  const fields = Object.keys(doc)
  const values = Object.values(doc)
  let key // use redis key generator
  const startIndex = 0
  const stopIndex = -1
  const listOfIds = await client.LRANGE('id-list', startIndex, stopIndex) // limit and offset
  // console.log('listOfIds', listOfIds)
  if (!listOfIds.length) {
    key = '1000'
  } else key = JSON.stringify(parseInt(listOfIds[listOfIds.length - 1], 10) + 1)
  fields.forEach(async (field, i) => {
    await client.HSET(key, field, typeof (values[i]) !== 'string'
      ? JSON.stringify(values[i])
      : values[i]) // a transformer function for only mutating one prop
  })
  await client.HSET(key, 'key', key)
  await client.rPush('id-list', key)
  console.log('key', key)
  return key
}

async function getAllTodos () {
  const listOfTodos = []
  const start = 0
  const stop = -1

  const listOfIds = await client.lRange('id-list', start, stop)

  for (let i = 0; i < listOfIds.length; i++) {
    const todo = await client.HGETALL(listOfIds[i]) // map fn, promise.all
    listOfTodos.push(todo)
  }

  return listOfTodos
}

async function updateTodo (key, field, value) {
  console.log(key, field, value)
  const result = await client.HSET(key, field, String(value))
  return result
}

async function deleteTodo (key) {
  const result = await client.DEL(key)
  await client.lRem('id-list', 1, key)
  console.log('del', result) // redis transactions for 2 interdependent operations
  return result
}

async function deleteAll () {
  const result = await client.flushAll() // not good in case of multi users, multi data
  return result
}

async function deleteDone (keys) {
  console.log('keys', keys)
  keys.forEach(async key => {
    await client.DEL(key)
    await client.lRem('id-list', 1, key)
  })
}

export { insertTodo, getAllTodos, updateTodo, deleteTodo, deleteAll, deleteDone }
