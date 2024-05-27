const mysql = require('mysql2')

const HOST = process.env.HOST || null
const DB_USER = process.env.DB_USER || null
const DB_PASSWORD = process.env.DB_PASSWORD || null
const DATABASE = process.env.DATABASE || null
const PORT = process.env.PORT || null

const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  port: PORT
})

// ejemplo de uso
pool.getConnection((err, connection) => {
  if (err) {
    console.error(err)
    return
  }
  // no le se al segundo parametro. TODO: INVESTIGAR
  connection.query('SELECT * FROM viaje', ['*'], (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    if (!res[0]) {
      console.log('oh no papu no hay nada')
      return
    }
    console.log(res[0])
  })
})
console.log()

module.exports = pool
