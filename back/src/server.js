const express = require('express')
const cors = require('cors')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const { validarJWT } = require('./middlewares/authentication')

const routerBuscar = require('./Routes/Buscar')
const routerOrdenes = require('./Routes/Ordenar')
const routerUsuario = require('./Routes/Usuario')

app.use('/buscar', validarJWT, routerBuscar)
app.use('/ordenes', validarJWT, routerOrdenes)
app.use('/usuario', routerUsuario)

const port = process.env.SERVER_PORT ?? 3000
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))
