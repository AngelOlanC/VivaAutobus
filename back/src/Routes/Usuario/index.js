const express = require('express')
const routerMisViajes = require('./MisViajes')
const { validarJWT } = require('../../middlewares/authentication')
const { crearUsuario, iniciarSesion, getUser } = require('../../Controllers/usuario')

const router = express.Router()

router.use('/misViajes', validarJWT, routerMisViajes)

router.get('/perfil', validarJWT, getUser);

router.post('/login', iniciarSesion)
router.post('/register', crearUsuario)

module.exports = router
