const express = require('express')

const { buscarEstaciones, buscarNombreEstacion } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/', buscarEstaciones)
router.get('/:id', buscarNombreEstacion)

module.exports = router
