import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { obterToken, removerToken, salvarToken } from "../services/token";
import { buscarPerfil } from "../services/usuario.service";
import type { Usuario } from "../types/usuario";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarUsuarioLogado() {
      const tokenSalvo = obterToken();

      if (!tokenSalvo) {
        setCarregando(false);
        return;
      }

      try {
        const resposta = await buscarPerfil();
        setUsuario(resposta.usuario);
      } catch (error) {
        console.error(error);
        removerToken();
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuarioLogado();
  }, []);

  function login(usuarioLogado: Usuario, token: string) {
    salvarToken(token);
    setUsuario(usuarioLogado);
  }

  function logout() {
    removerToken();
    setUsuario(null);
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
