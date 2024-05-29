const express = require('express')
const { validarSesion } = require('../../Controllers/sesion')

const router = express.Router()

router.post('/', validarSesion)

module.exports = router
