const ResumenCompra = ({ 
    clase, 
    origen, 
    horaLlegadaOrigen, 
    destino, 
    horasEstimadasViaje,
    asiento,
    pasajero,
    precio }) => {
  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 p-4">
          <h2 className="text-xl text-white font-semibold text-center">
            Resumen de su seleccion
          </h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Clase del autobus:</h3>
            <p className="text-gray-600">{clase}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Origen</h3>
            <p className="text-gray-600">{origen}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Hora de llegada:</h3>
            <p className="text-gray-600">{horaLlegadaOrigen}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Destino:</h3>
            <p className="text-gray-600">{destino}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Horas estimadas de viaje:</h3>
            <p className="text-gray-600">{horasEstimadasViaje}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Asiento</h3>
            <p className="text-gray-600">{asiento}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Pasajero</h3>
            <p className="text-gray-600">{pasajero}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <h3 className="text-gray-900 font-semibold">Precio</h3>
            <p className="text-gray-600">${precio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenCompra;
