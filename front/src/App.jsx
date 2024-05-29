import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginForm from './Pages/Login';
import Buscar from './Pages/Buscar';
import NavBar from './Components/NavBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Buscar" element={<Buscar />} />
      </Routes>
    </>
  )
}

export default App