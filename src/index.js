import express from 'express'
import cors from 'cors'

import { executeQuery } from './config/database.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/produtos', (req, res) => {
  executeQuery('SELECT * FROM PRODUTO', [], (err, result) => {
    if (err) return res.status(400).json({ error: err.message })
    return res.json(result)
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
