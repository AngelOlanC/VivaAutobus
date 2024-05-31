const pool = require('../Model/dbPool.js')
const bcrypt = require('bcrypt')
const { generarJWT } = require('../helpers/jwt.js')

const crearUsuario = async (req, res) => {
  const { nombreUsuario, contrasena, nombres, apellidos } = req.body
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

  try {
    pool.query('SELECT * FROM Usuario WHERE nombreUsuario = ?', [nombreUsuario], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length > 0) {
        return res.status(400).json({
          success: 'false',
          message: 'El username ya ha sido utilizado'
        });
      }

      const contrasenaHasheada = await bcrypt.hash(contrasena, 10);
      pool.query('INSERT INTO Usuario SET ?', { nombreUsuario, contrasenaHasheada, nombres, apellidos }, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 'false',
            message: 'Server error'
          });
        }
        const token = await generarJWT(results.insertId, nombreUsuario);
        return res.status(201).send({ succes: 'true', message: 'insertado con exito', token })
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: 'false',
      message: 'Server error'
    });
  }
}

const getUser = async (req, res) => {
  try {
    const id = req.userId;
    pool.query('SELECT id,nombreUsuario,nombres,apellidos FROM Usuario WHERE id = ?', [id], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: 'Server error'
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }
      res.json(results[0]);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

module.exports = { crearUsuario, getUser }
