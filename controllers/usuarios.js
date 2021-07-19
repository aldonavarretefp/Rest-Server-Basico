const {response} = require('express');
const bcrypt = require('bcryptjs');
const colors = require("colors");


const Usuario = require('../models/usuario');



const usuariosGet = async (req, res =response)=> {
    const {limite = 5,desde = 0} = req.query;
    const query = {estado:true};
    if (Number(desde)>=Number(limite)) {
        res.json({msg:"SINTAXIS_INVALIDA"})
        return
    };

    const [usuarios,total] = await Promise.all([
        Usuario.find(query)
                .limit(Number(limite))
                .skip(Number(desde)),
        Usuario.countDocuments(query)
    ]);
    res.json({
        msg: "users:",
        total,
        usuarios
    });
}
const usuariosPost = async (req, res =response)=> {
    const {nombre,correo, password,rol,google} = req.body;
    const usuario  = new Usuario({nombre,correo,password,rol,google});

    //Encriptar password
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
    //Graba en db
        await usuario.save();
    res.json({
        msg: "createdUser",
        usuario
    });
}
const usuariosPut = async (req, res =response)=> {
    const {id} = req.params;
    const {_id,password,google,correo,...restoUsuario} = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        restoUsuario.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,restoUsuario)
    res.json({
        msg: "updatedUser",
        usuario,
        id
    });
}
const usuariosPatch = (req, res =response)=> {
    res.json({
        msg: "patch API - Controlador"
    });
}
const usuariosDelete = async (req, res =response)=> {
    const {id} = req.params;
    const usuarioAutenticado = req.usuario;
    const filter = { _id: id,estado:true };
    const update = { estado:false };
    const usuario = await  Usuario.findOneAndUpdate(filter,update);
    if (!usuario){
        res.json({
            msg: "NO SE ENCONTRO NINGUN USUARIO ACTIVO",
        });
        return
    }
    res.json({
        msg: "deletedUser:",
        id,
        usuario,
        usuarioAutenticado
        
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}