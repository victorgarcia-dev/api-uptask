import express from 'express';

export const routerUser = express.Router();

routerUser.get('/', ( req, res ) => {
    res.send("get api-usuarios");
});