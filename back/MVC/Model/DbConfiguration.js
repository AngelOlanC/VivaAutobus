const host = process.env.HOST || null
const dbUser = process.env.DB_USER || null
const dbPassword = process.env.DB_PASSWORD || null

module.exports = {
  HOST: host,
  USER: dbUser,
  PASSWORD: dbPassword
}
