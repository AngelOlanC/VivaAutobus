const express = require('express')

const validarPermisos = require('../../middlewares/orderAuthentication')

const routerApartar = require('./apartar')

const { crearOrden, capturarOrden, confirmarOrden, getResumen } = require('../../Controllers/ordenes')

const router = express.Router()

router.use("/apartar", routerApartar);

router.get('/:idOrden', validarPermisos, getResumen)

router.post('/:idOrden', validarPermisos, async (req, res) => {
  const { idOrden } = req.params;
  const { monto } = req.body;
  const { jsonResponse, httpStatusCode } = await crearOrden(idOrden, monto);
  console.log(jsonResponse)
  res.status(httpStatusCode).json(jsonResponse);
})

router.post('/:idOrder/capturar/:idOrden', validarPermisos, async (req, res) => {
  try {
    const { idOrder } = req.params;
    const { jsonResponse, httpStatusCode } = await capturarOrden(idOrder);
    console.log(httpStatusCode, jsonResponse)
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
})

router.post('/:idOrden/confirmar', validarPermisos, confirmarOrden)


module.exports = router
