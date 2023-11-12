import express from 'express';
import { confirmar } from '../controllers/usuarioController.js';

export const router = express.Router();

//autenticación, registro y confirmación de usuarios
router.post('/', confirmar)
