const express = require('express')
const app = express()

const token = '1'
// Middleware para detectar si el token del usuario es valido
app.all('/', (req, _res, next) => {
  const tokenExists = 'token' in req.headers
  if (!tokenExists || req.headers.token !== token) {
    console.log(token)
    console.log(req.headers)
    console.log(req.body)
    console.log('valio verga tilin')
    return
  }
  next()
})

app.get('/', (_req, res) => {
  res.json({ Edad: '15', carro: 'Corolla Civic' })
})

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))
