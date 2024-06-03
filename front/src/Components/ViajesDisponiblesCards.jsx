const ViajesDisponiblesCards = ({ idViaje, clase, horallegada, escalas, tiempoestimado, onClick, id_num_parada_origen, id_num_parada_destino }) => {
  const handleClick = () => {
    onClick({ idViaje, id_num_parada_origen, id_num_parada_destino });
  };
  return (
    <div
      className="flex justify-center items-center px-4 py-8"
      onClick={handleClick}
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 p-4">
          <h2 className="text-xl text-white font-semibold text-center">
            Detalles del Viaje
          </h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Clase autobus:</h3>
            <p className="text-gray-600">{clase}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Hora de llegada:</h3>
            <p className="text-gray-600">{horallegada}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Escalas:</h3>
            <p className="text-gray-600">{escalas}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Horas de viaje:</h3>
            <p className="text-gray-600">{tiempoestimado}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViajesDisponiblesCards;
