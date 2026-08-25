// src/modules/usuario/controllers/usuario.controller.ts
import type { Request, Response } from 'express';
import {
  atualizarUsuario,
  buscarUsuarioPorId,
  criarUsuario,
  deletarUsuario,
} from '../services/usuario.service';

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
