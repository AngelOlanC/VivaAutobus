const express = require('express')

const { pagar } = require('../../Controllers/comprar')

const router = express.Router()

router.post('/', pagar)

module.exports = router
