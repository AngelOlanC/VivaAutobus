const express = require('express')
const routerViajes = require('./Viajes')
const { validarJWT } = require('../../middlewares/authentication')
const { crearUsuario, iniciarSesion, getUser } = require('../../Controllers/usuario')

const router = express.Router()

router.get('/perfil', validarJWT, getUser);
router.use('/viajes', routerViajes)

router.post('/login', iniciarSesion)
router.post('/register', crearUsuario)

module.exports = router
