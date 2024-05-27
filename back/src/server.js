const express = require('express')
const app = express()

const routerBuscar = require('../MVC/Routes/Buscar')
const routerCompra = require('../MVC/Routes/Compra')
const routerSesion = require('../MVC/Routes/Sesion')
const routerUsuario = require('../MVC/Routes/Usuario')

app.use('/buscar', routerBuscar)
app.use('/compra', routerCompra)
app.use('/sesion', routerSesion)
app.use('/usuario', routerUsuario)

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))
