import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar";
import Perfil from "./Pages/Perfil";
import Viajar from "./Pages/Viajar";
import Registro from "./Pages/Registro";
import ViajesDisponibles from "./Pages/ViajesDisponibles";
import "./input.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/Login" element={<Home />} />
        <Route path="/Viajar" element={<Viajar />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="/ViajesDisponibles" element={<ViajesDisponibles />} />
      </Routes>
    </>
  );
};

export default App;
