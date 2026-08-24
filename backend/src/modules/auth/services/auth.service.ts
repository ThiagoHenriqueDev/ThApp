// src/modules/auth/services/auth.service.ts
import bcrypt from 'bcrypt';
import type { Usuario } from '../../../../generated/prisma/client';
import { UsuarioRepository } from '../../usuario/repositories/usuario.repository';

const usuarioRepository = new UsuarioRepository();

export async function autenticar(
  email: string,
  senha: string,
): Promise<Usuario> {
  const usuario = await usuarioRepository.buscarPorEmail(email);

  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    throw new Error('Credenciais inválidas');
  }

  return usuario;
}
