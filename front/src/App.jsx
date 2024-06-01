import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar";
import Perfil from "./Pages/Perfil";
import Viajar from "./Pages/Viajar";
import Registro from "./Pages/Registro";
import Pago from "./Pages/Pago";
import ViajesDisponibles from "./Pages/ViajesDisponibles";
import ViajesPendientes from "./Pages/ViajesPendientes";
import ViajesCompletados from "./Pages/ViajesCompletados";
import "./input.css";
import { UserProvider } from "./Components/UserContext";

const App = () => {
  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/Viajar" element={<Viajar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/" element={<Home />} />
        <Route path="/viajesDisponibles" element={<ViajesDisponibles />} />
        <Route path="/viajesCompletados" element={<ViajesCompletados />} />
        <Route path="/viajesPendientes" element={<ViajesPendientes />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
