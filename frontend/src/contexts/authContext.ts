import { createContext } from "react";
import type { Usuario } from "../types/usuario";

export interface AuthContextData {
  usuario: Usuario | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined,
);
