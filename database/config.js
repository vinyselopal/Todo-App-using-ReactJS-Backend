const redis = require('redis')
const client = redis.createClient('127.0.0.1', 6379)
console.log('in file')
client.on('error', function (err) {
  console.log('Redis connection error:', err)
})
async function connectRedis () {
  await client.connect()
  await client.set('projectname', 'todoApp')
}
connectRedis()
module.exports = {
    connectRedis, client
}