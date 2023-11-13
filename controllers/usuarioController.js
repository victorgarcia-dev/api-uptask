import { request, response } from 'express';
import { generarID } from '../helpers/generarID.js';
import { generarJWT } from '../helpers/generarJWT.js';

import { Usuario } from '../models/Usuario.js';


const registrar = async ( req = request, res = response ) => {
    //evitar registros duplicados
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({ email : email }); //me trae el primer usuario con ese email

    if(existeUsuario){
        const error = new Error('usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body); //le mando al modelo la informacion que deseo guardar
        usuario.token = generarID();
        await usuario.save(); //guarda el usuario en la base de datos
        res.status(200).json("usuario creado");
    } catch (error) {
        console.log(`error al registrar un usuario, ${error}`);
    }
}

const autenticar = async ( req = request, res = response ) => {
    const { email, password } = req.body;

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email : email });
    if(!usuario){
        const error = new Error('El usuario no fue encontrado');
        return res.status(404).json({msg: error.message});
    }

    //comprobar si el usuario está confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmado');
        return res.status(403).json({msg: error.message});
    }

    //comprobar su password
    if( await usuario.comprobarPassword( password )){
        res.json({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    }else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

const confirmar = async ( req = request, res = response ) => {
  const {token} = req.params;

  const confirmarUsuario = await Usuario.findOne({token:token});

  if(!confirmarUsuario){
    const error = new Error('Token no valido');
    return res.status(403).json({msg: error.message});
  } 
   
   
  try {
    confirmarUsuario.confirmado= true;
    confirmarUsuario.token='';
    await confirmarUsuario.save();
    res.status(200).json({msg: 'Usuario confirmado correctamente'});

  } catch (error) {
    console.log(error);
  }
}

const cambiarPassword = async ( req = request, res = response) => {
    const { email } = req.body;

   //comprobar si el usuario existe
   const usuario = await Usuario.findOne({ email : email });
   if(!usuario){
       const error = new Error('El usuario no fue encontrado');
       return res.status(404).json({msg: error.message});
   }

   try {
        usuario.token = generarID();
        await usuario.save();
        res.json({msg:'Hemos enviado un mail con las instrucciones'})
        
   } catch (error) {
        console.log(error);
   }
   console.log(usuario);
}

const comprobarToken = async ( req = request, res = response) => {
   const {token} = req.params;

   //comprobar si es un token valido
   const verificarToken = await Usuario.findOne({ token : token });
   if(verificarToken){
     res.status(200).json({msg:'El token es valido'});
   }else {
     const error = new Error('El token no es valido');
     return res.status(404).json({msg: error.message});
   }
}

const nuevoPassword = async ( req = request, res = response) => {
    const { token } = req.params;
    const { password } = req.body;

    //comprobar si es un token valido
    const usuario = await Usuario.findOne({ token : token });
    if(usuario){
      usuario.password = password;
      usuario.token= '';

      try {
        await usuario.save();
        res.status(200).json({msg: 'Password modificado correctamente'});
        
      } catch (error) {
        console.log(error);
      }

    }else {
      const error = new Error('El token no es valido');
      return res.status(404).json({msg: error.message});
    }
}

const perfil = async ( req = request, res = response) => {
  const { usuario } = req;
  console.log(usuario);
}

export {
    registrar,
    autenticar,
    confirmar,
    cambiarPassword,
    comprobarToken,
    nuevoPassword,
    perfil
}