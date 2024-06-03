const fetch = require('node-fetch');
const pool = require("../Model/dbPool.js");
const { getUser } = require('./usuario.js')

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const generarTokenAcceso = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("No se pudo generar el token de acceso:", error);
  }
};

const crearOrden = async (idOrden, monto) => {
  const accessToken = await generarTokenAcceso();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: idOrden,
        amount: {
          currency_code: "MXN",
          value: monto,
        }
      }
    ]
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    method: "POST",
    body: JSON.stringify(payload)
  });

  return handleResponse(response);
};

const capturarOrden = async (orderID) => {
  const accessToken = await generarTokenAcceso();
  console.log(orderID);
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  console.log("capturando", url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  console.log(response)
  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

// TERMINA PARTE DE PAYPAL

const apartarOrden = async (userId, costo, idViaje, idOrigen, idDestino, asiento) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      return connection.beginTransaction(err => {
        if (err) {
          connection.release();
          return reject("Error al crear la transaccion");
        }
        const sqlCrearOrden =
        `
        INSERT INTO Orden(idViaje, idUsuario, paradaOrigen, paradaDestino, metodoPago, costo, fechaExpiracion) VALUES
          (${idViaje}, ${userId}, ${idOrigen}, ${idDestino}, 'tarjeta', ${costo}, DATE_ADD(NOW(), INTERVAL 20 MINUTE));
        `;
        return connection.query(sqlCrearOrden, [], (err, res) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              return reject("Error al crear la orden", err);
            });
          }
          const idOrden = res.insertId;
          const sqlGetInformacionUsuario =
            `
            SELECT 
              nombres,
              apellidos
            FROM
              Usuario
            WHERE
              id = ${userId};  
            `
          return connection.query(sqlGetInformacionUsuario, [], (err, res) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                return reject("Error al obtener la informacion del usuario", err);
              });
            }
            const { nombres, apellidos } = res[0];
        
            const sqlCrearBoleto =
              `
              INSERT INTO Boleto(idOrden, asiento, nombres, apellidos) VALUES
                (${idOrden}, ${asiento}, '${nombres}', '${apellidos}')
              `;
            return connection.execute(sqlCrearBoleto, [], (err, res) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  return reject("Error al crear el boleto", err);
                });
              }
              return connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        return reject("Commit failed");
                    });
                }
                connection.release();
                return resolve(idOrden);
              });
            });
          });
        });
      });
    });
  });
}

const confirmarOrden = async (req, res) => {
  const { idOrden } = req.params;

  const sql =
    `
    UPDATE Orden
    SET fechaExpiracion = '20490101010101'
    WHERE id = ${idOrden};
    `
  try {
    await pool.promise().query(sql);

    return res.status(200).json({
      success: "true",
      message: "Orden confirmada"
    })
  } catch(e) {
    return res.status(500).json({
      success: "false",
      error: "Server error"
    })
  }
}

const getResumen = async (req, res) => {
  const { idOrden } = req.params;

  const sql =
    `
    SELECT
      A.clase AS clase,
      CONCAT(C1.nombre, ', ', E1.nombre, ', ', ED1.nombre) AS origen,
      HOUR(P1.fechaEstimadaLlegada) AS horaLlegadaOrigen,
      CONCAT(C2.nombre, ', ', E2.nombre, ', ', ED2.nombre) AS destino,
      HOUR(TIMEDIFF(P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada)) AS horasEstimadasViaje,
      B.asiento AS asiento,
      CONCAT(B.nombres, ' ', B.apellidos) AS pasajero,
      O.costo AS precio
    FROM
      Orden O
      INNER JOIN Boleto B on O.id = B.idOrden

      INNER JOIN Usuario U on O.idUsuario = U.id
      
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
      O.id = ${idOrden};
    `
    try {
      const [rows, cols] = await pool.promise().query(sql);

      return res.status(200).json({
        success: true,
        rows
      });
    } catch (e) {
      console.log(e)
      return res.status(500).json({
        success: false,
        message: e
      })
    }
};

module.exports = {
  crearOrden,
  capturarOrden,
  apartarOrden,
  confirmarOrden,
  getResumen
}