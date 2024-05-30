const express = require('express')

const { buscarViajes } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/:idOrigen/:idDestino/:fecha', buscarViajes)

module.exports = router
