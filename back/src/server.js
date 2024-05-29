const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routerBuscar = require('./Routes/Buscar')
const routerCompra = require('./Routes/Compra')
const routerSesion = require('./Routes/Sesion')
const routerUsuario = require('./Routes/Usuario')

app.use('/buscar', routerBuscar)
app.use('/compra', routerCompra)
app.use('/sesion', routerSesion)
app.use('/usuario', routerUsuario)

const port = process.env.SERVER_PORT ?? 3000
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))
