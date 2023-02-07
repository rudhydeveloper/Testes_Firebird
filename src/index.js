import express from 'express'
import cors from 'cors'

import { executeQuery } from './config/database.js'

const app = express()
app.use(cors())
app.use(express.json())

//--------------------------

app.get('/produtos', (req, res) => {
  let filtro = []
  let ssql = 'SELECT * FROM TAB_PRODUTO WHERE 1=1'

  if (req.query.descricao) {
    filtro.push('%' + req.query.descricao + '%')
    ssql += ' AND descricao LIKE ?'
  }

  if (req.query.valor) {
    filtro.push(req.query.valor)
    ssql += ' AND valor >= ?'
  }

  executeQuery(ssql, filtro, (err, result) => {
    if (err) return res.status(400).json({ error: err.message })
    return res.json(result)
  })
})

//--------------------------

app.post('/produtos', (req, res) => {
  let ssql =
    'INSERT INTO TAB_PRODUTO (descricao, valor) VALUES (?, ?) RETURNING  ID_PRODUTO'

  executeQuery(ssql, [req.body.descricao, req.body.valor], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    return res.json({ id_produto: result[0].ID_PRODUTO })
  })
})

//--------------------------

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
