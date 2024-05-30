import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL_Estaciones = "http://localhost:4000/buscar/estaciones";

const Viajar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [estaciones, setEstaciones] = useState([]);

  const ObtenerEstaciones = async () => {
    try {
      const response = await fetch(URL_Estaciones, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },

      });
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
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
    <div className="container mx-auto my-20">
      <div className="grid grid-cols-1 px-auto">
        <div className="text-center">
          <h1 className="text-4xl">Bienvenido a la página de Viaje</h1>
          <p className="text-lg py-8">Llene los siguientes campos porfavor</p>

          <form className="flex flex-col space-y-2 mx-8 md:mx-96">
            <label htmlFor="name" className="text-gray-700 font-bold">
              Origen:
            </label>
            <select id="seleccionar-ciudad"
              onChange={(e) => handleOrigenChange(e.target.value)}>
              <option value="">Seleccionar Estacion</option>
              {estaciones.map((estacion, index) => (
                <option key={index} value={estacion.nombre_estacion}>
                  {estacion.nombre_estacion}
                </option>
              ))}
            </select>
            <label htmlFor="email" className="text-gray-700 font-bold">
              Destino:
            </label>
            <input
              type="destino"
              id="destino"
              name="destino"
              placeholder="Ejemplo: Cancún"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => handleDestinoChange(e.target.value)}
            />
            <label htmlFor="startDate" className="text-gray-700 font-bold">
              Fecha:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
