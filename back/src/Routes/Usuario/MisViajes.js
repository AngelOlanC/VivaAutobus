const express = require('express')

const { buscarMisViajesPendientes, buscarMisViajesCompletados } = require('../../Controllers/usuario')

const router = express.Router()

router.get('/pendientes', buscarMisViajesPendientes)
router.get('/completados', buscarMisViajesCompletados)

module.exports = router
