import { useEffect } from "react";
import { useUser } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loading, user)
    if (loading) {
      return
    }
    if (!loading && !user) {
      alert("Debes iniciar sesión para acceder a esta página");
      navigate("/login");
    }
  }, [user, loading]);
  return (
    <>
      <p>Aqui estaran los viajes del usuario</p>
    </>
  );
};

export default Perfil;
