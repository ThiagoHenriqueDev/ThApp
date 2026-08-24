import type { LoginPayload, LoginResponse } from "../types/usuario";
import API_URL from "./api";

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
