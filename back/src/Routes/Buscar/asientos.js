const express = require('express')


const { buscarAsientos } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/:idViaje/:idOrigen/:idDestino', buscarAsientos)

module.exports = router
