import { useState } from "react";
import "./App.css";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import type { Usuario } from "./types/usuario";

type Tela = "login" | "cadastro" | "home";

function App() {
  const [tela, setTela] = useState<Tela>("login");
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  function handleLoginSuccess(usuarioLogado: Usuario) {
    setUsuario(usuarioLogado);
    setTela("home");
  }

  function handleSair() {
    setUsuario(null);
    setTela("login");
  }

  if (tela === "home" && usuario) {
    return <Home usuario={usuario} onSair={handleSair} />;
  }

  if (tela === "cadastro") {
    return <Cadastro onIrParaLogin={() => setTela("login")} />;
  }

  return (
    <Login
      onIrParaCadastro={() => setTela("cadastro")}
      onLoginSucesso={handleLoginSuccess}
    />
  );
}

export default App;
