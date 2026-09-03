import type { LoginPayload, LoginResponse, Usuario } from "../types/usuario";
import API_URL, { headersAutenticados } from "./api";

export async function cadastrar(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/usuarios/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar usuário");
  }

  return response.json();
}

export async function buscarPerfil(): Promise<{ usuario: Usuario }> {
  const response = await fetch(`${API_URL}/usuarios/me`, {
    method: "GET",
    headers: headersAutenticados(),
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar o perfil");
  }

  return response.json();
}
