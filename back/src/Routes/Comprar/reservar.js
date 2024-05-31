const express = require('express')

const { reservar } = require('../../Controllers/comprar')

const router = express.Router()

router.post('/:idViaje/:idOrigen/:idDestino', reservar)

module.exports = router
