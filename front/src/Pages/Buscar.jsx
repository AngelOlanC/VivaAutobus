import { Navigate } from "react-router-dom";
import validarSesion from "./../Extra/ValidarSesion";

const Buscar = () => {
  if (!validarSesion()) {
    alert("tienes que iniciar sesion cabronazo");
    return <Navigate to="/login" state={{ from: "/buscar" }} replace />;
  }
  alert("todo bien, traes la sesion al fregazo");
};

export default Buscar;