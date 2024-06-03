import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { user, loading, setUser } = useUser();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    setUserData(user);
  }, [loading]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="NavBar">
      <ul className="NavBarBar">
        {
          !user ? (
            <>
              <NavLink to={"/login"} className="NavLogin">
                Login
              </NavLink>
              <NavLink to={"/register"} className="NavLogin">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/viajar"} className="NavViajar">
                Viajar
              </NavLink>
              <NavLink to={"/perfil"} className="NavPerfil">
                Perfil
              </NavLink>
              <button onClick={handleLogout} className="NavPerfil">
                Logout
              </button>
            </>
          )
        }

      </ul>
    </nav>
  );
};

export default NavBar;