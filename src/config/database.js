import firebird from 'node-firebird'

const dbOptions = {
  host: 'localhost',
  port: 3050,
  database: '\\home\\rudhy\\Área de Trabalho\\Testes_Aleatorios\\banco02.fdb',
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: false, // set to true to lowercase keys
  role: null, // default
  pageSize: 4096 // default when creating database
}

const executeQuery = (ssql, params, callback) => {
  firebird.attach(dbOptions, function (err, db) {
    if (err) return callback(err, [])
    // db = DATABASE
    db.query(ssql, params, function (err, result) {
      // IMPORTANT: close the connection
      db.detach()
      if (err) return callback(err, [])
      else return callback(null, result)
    })
  })
}

export { executeQuery }
