export interface Usuario {
  id: number;
  email: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface LoginResponse {
  mensagem: string;
  usuario: Usuario;
}
