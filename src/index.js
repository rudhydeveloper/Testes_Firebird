import express from 'express'
import cors from 'cors'

import { executeQuery } from './config/database.js'

const app = express()
app.use(cors())
app.use(express.json())

//--------------------------

app.get('/consulta', (req, res) => {
  let filtro = []
  let ssql = 'SELECT * FROM ALIQCUPOM WHERE 1=1'

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

app.post('/inserir', (req, res) => {
  let ssql =
    'INSERT INTO ALIQCUPOM (IMPRESSORA, DESCRICAO, ALIQUOTA, TIPO_ALIQ, MAQUINA, ID_IMPFISCAL, ID_EMPRESA) VALUES (?, ?, ?, ?, ?, ?, ?)'

  executeQuery(
    ssql,
    [
      req.body.IMPRESSORA,
      req.body.DESCRICAO,
      req.body.ALIQUOTA,
      req.body.TIPO_ALIQ,
      req.body.MAQUINA,
      req.body.ID_IMPFISCAL,
      req.body.ID_EMPRESA
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      console.log(result)
      return res.status(201).json({ message: 'Inserido com sucesso!' })
    }
  )
})

//--------------------------

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
