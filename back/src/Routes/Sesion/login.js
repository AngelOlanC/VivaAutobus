const express = require('express')

const { iniciarSesion } = require('../../Controllers/sesion')

const router = express.Router()

router.post('/', iniciarSesion)

module.exports = router
