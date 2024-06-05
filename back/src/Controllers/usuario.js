const pool = require('../Model/dbPool.js')
const bcrypt = require('bcrypt')
const { generarJWT } = require('../helpers/jwt.js')

const crearUsuario = async (req, res) => {
  const { nombreUsuario, contrasena, nombres, apellidos } = req.body
  if (!nombreUsuario) {
    return res.status(401).send({ success: 'false', error: 'falta nombre de usuario' })
  }
  if (!contrasena) {
    return res.status(401).send({ success: 'false', error: 'falta contrasena' })
  }
  if (!nombres) {
    return res.status(401).send({ success: 'false', error: 'faltan los nombres' })
  }
  if (!apellidos) {
    return res.status(401).send({ success: 'false', error: 'faltan los apellidos' })
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
          error: 'El username ya ha sido utilizado'
        });
      }

      const contrasenaHasheada = await bcrypt.hash(contrasena, 10);
      pool.query('INSERT INTO Usuario SET ?', { nombreUsuario, contrasenaHasheada, nombres, apellidos }, async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 'false',
            error: 'Server error'
          });
        }
        const token = await generarJWT(results.insertId, nombreUsuario);
        return res.status(201).send({ success: 'true', message: 'insertado con exito', token })
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: 'false',
      error: 'Server error'
    });
  }
}

const iniciarSesion = async (req, res) => {
  console.log(req.body)
  try {
    const { nombreUsuario, contrasena } = req.body;

    if (!nombreUsuario || !contrasena) return res.status(400).json({ error: 'Faltan datos' });

    pool.query('SELECT * FROM Usuario WHERE nombreUsuario = ?', [nombreUsuario], async (error, results) => {
      if (error) {
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

const getUser = async (req, res) => {
  try {
    const id = req.headers.userId;
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

const buscarMisViajesCompletados = async (req, res) => {
  const idUsuario = req.headers.userId;
  const sql = 
    `
    SELECT
      V.id AS idViaje,
      P1.fechaEstimadaLlegada AS fechaPartida,
      P2.fechaEstimadaLlegada AS fechaLlegada,
      CONCAT(C1.nombre, '-', C2.nombre) AS ciudades,
      (P2.numParada - P1.numParada - 1) AS numeroEscalas,
      A.clase AS clase,
      B.asiento AS asiento,
      O.costo AS precio
    FROM
      Orden O

      INNER JOIN Boleto B on O.id = B.idOrden
      
      INNER JOIN Parada P1 on O.paradaOrigen = P1.numParada and O.idViaje = P1.idViaje
      INNER JOIN Estacion E1 on P1.idEstacion = E1.id
      INNER JOIN Ciudad C1 on E1.idCiudad = C1.id
      INNER JOIN Estado ED1 on C1.idEstado = ED1.id
      
      INNER JOIN Parada P2 on O.paradaDestino = P2.numParada and O.idViaje = P2.idViaje
      INNER JOIN Estacion E2 on P2.idEstacion = E2.id
      INNER JOIN Ciudad C2 on E2.idCiudad = C2.id
      INNER JOIN Estado ED2 on C2.idEstado = ED2.id
      
      INNER JOIN Viaje V on P1.idViaje = V.id
      INNER JOIN Autobus A on V.idAutobus = A.id
    WHERE
      O.idUsuario = ${idUsuario} AND
      NOW() >= P2.fechaEstimadaLlegada AND
      NOW() < O.fechaExpiracion;
    `
  try {
    const [rows] = await pool.promise().query(sql);
    return res
      .status(200)
      .send({ success: true, message: "Viajes buscados con exito", rows });
  } catch(e) {
    return res.status(500).json({
      error: 'Server error'
    });
  }
};

const buscarMisViajesPendientes = async (req, res) => {
  const idUsuario = req.headers.userId;
  const sql = 
    `
    SELECT
      O.id AS idOrden,
      V.id AS idViaje,
      P1.fechaEstimadaLlegada AS fechaPartida,
      P2.fechaEstimadaLlegada AS fechaLlegada,
      CONCAT(C1.nombre, '-', C2.nombre) AS ciudades,
      (P2.numParada - P1.numParada - 1) AS numeroEscalas,
      A.clase AS clase,
      B.asiento AS asiento,
      O.costo AS precio
    FROM
      Orden O

      INNER JOIN Boleto B on O.id = B.idOrden
      
      INNER JOIN Parada P1 on O.paradaOrigen = P1.numParada and O.idViaje = P1.idViaje
      INNER JOIN Estacion E1 on P1.idEstacion = E1.id
      INNER JOIN Ciudad C1 on E1.idCiudad = C1.id
      INNER JOIN Estado ED1 on C1.idEstado = ED1.id
      
      INNER JOIN Parada P2 on O.paradaDestino = P2.numParada and O.idViaje = P2.idViaje
      INNER JOIN Estacion E2 on P2.idEstacion = E2.id
      INNER JOIN Ciudad C2 on E2.idCiudad = C2.id
      INNER JOIN Estado ED2 on C2.idEstado = ED2.id
      
      INNER JOIN Viaje V on P1.idViaje = V.id
      INNER JOIN Autobus A on V.idAutobus = A.id
    WHERE
      O.idUsuario = ${idUsuario} AND
      NOW() < P2.fechaEstimadaLlegada AND
      NOW() < O.fechaExpiracion;
    `
  try {
    const [rows] = await pool.promise().query(sql);
    return res
      .status(200)
      .send({ success: true, message: "Viajes buscados con exito", rows });
  } catch(e) {
    return res.status(500).json({
      error: 'Server error'
    });
  }
};

module.exports = {
  crearUsuario,
  getUser,
  iniciarSesion,
  buscarMisViajesCompletados,
  buscarMisViajesPendientes
}
