import type { LoginPayload, LoginResponse } from "../types/usuario";
import API_URL from "./api";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  return response.json();
}
