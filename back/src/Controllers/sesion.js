const pool = require('../Model/dbPool.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generarJWT } = require('../helpers/jwt.js')

const iniciarSesion = async (req, res) => {
  try {
    const { nombreUsuario, contrasena } = req.body;

    if (!nombreUsuario || !contrasena) return res.status(400).json({ error: 'Faltan datos' });

    pool.query('SELECT * FROM Usuario WHERE nombreUsuario = ?', [nombreUsuario], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const validPassword = await bcrypt.compare(contrasena, results[0].contrasenaHasheada);
      if (!validPassword) {
        return res.status(404).json({
          error: 'Email o contraseña incorrecto'
        });
      }
      const token = await generarJWT(results[0].id, nombreUsuario);
      return res.status(200).send({ success: 'true', token })
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

const validarSesion = (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).send({ success: false, message: 'falta token en los headers' })
  }
  try {
    jwt.verify(token, process.env.SECRET_JWT)
    return res.status(200).send({ success: true, message: 'token correcto' })
  } catch (err) {
    return res.status(500).send({ success: 'false', message: 'token invalido' })
  }
}

module.exports = { iniciarSesion, validarSesion }
