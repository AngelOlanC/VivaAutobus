import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar">
      <ul className="NavBarBar">
        <button className="NavLogin"
          onClick={() => { window.location.href = "/login" }}>Login
        </button>
        <button className="NavViajar"
          onClick={() => { window.location.href = "/viajar" }}>Viajar
        </button>
        <button className="NavPerfil"
          onClick={() => { window.location.href = "/perfil" }}>Perfil
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;