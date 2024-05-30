import { useState } from "react";
import { useLocation } from "react-router-dom";
import ViajesCards from "../Components/ViajesCards";

const ViajesDisponibles = () => {
  const location = useLocation();
  const { origen, destino, hora } = location.state || {
    origen: "N/A",
    destino: "N/A",
    hora: "N/A",
  };

  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

  const handleTarjetaClick = (datosTarjeta) => {
    setTarjetaSeleccionada(datosTarjeta);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-center text-4xl">Viajes Disponibles</h1>
      <h2 className="text-center text-2xl mt-4">
        Origen: {origen} - Destino: {destino}
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
        <ViajesCards
          origen={origen}
          destino={destino}
          hora={hora}
          onClick={handleTarjetaClick}
        />
        <ViajesCards
          origen={origen}
          destino={destino}
          hora={hora}
          onClick={handleTarjetaClick}
        />
        <ViajesCards
          origen={origen}
          destino={destino}
          hora={hora}
          onClick={handleTarjetaClick}
        />
        <ViajesCards
          origen={origen}
          destino={destino}
          hora={hora}
          onClick={handleTarjetaClick}
        />
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
