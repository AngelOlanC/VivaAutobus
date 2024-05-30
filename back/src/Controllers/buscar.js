const pool = require('../Model/dbPool.js')

const buscarAsientos = async (req, res) => {
  // const { origen, destino, fecha } = req.params

  // if (!origen) {
  //   return res.status(400).send({ success: 'false', message: 'falta origen' })
  // }

  // if (!destino) {
  //   return res.status(400).send({ success: 'false', message: 'falta destino' })
  // }

  // if (!fecha) {
  //   return res.status(400).send({ success: 'false', message: 'falta fecha' })
  // }

  // try {
  //   const idOrigen = await pool.promise().query(`select ID from Estacion where nombre='${origen}`)
  //   const idDestino = await pool.promise().query(`select ID from Estacion where nombre='${destino}`)

  //   const sqlQuery = `select p1.idViaje as idViaje, A.marca as marcaAutobus, hour(P1.fechaEstimadaLlegada) as horaEstimadaLlegada
  //                     from Parada P1
  //                     inner join Parada P2 on P1.idviaje = P2.idviaje and P1.numParada < P2.numParada
  //                     inner join Viaje V on P1.idViaje = V.ID
  //                     inner join Autobus A on V.IdAutobus = A.ID
  //                     where P1.idEstacion = ${idOrigen} and P2.idEstacion = ${idDestino}`
  //   const [rows] = pool.query(sqlQuery)
  //   res.status(201).send({ success: true, message: 'Viajes buscados con exito', rows })
  // } catch (e) {
  //   res.status(500).send({ success: false, message: 'Error al buscar viajes' })
  // }
}

const buscarViajes = async (req, res) => {
  const { origen, destino, fecha } = req.params

  if (!origen) {
    return res.status(400).send({ success: 'false', message: 'falta origen' })
  }

  if (!destino) {
    return res.status(400).send({ success: 'false', message: 'falta destino' })
  }

  if (!fecha) {
    return res.status(400).send({ success: 'false', message: 'falta fecha' })
  }

  try {
    const idOrigen = await pool.promise().query(`select ID from Estacion where nombre='${origen}`)
    const idDestino = await pool.promise().query(`select ID from Estacion where nombre='${destino}`)

    const sqlQuery = `select p1.idViaje as idViaje, A.marca as marcaAutobus, hour(P1.fechaEstimadaLlegada) as horaEstimadaLlegada
                      from Parada P1
                      inner join Parada P2 on P1.idviaje = P2.idviaje and P1.numParada < P2.numParada
                      inner join Viaje V on P1.idViaje = V.ID
                      inner join Autobus A on V.IdAutobus = A.ID
                      where P1.idEstacion = ${idOrigen} and P2.idEstacion = ${idDestino}`
    const [rows] = pool.query(sqlQuery)
    res.status(200).send({ success: true, message: 'Viajes buscados con exito', rows })
  } catch (e) {
    res.status(500).send({ success: false, message: 'Error al buscar viajes' })
  }
}

const buscarEstaciones = async (req, res) => {
  try {
    const sqlQuery = `select EN.nombre as nombre_estacion, C.nombre as nombre_ciudad, E.nombre as nombre_estado 
                      from Estacion EN 
                      inner join Ciudad C on C.Id = EN.IdCiudad 
                      inner join Estado E on E.id = C.IdEstado;`
    const resultados = await pool.promise().query(sqlQuery)
    res.status(200).send({ success: true, message: 'Estaciones encontradas con exito', resultados })
  } catch (e) {
    console.error(e)
    res.status(500).send({ success: false, message: 'Error al buscar estaciones' })
  }
}

module.exports = { buscarAsientos, buscarViajes, buscarEstaciones }
