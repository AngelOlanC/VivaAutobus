import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white text-gray-800 flex justify-center items-center px-4 py-2 w-full">
      <ul className="flex flex-row space-x-4 mx-auto">
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <NavLink to="/viajar">Viajar</NavLink>
        </li>
        <li className="hover:bg-gray-200 py-2 px-3 rounded">
          <NavLink to="/perfil">Perfil</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;