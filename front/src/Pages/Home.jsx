import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/Registro");
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 px-auto">
          <img src="/logo.png" alt="logo" className="justify-self-center" width="40%"/>
        <div className="text-center">
          <h1 className="Titulo-Inicia-Sesion">Inicia sesion</h1>
          <form className="Formulario-Inicio-Sesion">
            <label htmlFor="username" className="user">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="Entrada-Username"
            />
            <label htmlFor="password" className="pass">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="Entrada-Password"
            />

            <div className="pt-4">
              <p>
                Aun no tienes cuenta?{" "}
                <a onClick={handleSignUp} className="font-bold">
                  Registrate aqui!
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
