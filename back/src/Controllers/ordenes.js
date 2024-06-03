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

const crearOrden = async (monto) => {
  const accessToken = await generarTokenAcceso();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
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
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

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
  const { username, userId } = req.headers;
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

module.exports = {
  crearOrden,
  capturarOrden,
  apartarOrden,
  confirmarOrden
}