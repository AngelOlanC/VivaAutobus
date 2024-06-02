const fetch = require('node-fetch');

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

const crearOrden = async () => {
  // use the cart information passed from the front-end to calculate the purchase unit details

  // const monto = cart.reduce((prev, curr) => prev + curr.costo);
  const monto = 100

  const accessToken = await generarTokenAcceso();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: 2,  
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

const actualizarBd = async (req, res) => {
  const { username, userId } = req.headers;
  console.log(username, userId)

  `
  INSERT
  `
}

module.exports = {
  crearOrden,
  capturarOrden,
  actualizarBd
}