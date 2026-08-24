// src/modules/usuario/routes/usuario.route.ts
import { Router } from 'express';
import {
  atualizar,
  buscarUsuario,
  deletar,
  registrar,
} from '../controllers/usuario.controller';

const router = Router();

router.post('/cadastrar', registrar);
router.get('/:id', buscarUsuario);
router.put('/:id', atualizar);
router.delete('/:id', deletar);

export default router;
