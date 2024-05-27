const express = require('express')

const routerPerfil = require('./Perfil')
const routerViajes = require('./Viajes')

const router = express.Router()

router.use('/perfil', routerPerfil)
router.use('/viajes', routerViajes)

module.exports = router
