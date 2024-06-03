const express = require('express')

const routerAsientos = require('./asientos')
const routerEstaciones = require('./estaciones')
const routerViajes = require('./viajes')

const router = express.Router()

router.use('/asientos', routerAsientos)
router.use('/estaciones', routerEstaciones)
router.use('/viajes', routerViajes)


module.exports = router
