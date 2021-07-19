const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const login = async (req=request,res = response)=>{
    const {correo,password} = req.body;
    try {

        //Email existe
        const usuario = await Usuario.findOne({correo,estado:true});
        //Usuario activo
        if (!usuario){
            return res.status(400).json({
                msg: "Usuario/Password no existe -correo"
            });
            
        }
        //Verificar contrasenia
        if(!bcrypt.compareSync(password,usuario.password)){
            return res.status(400).json({
                msg: "Usuario/Password no existe -pswd"
            });
        }

        //JWT
        res.json({
            msg: "Todo bien o k"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "ERROR, hable con el administrador"
        });
        
    }
}

module.exports = {
    login
}