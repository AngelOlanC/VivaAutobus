const express = require('express')

const { apartarOrden } = require('../../Controllers/ordenes')

const router = express.Router()

router.post('/:idViaje/:idOrigen/:idDestino/:asiento', async (req, res) => {
  const { userId, costo } = req.headers;
  const { idViaje, idOrigen, idDestino, asiento } = req.params;
  return await apartarOrden(userId, costo, idViaje, idOrigen, idDestino, asiento) 
    .then((id_orden) => res.status(200).json({
      sucess: 'true',
      idOrden: id_orden
    }))
    .catch((msg) => res.status(500).json({
      succes: 'false',
      message: msg
    }))
})

module.exports = router
