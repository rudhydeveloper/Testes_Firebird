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

export default dbOptions
