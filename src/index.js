import express from 'express'
import cors from 'cors'

import firebird from 'node-firebird'
import dbOptions from './config/database.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/produtos', (req, res) => {
  firebird.attach(dbOptions, function (err, db) {
    if (err) return res.status(500).json({ error: err.message })

    // db = DATABASE
    db.query('SELECT * FROM TABLE nome_da_tabela', function (err, result) {
      // IMPORTANT: close the connection
      db.detach()

      if (err) return res.status(500).json({ error: err.message })
      else return res.status(200).json(result)
    })
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
