import "../Styles/Home.css";
import LoginForm from "../Components/LoginForm";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 px-auto">
        <img
          src="/logo.png"
          alt="logo"
          className="justify-self-center"
          width="40%"
        />
        <div className="text-center">
          <h1 className="Titulo-Inicia-Sesion">Inicia sesion</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
