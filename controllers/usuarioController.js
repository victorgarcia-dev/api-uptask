import { request, response } from 'express';

import { Usuario } from '../models/Usuario.js';


const confirmar = async ( req = request, res = response ) => {

    //evitar registros duplicados
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({ email : email });
    if(existeUsuario){
        const error = new Error('usuario ya registrado');
        res.status(400).json({message: error.message});
    }


    try {
        const usuario = new Usuario(req.body); //le mando al modelo la informacion que deseo guardar
        await usuario.save(); //guarda el usuario en la base de datos
        res.status(200).json("usuario creado");
    } catch (error) {
        console.log(`error al confirmar un usuario, ${error}`);
    }
}


export {
    confirmar
}