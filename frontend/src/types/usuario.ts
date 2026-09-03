export interface Usuario {
  id: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface LoginResponse {
  mensagem: string;
  usuario: Usuario;
  token: string;
}
