import type { NextFunction, Request, Response } from 'express';
import { verificarToken } from '../utils/jwt';

export interface RequestAutenticado extends Request {
  usuarioId?: string;
}

export function authMiddleware(
  req: RequestAutenticado,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ mensagem: 'Token malformado' });
  }

  try {
    const usuarioId = verificarToken(token);
    req.usuarioId = usuarioId;
    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
}
