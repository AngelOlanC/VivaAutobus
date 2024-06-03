import { useEffect } from "react";
import { useUser } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";

import "../Styles/Perfil.css";
import imagen from "../Images/perfil.png";

const Perfil = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!loading && !user) {
      alert("Debes iniciar sesión para acceder a esta página");
      navigate("/login");
    }
  }, [user, loading]);

  const handleBotonViajesCompletados = () => {
    navigate("/viajesCompletados");
  };

  const handleBotonViajesPendientes = () => {
    navigate("/viajesPendientes");
  };

  return (
    <>
      <div className="Cuerpo-Flex-Perfil">
        <h1 className="Etiqueta-Cuerpo-Perfil">Perfil</h1>
        <div className="Cuadro-Central-Perfil">
          <div className="Cuadro-Imagen">
            <img src={imagen} alt="imagen" className="Imagen-Perfil" />
            <div className="Nombre-Usuario">
              <label htmlFor="?1" className="Etiqueta-Nombre-Usuario">
                {" "}
                Usuario: {user?.nombreUsuario}
              </label>
              <div className="Nombre-Personal-Usuario">
                <label htmlFor="?2" className="Etiqueta-Nombre-Personal">
                  Nombre:{" "}
                </label>
                {user?.nombres}
              </div>
              <div className="Apellidos-Personal-Usuario">
                <label htmlFor="?3" className="Etiqueta-Apellidos-Personal">
                  Apellidos:{" "}
                </label>
                {user?.apellidos}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-2 py-4 bg-white font-semibold border rounded-lg shadow-lg sm:flex-col">
          <button
            className="Boton-Viajes-Perfil"
            onClick={handleBotonViajesCompletados}
          >
            Viajes Completados
          </button>
          <button
            className="Boton-Finalizados-Perfil"
            onClick={handleBotonViajesPendientes}
          >
            Viajes Pendientes
          </button>
        </div>
      </div>
    </>
  );
};

export default Perfil;
