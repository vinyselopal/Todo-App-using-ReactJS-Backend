const redis = require('redis')
const client = redis.createClient()
console.log('in file')
client.on('connect', function () {
  console.log('Connected to Redis Server!')
})
