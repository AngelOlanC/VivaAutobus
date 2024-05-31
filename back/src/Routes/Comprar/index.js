const express = require('express')

const routerPago = require('./pagar')
const routerReservacion = require('./reservar')

const { validarJWT } = require('../../middlewares/authentication')

const router = express.Router()

router.use('/', validarJWT)

router.use('/pagar', routerPago)
router.use('/reservar', routerReservacion)

module.exports = router
