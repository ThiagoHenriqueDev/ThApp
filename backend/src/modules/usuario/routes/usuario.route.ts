// src/modules/usuario/routes/usuario.route.ts
import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import {
  atualizar,
  buscarUsuario,
  deletar,
  registrar,
} from '../controllers/usuario.controller';

const router = Router();

router.post('/cadastrar', registrar);

router.use(authMiddleware);

router.get('/:id', buscarUsuario);
router.put('/:id', atualizar);
router.delete('/:id', deletar);

export default router;
