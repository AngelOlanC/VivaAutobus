import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const URI_BASE = "api/ordenes";

const Pago = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loading, user);
    if (loading) {
        return;
    }
    if (!loading && !user) {
        navigate("/login");
        alert("Debes iniciar sesión para acceder a esta página");
        return;
    }
    ObtenerViajesCompletados();
  }, [user, loading]);

  // TODO:
  // - Recuperar la informacion del viaje y mostrar un resumen de ello
  // - Con la informacion de compra, calcular dinamicamente el precio del producto
  // - 
  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <PayPalScriptProvider options={paypalInitialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder = { crearOrden }
          onApprove = { capturarOrden }
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
};


// Renders errors or successfull transactions on the screen.
const Message = ({ content }) => <p>{content}</p>;

const paypalInitialOptions = {
  "client-id": "AQbP0CLYM82XSL4wi8x8qTeFa-hTjVQzcg8ZodqZ1pbuWaYYqd49y4-2Ddk4mSFfKngHYiSrr5ocSbTm",
  "enable-funding": "venmo",
  "disable-funding": "",
  "buyer-country": "MX",
  currency: "MXN",
  "data-page-type": "product-details",
  components: "buttons",
  "data-sdk-integration-source": "developer-studio",
};

const crearOrden = async () => {
  try {
    const response = await fetch(URI_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // Carrito de compra, falta meterle dinamismo
      body: JSON.stringify({
        cart: [
          {
            id: "YOUR_PRODUCT_ID",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    });

    const orderData = await response.json();

    if (orderData.id) {
      return orderData.id;
    } else {
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        : JSON.stringify(orderData);

    }
  } catch (error) {
    console.error(error);
  }
};

const capturarOrden = async (data, actions) => {
  try {
    const response = await fetch(
      `/api/ordenes/${data.orderID}/capturar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const orderData = await response.json();
    const errorDetail = orderData?.details?.[0];

    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
      return actions.restart();
    } else if (errorDetail) {
      throw new Error(
        `${errorDetail.description} (${orderData.debug_id})`
      );
    } else {
      const transaction =
        orderData.purchase_units[0].payments.captures[0];
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );
    }
    alert("Pago realizado con exito!")
    // NAVEGAR AL PERFIL OTRA VEZ
  } catch (error) {
    console.error(error);
  }
};

export default Pago; 