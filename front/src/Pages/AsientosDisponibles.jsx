import { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Components/UserContext";
import asientoDisponibleImg from "/asientoDisponible.png";
import asientoOcupadoImg from "/asientoOcupado.png";

const AsientosDisponibles = () => {
  const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);
  const [asientoDisponible, setAsientoDisponible] = useState([]);
  const [asientoNoSeleccionadoError, setAsientoNoSeleccionadoError] =
    useState(false);
  const { idViaje, idOrigen, idDestino } = useParams();
  const { user, loading } = useUser();
  const [cargando, setCargando] = useState(true);
  const asientosURI =
    `/api/buscar/asientos/${idViaje}/${idOrigen}/${idDestino}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAsientosDisponibles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get(asientosURI, {
          headers: {
            Authorization: token,
          },
        });
        setAsientoDisponible([]);
        res.data.asientos.forEach((asiento) => {
          setAsientoDisponible((prev) => [
            ...prev,
            asiento.estado == "libre" ? true : false,
          ]);
        });
        setCargando(false);
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    };

    if (loading) return;
    if (!user) {
      navigate("/login");
    }

    fetchAsientosDisponibles();
  }, [loading]);

  const setSelected = (asiento) => {
    setAsientoSeleccionado(asiento);
  };

  const submit = async () => {
    if (asientoSeleccionado) {
      const URL_API_APARTAR = `/api/ordenes/apartar/${idViaje}/${idOrigen}/${idDestino}/${asientoSeleccionado}`;
      console.log(URL_API_APARTAR);
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios({
        method:'POST',
        url:URL_API_APARTAR,
        headers:{
          Authorization: token,
          costo: 200,
        }
      });
      const { idOrden } =  res.data
      console.log(idOrden)
      const URL_PAGO = `/pago/${idOrden}`;
      navigate(URL_PAGO);
    } else {
      setAsientoNoSeleccionadoError(true);
      return;
    }
  };

  if (cargando) return <div>Cargando...</div>;
  return (
    <div className="container mx-auto mb-20">
      <div className="flex justify-center items-center min-h-screen rounded-lg">
        <div className="p-8 border-2 border-black rounded-md shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Asientos Disponibles
          </h1>
          <div className="grid grid-cols-7 grid-rows-4 gap-2 relative">
            {asientoDisponible.map((asiento, index) => (
              <Fragment key={index}>
                {(index == 3 || index == 9 || index == 15 || index == 21) && (
                  <div className="w-15 h-15 md:w-20 md:h-20 "></div>
                )}
                <div
                  className={`w-15 h-15 md:w-20 md:h-20 rounded-lg text-center ${
                    asientoSeleccionado !== index + 1 && "hover:bg-slate-200"
                  } ${asiento ? "cursor-pointer" : "cursor-not-allowed"} ${
                    asientoSeleccionado === index + 1 ? "bg-slate-300" : ""
                  }`}
                  onClick={() => {
                    setAsientoNoSeleccionadoError(false);
                    asiento ? setSelected(index + 1) : null;
                  }}
                >
                  <img
                    className="object-cover w-full h-full"
                    src={asiento ? asientoDisponibleImg : asientoOcupadoImg}
                    alt={`asiento-${index + 1}`}
                  />
                </div>
              </Fragment>
            ))}
          </div>

          {asientoNoSeleccionadoError ? (
            <div className="flex justify-center">
              <strong className="text-red-500 mt-4 bold">
                SELECCIONE UN ASIENTO
              </strong>
            </div>
          ) : (
            ""
          )}

          {asientoSeleccionado ? (
            <div className="flex justify-center">
              <strong className="text-indigo-500 mt-4 bold">
                ASIENTO SELECCIONADO: {asientoSeleccionado}
              </strong>
            </div>
          ) : (
            ""
          )}

          <div className="flex justify-center mt-4">
            <button
              className="bg-white text-black border-2 border-black py-2 px-4  rounded-lg hover:bg-slate-300"
              onClick={submit}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsientosDisponibles;
