const express = require('express')

const routerLogin = require('./login')
const routerAuth = require('./auth')

const router = express.Router()

router.use('/login', routerLogin)
router.use('/auth', routerAuth)

module.exports = router
