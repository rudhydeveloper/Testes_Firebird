import firebird from 'node-firebird'

const dbOptions = {
  host: 'env-2642545.jelastic.saveincloud.net',
  port: 11803,
  database: '/opt/firebird/data/teste/demo/xDADOS.FDB',
  user: 'SYSDBA',
  password: 'YlX91D7oADtUvow5VkN3',
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
