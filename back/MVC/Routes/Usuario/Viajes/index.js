const express = require('express')

const routerHistorial = require('./historial')
const routerProximos = require('./proximos')

const router = express.Router()

router.use('/historial', routerHistorial)
router.use('/proximos', routerProximos)

module.exports = router
