import bcrypt from 'bcrypt';
import type { Usuario } from '../../../../generated/prisma/client';
import { gerarToken } from '../../../utils/jwt';
import { UsuarioRepository } from '../../usuario/repositories/usuario.repository';

const usuarioRepository = new UsuarioRepository();

interface AutenticarResultado {
  usuario: Usuario;
  token: string;
}

export async function autenticar(
  email: string,
  senha: string,
): Promise<AutenticarResultado> {
  try {
    const usuario = await usuarioRepository.buscarPorEmail(email);

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      throw new Error('Credenciais inválidas');
    }

    const token = gerarToken(usuario.id);

    return { usuario, token };
  } catch (error) {
    console.error('ERRO AO AUTENTICAR USUÁRIO:', error);
    throw new Error('Erro ao autenticar usuário');
  }
}
