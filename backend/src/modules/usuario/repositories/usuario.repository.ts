// src/modules/usuario/repositories/usuario.repository.ts
import { prisma } from '../../../config/prisma';

export class UsuarioRepository {
  async criarUsuario(email: string, senha: string) {
    return prisma.usuario.create({
      data: {
        email,
        senha,
      },
    });
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({
      where: {
        email,
      },
    });
  }

  async buscarPorId(id: number) {
    return prisma.usuario.findUnique({
      where: {
        id,
      },
    });
  }

  async atualizarUsuario(id: number, email: string, senha: string) {
    return prisma.usuario.update({
      where: {
        id,
      },
      data: {
        email,
        senha,
      },
    });
  }

  async deletarUsuario(id: number) {
    return prisma.usuario.delete({
      where: {
        id,
      },
    });
  }
}
