import express from 'express';
import { registrar, autenticar, confirmar, cambiarPassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js';

import { checkAuth } from '../middlewares/checkAuth.js';

export const router = express.Router();

//autenticación, registro y confirmación de usuarios
router.post('/', registrar)
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/cambiar-password', cambiarPassword);
router.get('/cambiar-password/:token', comprobarToken);
router.post('/cambiar-password/:token', nuevoPassword);

router.get('/perfil', checkAuth, perfil)
