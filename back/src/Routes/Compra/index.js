const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log('simon')
  console.log(req.params)
  res.json({ resultado: 'llegaste wey' })
})

module.exports = router
