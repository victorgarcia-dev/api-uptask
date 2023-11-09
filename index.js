import express from 'express';
import dotenv from 'dotenv';

import { conectarDB } from './config/db.js';

const app = express();

//variables de entorno
dotenv.config();

//conexion con la base de datos
conectarDB();

//PUERTO
const port = process.env.PORT || 4000;

//corremos el servidor
app.listen(port, () => {
    console.log(`corriendo en el puerto ${port}`);
});