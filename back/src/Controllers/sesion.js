const pool = require('../Model/DbPool.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const iniciarSesion = async (req, res) => {
  try {
    console.log(req.body)
    const { usuario, contrasena } = req.body

    if (!usuario) {
      return res.status(400).send({ success: 'false', message: 'falta usuario' })
    }
    if (!contrasena) {
      return res.status(400).send({ success: 'false', message: 'falta contrasena' })
    }

    const results = await pool.promise().query(`SELECT contrasenaHasheada FROM Usuario where nombreUsuario = '${usuario}';`)
    if (!results[0] || !results[0][0]) {
      return res.status(401).send({ success: 'false', message: 'usuario invalido' })
    }
    const contrasenaHasheada = results[0][0].contrasenaHasheada

    const coinciden = await bcrypt.compare(contrasena, contrasenaHasheada)
    if (!coinciden) {
      return res.status(401).send({ success: 'false', message: 'contrasena invalida' })
    }
    const token = jwt.sign({ nombreUsuario: usuario }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).send({ sucess: 'true', token })
  } catch (err) {
    return res.status(500).send({ success: 'false', message: 'no se pudo validar el inicio de sesion' })
  }
}

const validarSesion = (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).send({ success: false, message: 'falta token en los headers' })
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).send({ success: true, message: 'token correcto' })
  } catch (err) {
    return res.status(500).send({ success: 'false', message: 'token invalido' })
  }
}

module.exports = { iniciarSesion, validarSesion }
