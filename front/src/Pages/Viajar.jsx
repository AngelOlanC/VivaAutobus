import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles//Viajar.css";

const URL_Estaciones = "http://localhost:4000/buscar/estaciones";

const Viajar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [estaciones, setEstaciones] = useState([]);

  const ObtenerEstaciones = async () => {
    try {
      const response = await fetch(URL_Estaciones);
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data.rows)) {
        setEstaciones(data.rows);
      }
    } catch (error) {
      alert("Error al obtener las estaciones", error);
    }
  }

  useEffect(() => {
    ObtenerEstaciones();

  }, []);

  const navigate = useNavigate();

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

    navigate("/ViajesDisponibles", {
      state: { origen, destino, hora: startDate },
    });

    console.log("Origen: ", origen);
    console.log("Destino: ", destino);
    console.log("Fecha: ", startDate);
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
              <option value="">Seleccionar Estacion:</option>
              {estaciones.map((estacion, index) => (
                <option key={index} value={estacion.nombre_estacion}>
                  {estacion.nombre_estacion}
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
                <option key={index} value={estacion.nombre_estacion}>
                  {estacion.nombre_estacion}
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
