// src/modules/usuario/services/usuario.service.ts
import type { Usuario } from '../../../../generated/prisma/client';
import { hashSenha } from '../../../utils/hash';
import { UsuarioRepository } from '../../usuario/repositories/usuario.repository';

const usuarioRepository = new UsuarioRepository();

export async function criarUsuario(
  email: string,
  senha: string,
): Promise<Usuario> {
  const usuarioExistente = await usuarioRepository.buscarPorEmail(email);

  if (usuarioExistente) {
    throw new Error('Usuário já existe');
  }
  const senhaHash = await hashSenha(senha);
  return usuarioRepository.criarUsuario(email, senhaHash);
}

export async function buscarUsuarioPorId(id: number): Promise<Usuario | null> {
  return usuarioRepository.buscarPorId(id);
}

export async function atualizarUsuario(
  id: number,
  email: string,
  senha: string,
): Promise<Usuario> {
  const usuarioExistente = await usuarioRepository.buscarPorId(id);

  if (!usuarioExistente) {
    throw new Error('Usuário não encontrado');
  }

  const senhaHash = await hashSenha(senha);

  return usuarioRepository.atualizarUsuario(id, email, senhaHash);
}

export async function deletarUsuario(id: number): Promise<Usuario> {
  const usuarioExistente = await usuarioRepository.buscarPorId(id);

  if (!usuarioExistente) {
    throw new Error('Usuário não encontrado');
  }
  return usuarioRepository.deletarUsuario(id);
}
