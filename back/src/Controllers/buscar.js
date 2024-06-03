const pool = require("../Model/dbPool.js");

const buscarAsientos = async (req, res) => {
  const { idViaje, idOrigen, idDestino } = req.params;
  const sqlQuery =
    `
    SELECT
      asiento 
    FROM
      Boleto B
      INNER JOIN Orden O on B.idOrden = O.id
    WHERE
      O.IdViaje = ${idViaje} AND
      miMax(${idOrigen}, O.ParadaOrigen) <= miMin(${idDestino}, O.ParadaDestino) AND
      NOW() <= O.fechaExpiracion;`
  try {
    const [rows, cols] = await pool.promise().query(sqlQuery);
    const asientos = Array(24);
    rows.forEach(val => asientos[val.asiento - 1] = {
      asiento : val.asiento,
      estado: "ocupado"
    });
    for (let i = 1; i <= 24; i++) {
      // Llenar estado de asientos
      if (!asientos[i - 1]) {
        asientos[i - 1] = {
          asiento: i,
          estado: "libre",
        };
      }
    }
    return res
      .status(200)
      .send({ success: true, message: "Asientos buscados con exito", asientos });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ success: false, message: "Error al buscar asientos" });
  }
};

const buscarViajes = async (req, res) => {
  const { idOrigen, idDestino, fecha } = req.params;
  console.log(idOrigen, idDestino, fecha);
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
    const sqlQuery = `
      SELECT
          p1.idViaje AS id_viaje,
          A.clase AS clase_autobus,
          hour(P1.fechaEstimadaLlegada) AS hora_estimada_llegada,
          (P2.numParada - P1.numParada - 1) AS numero_escalas,
          hour(TIMEDIFF(P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada)) AS horas_estimadas_viaje,
          P1.numParada AS id_num_parada_origen,
          P2.numParada AS id_num_parada_destino
    FROM
          Parada P1
          INNER JOIN Parada P2 on P1.idViaje = P2.idViaje AND P1.numParada < P2.numParada
          INNER JOIN Viaje V on P1.idViaje = V.ID
          INNER JOIN Autobus A on V.IdAutobus = A.ID
      WHERE
          date(P1.fechaEstimadaLlegada) = '${fecha}' AND
          P1.idEstacion = ${idOrigen} AND 
          P2.idEstacion = ${idDestino};`;
    const [rows, cols] = await pool.promise().query(sqlQuery);
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
          INNER JOIN Estado E on E.id = C.IdEstado
      ORDER BY nombre_ciudad, nombre_estado, nombre_estacion;`;
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

const buscarNombreEstacion = async (req, res) => {
  const id = req.params.id;
  try {
    const sqlQuery = 
    `SELECT 
          EN.ID AS estacion_id, 
          EN.nombre AS nombre_estacion, 
          C.nombre AS nombre_ciudad, 
          E.nombre AS nombre_estado
      FROM 
          Estacion EN 
          INNER JOIN Ciudad C on C.Id = EN.IdCiudad 
          INNER JOIN Estado E on E.id = C.IdEstado
      WHERE 
          EN.ID = ${id};`;
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

module.exports = {
  buscarAsientos,
  buscarViajes,
  buscarEstaciones,
  buscarNombreEstacion
};
