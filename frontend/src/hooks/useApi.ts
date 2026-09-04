import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import API_URL from "../services/api";
import { obterToken } from "../services/token";

export function useApi() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = obterToken();

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      logout();
      navigate("/login");
      throw new Error("Sessão expirada");
    }

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return response.json();
  }

  return { request };
}
