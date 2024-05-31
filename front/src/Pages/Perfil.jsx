import { useEffect } from "react";
import { useUser } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      alert("Debes iniciar sesión para acceder a esta página");
      navigate("/login");
    }
  }, [user, loading]);
  return (
    <>
      <div>{user?.nombreUsuario}</div>
      <div>{user?.nombres}</div>
      <div>{user?.apellidos}</div>
    </>
  );
};

export default Perfil;
