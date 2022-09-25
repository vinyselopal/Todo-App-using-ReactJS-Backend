import express from 'express'
import cors from 'cors'
import todoRouter from './router.js'
const app = express()

const port = 8000
app.use(express.json())

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'POST']
  })
)

app.use(todoRouter)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// hyper log log
