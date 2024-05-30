const express = require('express')

const { buscarViajes } = require('./../../Controllers/buscar')

const router = express.Router()

router.get('/:origen/:destino/:fecha', buscarViajes)

module.exports = router
