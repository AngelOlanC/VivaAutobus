const express = require('express')

const { validarJWT } = require('../../middlewares/authentication')
const { crearOrden, capturarOrden, actualizarBd } = require('../../Controllers/ordenes')

const router = express.Router()

router.post('/', async (req, res) => {
  // const { cart } = req.body;
  const { jsonResponse, httpStatusCode } = await crearOrden();
  console.log(jsonResponse)
  res.status(httpStatusCode).json(jsonResponse);
})
router.post('/:orderID/capturar', async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await capturarOrden(orderID);
    actualizarBd(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
})

module.exports = router
