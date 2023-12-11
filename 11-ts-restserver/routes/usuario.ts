import { Router } from 'express';
import { crearUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../controllers/usuarios';

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);


export default router;