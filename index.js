import express from 'express';
import dotenv from 'dotenv';

import { conectarDB } from './config/db.js';
import { router } from './routes/usuarioRoutes.js';

const app = express();

//variables de entorno
dotenv.config();

//leer datos tipo json en el back-end
app.use(express.json());

//conexion con la base de datos
conectarDB();

//routing
//usuarios
app.use('/api/usuarios', router );

//PUERTO
const port = process.env.PORT || 4000;

//corremos el servidor
app.listen(port, () => {
    console.log(`corriendo en el puerto ${port}`);
});