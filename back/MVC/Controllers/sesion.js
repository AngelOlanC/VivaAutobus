const pool = require('../Model/DbPool.js')

const iniciarSesion = (req, res) => {
/*
  pool.getConnection(() => {})
*/
  // Si todo sale bien, se le regresa un token en el Header
  // que podra usar autenticar su sesion.
}

const cerrarSesion = (req, res) => {
  /*
    ada
  */
}

const validarSesion = (req, res) => {
  // Se recibe el token de sesion en el header de req
  // validarlo, y responder de manera acorde
}

module.exports = { iniciarSesion, cerrarSesion, validarSesion }
