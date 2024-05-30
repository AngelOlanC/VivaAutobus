import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Registro = () => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const createUserURI = "http://localhost:4000/usuario/crear";

  async function createUser(url) {
    const userData = {
      nombreUsuario: userName,
      nombres: name,
      apellidos: lastName,
      contrasena: password,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Fetch error: ", error);
      throw error;
    }
  }

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (
      password === confirmPassword &&
      userName !== "" &&
      name !== "" &&
      lastName !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      createUser(createUserURI);
      // alert("Usuario registrado correctamente");
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
              id="username"
              name="username"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleUserNameChange}
            />
            <label htmlFor="text" className="text-gray-700 font-bold">
              Name:
            </label>
            <input
              type="text"
              id="text"
              name="text"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleNameChange}
            />
            <label htmlFor="text" className="text-gray-700 font-bold">
              Last Name:
            </label>
            <input
              type="text"
              id="text"
              name="text"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleLastNameChange}
            />
            <label htmlFor="password" className="text-gray-700 font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handlePasswordChange}
            />

            <label htmlFor="password" className="text-gray-700 font-bold">
              Confirmar Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleConfirmPasswordChange}
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
