import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function Pago() {
  const [message, setMessage] = useState("");

  const initialOptions = {
    "client-id": "AQbP0CLYM82XSL4wi8x8qTeFa-hTjVQzcg8ZodqZ1pbuWaYYqd49y4-2Ddk4mSFfKngHYiSrr5ocSbTm",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "US",
    currency: "MXN",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder = { async () => {
            try {
              const response = await fetch("api/ordenes", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
          
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
          
                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          } 
        }
          onApprove = { async (data, actions) => {
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
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
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
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }
         }
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default Pago; 