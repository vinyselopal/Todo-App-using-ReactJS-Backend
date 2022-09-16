const { client } = require("./config");

async function insertTodo(doc) {
  const result = await client.rpush('todos', doc);
  return result;
}

async function getAllTodos() {
  const result = await client.lrange('todos', 0, -1).then(function (docs) {
    return docs;
  });
  return result;
}

async function updateTodo(filter, update) {
  const result = await client.lset('todos', filter, update)
  return result
}
async function deleteTodo(filter) {
  const result = await client.del(filter)
  return result
}
async function deleteAll() {
  const result = await client.del('todos')
  return result
}
async function deleteDone(filter) {
  const result = await client.lrem('todos', filter)
  return result
}

module.exports = { insertTodo, getAllTodos, updateTodo, deleteTodo, deleteAll, deleteDone };
