const express = require('express')
const { validarJWT } = require('../../../middlewares/authentication')
const { getUser } = require('../../../Controllers/usuario')

const router = express.Router()

router.get('/', validarJWT, getUser)

module.exports = router
