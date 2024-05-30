import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/Registro");
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 px-auto">
        <img src="/logo.webp" alt="logo" className="justify-self-center" />
        <div className="text-center">
          <h1 className="text-4xl mb-16">INICIA SESION</h1>
          <form className="flex flex-col space-y-2 mx-8 md:mx-96">
            <label htmlFor="username" className="text-gray-700 font-bold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <label htmlFor="password" className="text-gray-700 font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <div className="pt-4">
              <p>
                Aun no tienes cuenta?
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
