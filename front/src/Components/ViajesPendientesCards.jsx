const ViajesPendientesCards = ({ idOrden, idViaje, fechaPartida, fechaLlegada, ciudades, numeroEscalas, clase, asiento, precio, onClick }) => {
  const handleClick = () => {
    onClick({ idOrden });
  };
  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 p-4">
          <h2 className="text-xl text-white font-semibold text-center">
            {ciudades}
          </h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Fecha partida:</h3>
            <p className="text-gray-600">{fechaPartida}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Fecha llegada:</h3>
            <p className="text-gray-600">{fechaLlegada}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Escalas realizadas:</h3>
            <p className="text-gray-600">{numeroEscalas}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Clase del autobus:</h3>
            <p className="text-gray-600">{clase}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Asiento seleccionado:</h3>
            <p className="text-gray-600">{asiento}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Precio del boleto:</h3>
            <p className="text-gray-600">${precio}</p>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={handleClick} className="inline-flex items-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Cancelar orden</button>        </div>
          </div>
      </div>
    </div>
  );
};

export default ViajesPendientesCards;
