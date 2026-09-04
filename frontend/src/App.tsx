import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./contexts/useAuth";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { RotaProtegida } from "./routes/RotaProtegida";

function App() {
  const { usuario } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={usuario ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/cadastro"
        element={usuario ? <Navigate to="/home" replace /> : <Cadastro />}
      />
      <Route
        path="/home"
        element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
