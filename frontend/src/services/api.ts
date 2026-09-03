import { obterToken } from "./token";

const API_URL = "http://localhost:3000";

export function headersAutenticados(): HeadersInit {
  const token = obterToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export default API_URL;
