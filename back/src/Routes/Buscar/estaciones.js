const express = require('express')

const { buscarEstaciones } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/', buscarEstaciones)

module.exports = router
