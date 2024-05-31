import React, { useEffect, useState } from "react";
import { useUser } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Viajar.css";
import axios from 'axios';

const URL_Estaciones = "http://localhost:4000/buscar/estaciones";

const Viajar = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState(new Date());
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [estaciones, setEstaciones] = useState([]);

  const ObtenerEstaciones = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(URL_Estaciones, { headers: {
        Authorization: token,
      }});
      const data = response.data;
      console.log(data);
      if (Array.isArray(data.rows)) {
        setEstaciones(data.rows);
      }
    } catch (error) {
      alert("Error al obtener las estaciones", error);
    }
  }

  useEffect(() => {
    console.log(loading, user)
    if (loading) {
      return
    }
    if (!loading && !user) {
      navigate("/login");
      alert("Debes iniciar sesión para acceder a esta página");
      return
    }
    ObtenerEstaciones();
  }, [user, loading]);

  const handleDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleOrigenChange = (newOrigen) => {
    setOrigen(newOrigen);
  };

  const handleDestinoChange = (newDestino) => {
    setDestino(newDestino);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!origen || !destino || !startDate) {
      console.log("Porfavor llene todos los campos");
      return;
    }
    let fecha = startDate.split("-").reduce((acc, item) => {
      return acc + item;
    }, "");

    navigate("/ViajesDisponibles", {
      state: { origen, destino, hora: fecha },
    });

    console.log("Origen: ", origen);
    console.log("Destino: ", destino);
    console.log("Fecha: ", fecha);
  };

  return (
    <div className="Viaje-Div-Central">
      <div className="Viaje-Div-Div-Central">
        <div className="Cuerpo-Viaje">
          <h1 className="Encabezado-Viaje">Bienvenido a la página de Viaje</h1>
          <p className="Mensaje-Campos">Llene los siguientes campos porfavor</p>

          <form className="Form-Viajes">
            <label htmlFor="name" className="Label-Origen-Viaje">
              Origen:
            </label>
            <select className="seleccionar-ciudad-origen"
              id="seleccionar-ciudad"
              onChange={(e) => handleOrigenChange(e.target.value)}>
              <option value="Ciudad">Seleccionar Estacion:</option>
              {estaciones.map((estacion, index) => (
                <option key={index} value={estacion.estacion_id}>
                  {estacion.nombre_ciudad + ", " + estacion.nombre_estado}
                </option>
              ))}
            </select>
            <label htmlFor="email" className="Label-Destino-Viaje">
              Destino:
            </label>
            <select className="seleccionar-ciudad-destino"
              id="seleccionar-ciudad"
              onChange={(e) => handleDestinoChange(e.target.value)}>
              <option value="">Seleccionar Estacion:</option>
              {estaciones.map((estacion, index) => (
                <option key={index} value={estacion.estacion_id}>
                  {estacion.nombre_ciudad + ", " + estacion.nombre_estado}
                </option>
              ))}
            </select>
            <label htmlFor="startDate" className="Label-Fecha-Viaje">
              Fecha:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="seleccionar-fecha-viaje"
            />
            <button
              type="submit"
              className="Boton-Enviar-Viaje"
              onClick={submitForm}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Viajar;
