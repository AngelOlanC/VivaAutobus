import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import axios from "axios";
const Registro = () => {

  const [userData, setUserData] = useState({
    nombreUsuario: "",
    nombres: "",
    apellidos: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const { fetchUser } = useUser();

  const navigate = useNavigate();

  const createUserURI = "http://localhost:4000/usuario/register";

  async function createUser(url) {
    try {
      const response = await axios.post(url, {
        nombreUsuario: userData.nombreUsuario,
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        contrasena: userData.contrasena,
      });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Fetch error: ", error);
      throw error;
    }
  }
  const handleLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.contrasena !== userData.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (
      userData.contrasena === userData.confirmarContrasena &&
      userData.nombreUsuario !== "" &&
      userData.nombres !== "" &&
      userData.apellidos !== "" &&
      userData.contrasena !== ""
    ) {
      await createUser(createUserURI);
      await fetchUser();
      alert('Usuario registrado con exito')
      navigate("/perfil");
    } else {
      alert("Llene todos los campos");
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 px-auto mb-40">
        <img
          src="/logo.png"
          alt="logo"
          width="40%"
          className="justify-self-center"
        />
        <div className="text-center">
          <h1 className="text-4xl mb-16">Crea tu cuenta</h1>
          <form className="flex flex-col space-y-2 mx-8 md:mx-96">
            <label htmlFor="username" className="text-gray-700 font-bold">
              Username:
            </label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
            <label htmlFor="text" className="text-gray-700 font-bold">
              Name:
            </label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
            <label htmlFor="text" className="text-gray-700 font-bold">
              Last Name:
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
            <label htmlFor="password" className="text-gray-700 font-bold">
              Password:
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />

            <label htmlFor="password" className="text-gray-700 font-bold">
              Confirmar Password:
            </label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
            />
            <div className="pt-4">
              <p>
                Ya tienes cuenta?{" "}
                <a onClick={handleLogin} className="font-bold">
                  Inicia sesion aqui!
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Registrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
