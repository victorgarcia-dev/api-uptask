import express from 'express';
import dotenv from 'dotenv';

import { conectarDB } from './config/db.js';
import { routerUser } from './routes/usuarioRoutes.js';

const app = express();

//variables de entorno
dotenv.config();

//conexion con la base de datos
conectarDB();

//routing
app.use('/api/usuarios', routerUser );

//PUERTO
const port = process.env.PORT || 4000;

//corremos el servidor
app.listen(port, () => {
    console.log(`corriendo en el puerto ${port}`);
});