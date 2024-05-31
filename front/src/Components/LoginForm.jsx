import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUser } = useUser();

  const loginURI = "http://localhost:4000/usuario/login";

  async function checkLogin(url) {
    const userData = {
      nombreUsuario: username,
      contrasena: password
    };

    try {
      const response = await axios.post(url, userData);
      return response.data.token;
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Debe ingresar usuario y contraseña");
      return;
    }

    try {
      const token = await checkLogin(loginURI);
      localStorage.setItem("token", token)
      await fetchUser()
      alert('Sesion iniciada con exito')
      navigate('/viajar')
    } catch (error) {
      console.log(error)
      alert(error)
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="Formulario-Inicio-Sesion" onSubmit={handleSubmit}>
      <label htmlFor="username" className="user">
        Username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={handleUsernameChange}
        className="Entrada-Username"
      />
      <label htmlFor="password" className="pass">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handlePasswordChange}
        className="Entrada-Password"
      />

      <div className="pt-4">
        <p>
          Aun no tienes cuenta?{" "}
          <a onClick={handleSignUp} className="font-bold registrate-anchor">
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
  );
};

export default LoginForm;
