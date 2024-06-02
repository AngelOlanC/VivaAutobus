const pool = require("../Model/dbPool.js");

const buscarAsientos = async (req, res) => {
  console.log("A")
  const { idViaje, idOrigen, idDestino } = req.params;
  console.log(idViaje, idOrigen, idDestino)
  const sqlQuery =
    `
    SELECT
      asiento 
    FROM
      Boleto B
      INNER JOIN Orden O on B.idOrden = O.id
    WHERE
      O.IdViaje = ${idViaje} and
      miMin(${idOrigen}, O.ParadaOrigen) <= miMax(${idDestino}, O.ParadaDestino) and
      miMin(${idDestino}, O.ParadaDestino) <= miMax(${idOrigen}, O.ParadaOrigen);
    `;

  try {
    const [rows, cols] = await pool.promise().query(sqlQuery);
    for (let i = 1; i <= 24; i++) {
      // Llenar estado de asientos
      if (!rows[i - 1]) {
        rows[i - 1] = {
          asiento: i,
          estado: "libre",
        };
      } else {
        rows[i - 1].estado = "ocupado";
      }
    }
    return res
      .status(200)
      .send({ success: true, message: "Asientos buscados con exito", rows });
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
          A.marca AS marca_autobus,
          hour(P1.fechaEstimadaLlegada) AS hora_estimada_llegada,
          (P2.numParada - P1.numParada - 1) AS numero_escalas,
          hour(TIMEDIFF(P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada)) AS horas_estimadas_viaje
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
    const sqlQuery = `SELECT 
          EN.ID AS estacion_id, 
          EN.nombre AS nombre_estacion, 
          C.nombre AS nombre_ciudad, 
          E.nombre AS nombre_estado
      FROM 
          Estacion EN 
          INNER JOIN Ciudad C on C.Id = EN.IdCiudad 
          INNER JOIN Estado E on E.id = C.IdEstado
      WHERE EN.ID = ${id};`;
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

const buscarViajesCompletados = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const sqlQuery = `
      SELECT
          p1.idViaje AS id_viaje,
          A.marca AS marca_autobus,
          hour(P1.fechaEstimadaLlegada) AS hora_estimada_llegada,
          (P2.numParada - P1.numParada - 1) AS numero_escalas,
          hour(TIMEDIFF(P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada)) AS horas_estimadas_viaje
      FROM
          Parada P1
          INNER JOIN Parada P2 on P1.idViaje = P2.idViaje AND P1.numParada < P2.numParada
          INNER JOIN Viaje V on P1.idViaje = V.ID
          INNER JOIN Autobus A on V.IdAutobus = A.ID
          INNER JOIN Orden O on P1.idViaje = O.IdViaje
          INNER JOIN Usuario U on O.IdUsuario = U.ID
      WHERE
          U.ID = ${idUsuario};`;
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

const buscarViajesPendientes = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const sqlQuery = `
      SELECT
          p1.idViaje AS id_viaje,
          A.marca AS marca_autobus,
          hour(P1.fechaEstimadaLlegada) AS hora_estimada_llegada,
          (P2.numParada - P1.numParada ) AS numero_escalas,
          hour(TIMEDIFF(P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada)) AS horas_estimadas_viaje
      FROM
          Parada P1
          INNER JOIN Parada P2 on P1.idViaje = P2.idViaje AND P1.numParada < P2.numParada
          INNER JOIN Viaje V on P1.idViaje = V.ID
          INNER JOIN Autobus A on V.IdAutobus = A.ID
          INNER JOIN Orden O on P1.idViaje = O.IdViaje
          INNER JOIN Usuario U on O.IdUsuario = U.ID
      WHERE
          U.ID = ${idUsuario} AND HOUR(P1.fechaEstimadaLlegada) > 9 ORDER BY P2.idViaje;`;
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

module.exports = {
  buscarAsientos,
  buscarViajes,
  buscarEstaciones,
  buscarNombreEstacion,
  buscarViajesCompletados,
  buscarViajesPendientes,
};
