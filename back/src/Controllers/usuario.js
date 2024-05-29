const pool = require('../Model/DbPool.js')
const bcrypt = require('bcrypt')

const crearUsuario = async (req, res) => {
  const { nombreUsuario, contrasena, nombres, apellidos, fechaNacimiento } = req.body
  if (!nombreUsuario) {
    return res.status(401).send({ success: 'false', message: 'falta nombre de usuario' })
  }
  if (!contrasena) {
    return res.status(401).send({ success: 'false', message: 'falta contrasena' })
  }
  if (!nombres) {
    return res.status(401).send({ success: 'false', message: 'faltan los nombres' })
  }
  if (!apellidos) {
    return res.status(401).send({ success: 'false', message: 'faltan los apellidos' })
  }
  if (!fechaNacimiento) {
    return res.status(401).send({ success: 'false', message: 'falta la fecha de nacimiento' })
  }

  try {
    const contrasenaHasheada = await bcrypt.hash(contrasena, 10)
    pool.execute(`INSERT INTO USUARIO(nombreUsuario, contrasenaHasheada, nombres, apellidos, fechaNacimiento)
     VALUES('${nombreUsuario}', '${contrasenaHasheada}', '${nombres}', '${apellidos}', '${fechaNacimiento}');`)
    return res.status(200).send({ succes: 'true', message: 'insertado con exito' })
  } catch (e) {
    return res.status(401).send({ success: 'false', message: 'ocurrio un error' })
  }
}

module.exports = { crearUsuario }
