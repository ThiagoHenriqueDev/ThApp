import type { Request, Response } from 'express';
import { autenticar } from '../services/auth.service';

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const { usuario, token } = await autenticar(email, senha);
    const { senha: _senha, ...usuarioSemSenha } = usuario;

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      usuario: usuarioSemSenha,
      token,
    });
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }
}
