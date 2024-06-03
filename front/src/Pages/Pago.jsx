import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ResumenCompra from "../Components/ResumenCompra";
import axios from "axios";

const URI_BASE = "/api/ordenes";

const Pago = () => {
  const { idOrden } = useParams();
  const { user, loading } = useUser();
  const [resumen, setResumen] = useState({});
  const navigate = useNavigate();
  let precio = 100

  const obtenerResumen = async () => {
    try {
      const token = localStorage.getItem("token");
      const URL = `${URI_BASE}/${idOrden}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data.rows[0];
      precio = data.precio;
      setResumen(data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
      return navigate("/perfil");
    }
  };

  useEffect(() => {
    if (loading) {
        return;
    }
    if (!loading && !user) {
        navigate("/login");
        alert("Debes iniciar sesión para acceder a esta página");
        return;
    }
    obtenerResumen();
  }, [user, loading]);


  const [message, setMessage] = useState("");

  const Message = ({ content }) => <p>{content}</p>;

  const paypalInitialOptions = {
    "client-id": "Ae9CzPGtyMUxZzq95eC6lPn6ElTwj1YuOuIfFu7mIZNRp-IXSrtvdc6McXxS-wnH1VNBdSIeKCjitkJ6",
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
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await fetch(`${URI_BASE}/${idOrden}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        
        body: JSON.stringify({
          monto: precio
        }),
      });
  
      const orderData = await response.json();
      console.log(orderData);
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
      console.log("capturando");
      const token = localStorage.getItem('token')
      console.log(token)
      const response = await fetch(
        `${URI_BASE}/${data.orderID}/capturar/${idOrden}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
        }
      );
  
      const orderData = await response.json();
      console.log("capturando", orderData)
      const errorDetail = orderData?.details?.[0];
      console.log(errorDetail)
  
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        console.log("instrumento declinado")
        return actions.restart();
      } else if (errorDetail) {
        console.log("error", errorDetail)
      } else {
        console.log("else")
      const transaction =
          orderData.purchase_units[0].payments.captures[0];
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
      await fetch(`${URI_BASE}/${idOrden}/confirmar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      console.log("ALGO BIEN");
      alert("Pago realizado con exito!");
      navigate('/perfil')
    } catch (error) {
      console.log("VALIO VERGA", error)
      console.error(error);
    }
  };

  return (
    <>
      <ResumenCompra 
        {...resumen}
        className="h-screen flex items-center justify-center"
      />
      <div className="h-screen flex  justify-center">
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
    </>
  );
};

export default Pago; 