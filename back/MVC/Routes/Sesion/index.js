const express = require('express')

const routerLogin = require('./login')
const routerLogout = require('./logout')
const routerAuth = require('./auth')

const router = express.Router()

router.use('/login', routerLogin)
router.use('/logout', routerLogout)
router.use('/auth', routerAuth)

module.exports = router
