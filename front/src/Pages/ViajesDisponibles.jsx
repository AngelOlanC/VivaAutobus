import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ViajesCards from "../Components/ViajesCards";

const URL_ViajesDisponibles = "http://localhost:4000/buscar/viajes";

const ViajesDisponibles = () => {
  const location = useLocation();
  const [viajes, setViajes] = useState([]);
  const [NombreOrigen, setNombreOrigen] = useState("");
  const [NombreDestino, setNombreDestino] = useState("");

  const { origen, destino, hora } = location.state || {
    origen: "N/A",
    destino: "N/A",
    hora: "N/A",
  };

  const ObtenerViajes = async () => {
    try {
      const response = await fetch(`${URL_ViajesDisponibles}/${origen}/${destino}/${hora}`
      );
      const data = await response.json();
      if (Array.isArray(data.rows)) {
        setViajes(data.rows);
      }
    } catch (error) {
      alert("Error al obtener los viajes", error);
    }
  }

  const ObtenerNombreOrigen = async () => {
    try {
      const response = await fetch(`http://localhost:4000/buscar/estaciones/${origen}`);
      const data = await response.json();

      if (Array.isArray(data.rows)) {
        setNombreOrigen(data.rows[0].nombre_estacion)
      }
    } catch (error) {
      alert("Error al obtener los viajes", error);
    }
  }

  const ObtenerNombreDestino = async () => {
    try {
      const response = await fetch(`http://localhost:4000/buscar/estaciones/${destino}`);
      const data = await response.json();

      if (Array.isArray(data.rows)) {

        setNombreDestino(data.rows[0].nombre_estacion)
      }
    } catch (error) {
      alert("Error al obtener los viajes", error);
    }
  }


  useEffect(() => {
    ObtenerNombreOrigen();
    ObtenerNombreDestino();
    ObtenerViajes();
  }, []);

  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

  const handleTarjetaClick = (datosTarjeta) => {
    setTarjetaSeleccionada(datosTarjeta);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-4xl">Viajes Disponibles</h1>
      <h2 className="text-center text-2xl mt-4">
        Origen: {NombreOrigen}
      </h2>
      <h2 className="text-center text-2xl mt-4">
        Destino: {NombreDestino}
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
        {viajes.map((viaje, index) => (
          <ViajesCards
            key={index}
            marca={viaje.marca_autobus}
            horallegada={viaje.hora_estimada_llegada}
            escalas={viaje.numero_escalas}
            tiempoestimado={viaje.horas_estimadas_viaje}
            onClick={handleTarjetaClick}
          />
        ))}
      </div>
      {tarjetaSeleccionada && (
        <div className="grid grid-cols-1 justify-items-center items-center align-middle">
          <h2 className="text-2xl mt-8">Detalles del viaje seleccionado:</h2>
          <p className="text-lg mt-4">Origen: {tarjetaSeleccionada.origen}</p>
          <p className="text-lg">Destino: {tarjetaSeleccionada.destino}</p>
          <p className="text-lg">Hora: {tarjetaSeleccionada.hora}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Ver asientos
          </button>
        </div>
      )}
    </div>
  );
};

export default ViajesDisponibles;
