const express = require('express')

const { crearUsuario } = require('../../Controllers/usuario')

const router = express.Router()

router.post('/', crearUsuario)

module.exports = router
