import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import ViajesCards from "../Components/ViajesCards";
import axios from "axios";

const URL_ViajesDisponibles = "api/buscar/viajes";

const ViajesDisponibles = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

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
      const token = localStorage.getItem("token");
      const URL = `${URL_ViajesDisponibles}/${origen}/${destino}/${hora}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;
      console.log(data);
      if (Array.isArray(data.rows)) {
        setViajes(data.rows);
      }
    } catch (error) {
      alert("Error al obtener los viajes", error);
    }
  };

  const ObtenerNombreEstacion = async (id) => {
    const token = localStorage.getItem("token");
    const URL = `api/buscar/estaciones/${id}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: token,
      },
    });
    const data = response.data;
    if (Array.isArray(data.rows)) {
      const estacion = data.rows[0];
      return (
        estacion.nombre_ciudad +
        ", " +
        estacion.nombre_estado +
        ", " +
        estacion.nombre_estacion
      );
    }
    return "???";
  };

  const ObtenerNombreOrigen = async () => {
    try {
      setNombreOrigen(await ObtenerNombreEstacion(origen));
    } catch (error) {
      alert("Error al obtener los viajes", error);
    }
  };

  const ObtenerNombreDestino = async () => {
    try {
      setNombreDestino(await ObtenerNombreEstacion(destino));
    } catch (error) {
      alert("Error al obtener los viajes", error);
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
    ObtenerNombreOrigen();
    ObtenerNombreDestino();
    ObtenerViajes();
  }, [user, loading]);

  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

  const handleTarjetaClick = (datosTarjeta) => {
    setTarjetaSeleccionada(datosTarjeta);
    navigate("/asientoDisponible");
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-4xl">Viajes Disponibles</h1>
      <h2 className="text-center text-2xl mt-4">{NombreOrigen}</h2>
      <h2 className="text-center text-2xl mt-4">{NombreDestino}</h2>
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
