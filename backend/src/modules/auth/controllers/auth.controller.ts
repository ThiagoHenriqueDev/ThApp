import type { Request, Response } from 'express';
import { autenticar } from '../services/auth.service';

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const usuario = await autenticar(email, senha);

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
    });
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }
}
