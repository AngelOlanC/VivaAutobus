const express = require('express')

const { buscarViajesPendientes } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/:idUsuario', buscarViajesPendientes)

module.exports = router