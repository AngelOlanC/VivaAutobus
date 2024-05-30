const ViajesCards = ({ origen, destino, hora, onClick }) => {
  const handleClick = () => {
    onClick({ origen, destino, hora });
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
            <h3 className="text-gray-900 font-semibold">Origen:</h3>
            <p className="text-gray-600">{origen}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Destino:</h3>
            <p className="text-gray-600">{destino}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Hora:</h3>
            <p className="text-gray-600">{hora}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViajesCards;
