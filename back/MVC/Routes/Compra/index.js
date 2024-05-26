const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log('simon')
  res.json({ resultado: 'llegaste wey' })
})

module.exports = router
