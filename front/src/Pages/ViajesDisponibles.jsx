import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import ViajesDisponiblesCards from "../Components/ViajesDisponiblesCards";
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
      const rows = response.data?.rows;
      if (rows?.length === 0) {
        alert('No hay viajes disponibles con los parametros dados. Volveras a la pagina de viajes');
        return navigate("/viajar");
      }
      if (Array.isArray(rows)) {
        setViajes(rows);
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
    const { idViaje, id_num_parada_origen, id_num_parada_destino } = datosTarjeta;
    console.log(idViaje, id_num_parada_origen, id_num_parada_destino);
    return navigate(`/asientos/${idViaje}/${id_num_parada_origen}/${id_num_parada_destino}`);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-4xl">Viajes Disponibles</h1>
      <h2 className="text-center text-2xl mt-4">{NombreOrigen}</h2>
      <h2 className="text-center text-2xl mt-4">{NombreDestino}</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
        {viajes.map((viaje, index) => (
          <ViajesDisponiblesCards
            key={index}
            idViaje={viaje.id_viaje}
            origen={viaje.estacion_origen}
            destino={viaje.estacion_destino}
            clase={viaje.clase_autobus}
            horallegada={viaje.hora_estimada_llegada}
            escalas={viaje.numero_escalas}
            tiempoestimado={viaje.horas_estimadas_viaje}
            onClick={handleTarjetaClick}
            id_num_parada_origen = {viaje.id_num_parada_origen}
            id_num_parada_destino = {viaje.id_num_parada_destino}
          />
        ))}
      </div>
    </div>
  );
};

export default ViajesDisponibles;
