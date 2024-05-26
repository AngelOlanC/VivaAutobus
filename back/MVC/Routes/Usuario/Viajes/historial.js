const express = require('express')
// const { historialViajes } = require('../../Controllers/Usuario')
const router = express.Router()

router.get('/', (req, res) => {
  console.log('simon')
  res.json({ resultado: 'llegaste wey' })
})

module.exports = router
