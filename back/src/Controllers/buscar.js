const pool = require("../Model/dbPool.js");

const buscarAsientos = async (_req, _res) => {};

const buscarViajes = async (req, res) => {
  const { idOrigen, idDestino, fecha } = req.params;
  // Se espera la fecha en formato AAAAMMDD

  if (idOrigen === idDestino) {
    return res.status(400).send({
      success: "false",
      message: "origen y destino no pueden ser iguales",
    });
  }
  if (fecha.length !== 8) {
    return res.status(400).send({
      success: "false",
      message: "fecha con formato incorrecto, debe de ser AAAAMMDD",
    });
  }

  try {
    const [idOrigenRows] = await pool
      .promise()
      .query(`SELECT * FROM Estacion WHERE ID = ${idOrigen};`);
    if (idOrigenRows.length === 0) {
      return res.status(400).send({
        success: "false",
        message: "no existe una estacion con el id de origen",
      });
    }

    const [idDestinoRows] = await pool
      .promise()
      .query(`SELECT * FROM Estacion WHERE ID = ${idDestino};`);
    if (idDestinoRows.length === 0) {
      return res.status(400).send({
        success: "false",
        message: "no existe una estacion con el id de destino",
      });
    }

    const sqlQuery = 
      `SELECT
        p1.idViaje AS id_viaje,
        A.marca AS marca_autobus,
        P1.fechaEstimadaLlegada AS hora_estimada_llegada,
        (P2.numParada - P1.numParada - 1) AS numero_escalas,
        hour(TIMEDIFF(P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada)) AS horas_estimadas_viaje
      FROM
        Parada P1
        INNER JOIN Parada P2 on P1.idViaje = P2.idViaje AND P1.numParada < P2.numParada
        INNER JOIN Viaje V on P1.idViaje = V.ID
        INNER JOIN Autobus A on V.IdAutobus = A.ID
      WHERE
        date(P1.fechaEstimadaLlegada) >= '${fecha}'AND
        P1.idEstacion = ${idOrigen} AND 
        P2.idEstacion = ${idDestino};`;
    const [rows, cols] = await pool
      .promise()
      .query(sqlQuery);
    return res
      .status(200)
      .send({ success: true, message: "Viajes buscados con exito", rows });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: "Error al buscar viajes" });
  }
};

const buscarEstaciones = async (_req, res) => {
  try {
    const sqlQuery = `SELECT 
                          EN.ID AS estacion_id, 
                          EN.nombre AS nombre_estacion, 
                          C.nombre AS nombre_ciudad, 
                          E.nombre AS nombre_estado
                      FROM 
                          Estacion EN 
                          INNER JOIN Ciudad C on C.Id = EN.IdCiudad 
                          INNER JOIN Estado E on E.id = C.IdEstado;`;
    const [rows] = await pool.promise().query(sqlQuery);
    res.status(200).send({
      success: true,
      message: "Estaciones encontradas con exito",
      rows,
    });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, message: "Error al buscar estaciones" });
  }
};

module.exports = { buscarAsientos, buscarViajes, buscarEstaciones };
