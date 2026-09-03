// src/modules/usuario/controllers/usuario.controller.ts
import type { Request, Response } from 'express';
import type { RequestAutenticado } from '../../../middlewares/auth.middleware';
import { UsuarioRepository } from '../repositories/usuario.repository';
import {
  atualizarUsuario,
  buscarUsuarioPorId,
  criarUsuario,
  deletarUsuario,
} from '../services/usuario.service';

const usuarioRepository = new UsuarioRepository();

export async function registrar(req: Request, res: Response) {
  const { email, senha } = req.body;
  try {
    const usuario = await criarUsuario(email, senha);
    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar usuário' });
  }
}

export async function buscarUsuario(
  req: Request<{ id: string }>,
  res: Response,
) {
  const { id } = req.params;
  try {
    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.status(200).json({
      mensagem: 'Usuário encontrado',
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
  }
}

export async function atualizar(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const { email, senha } = req.body;
  try {
    const usuarioAtualizado = await atualizarUsuario(id, email, senha);
    res.status(200).json({
      mensagem: 'Usuário atualizado com sucesso',
      usuario: {
        id: usuarioAtualizado.id,
        email: usuarioAtualizado.email,
      },
    });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar usuário' });
  }
}

export async function deletar(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  try {
    const usuarioDeletado = await deletarUsuario(id);
    res.status(200).json({
      mensagem: 'Usuário deletado com sucesso',
      usuario: {
        id: usuarioDeletado.id,
        email: usuarioDeletado.email,
      },
    });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao deletar usuário' });
  }
}

export async function meuPerfil(req: RequestAutenticado, res: Response) {
  try {
    const usuario = await usuarioRepository.buscarPorId(
      req.usuarioId as string,
    );

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const { senha: _senha, ...usuarioSemSenha } = usuario;

    return res.status(200).json({ usuario: usuarioSemSenha });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
  }
}
