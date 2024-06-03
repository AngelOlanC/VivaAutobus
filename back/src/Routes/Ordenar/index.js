const express = require('express')

const { crearOrden, capturarOrden, apartarOrden, confirmarOrden } = require('../../Controllers/ordenes')

const router = express.Router()

router.post('/', async (req, res) => {
  // const { cart } = req.body;
  const { monto } = req.body;
  const { jsonResponse, httpStatusCode } = await crearOrden();
  console.log(jsonResponse)
  res.status(httpStatusCode).json(jsonResponse);
})

router.post('/apartar/:idViaje/:idOrigen/:idDestino/:asiento', async (req, res) => {
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

router.post('/:orderID/capturar', async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await capturarOrden(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
})

router.post('/:idOrden/confirmar', confirmarOrden)


module.exports = router
