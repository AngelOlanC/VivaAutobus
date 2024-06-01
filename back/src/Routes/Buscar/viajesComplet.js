const express = require('express')

const { buscarViajesCompletados } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/:idUsuario', buscarViajesCompletados)

module.exports = router