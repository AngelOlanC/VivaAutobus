const mysql = require('mysql2')
const dbConf = require('./DbConfiguration')

const connection = mysql.createPool({
  host: dbConf.HOST,
  user: dbConf.USER,
  password: dbConf.PASSWORD
})

module.exports = connection
