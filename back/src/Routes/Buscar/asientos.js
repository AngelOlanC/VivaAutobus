const express = require('express')

const { buscarAsientos } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/:id/:inicio/:fin', buscarAsientos)

module.exports = router
