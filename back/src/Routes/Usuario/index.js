const express = require('express')

const routerPerfil = require('./Perfil')
const routerViajes = require('./Viajes')
const routerCrear = require('./crear')

const router = express.Router()

router.use('/perfil', routerPerfil)
router.use('/viajes', routerViajes)
router.use('/crear', routerCrear)

module.exports = router
