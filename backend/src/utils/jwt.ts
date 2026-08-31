import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
export function gerarToken(userId: string) {
  if (!secret) {
    throw new Error('JWT_SECRET não está definido no .env');
  }

  // Gera um token JWT com o userId no payload e uma expiração de 1 hora
  const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });

  return token;
}

export function verificarToken(token: string) {
  if (!secret) {
    throw new Error('JWT_SECRET não está definido no .env');
  }

  try {
    // Verifica o token JWT e retorna o payload decodificado
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded.userId;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}
