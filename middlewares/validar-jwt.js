const jwt = require('jsonwebtoken');
const {request,response} = require('express');

const Usuario =  require('../models/usuario');

const validarJWT = async (req=request,res=response,next) =>{
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'NO_TOKEN'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuario =  await Usuario.findOne({_id:uid,estado:true});

        if(!usuario){
        return res.status(401).json({
            msg:"TOKEN_INVALIDO estado Autenticado false"
        });
        }
        req.usuario= usuario;


        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'TOKEN_INVALIDO'
        });
    }
}

module.exports = {
    validarJWT
}