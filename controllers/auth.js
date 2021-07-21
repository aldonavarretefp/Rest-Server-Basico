const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {

        //Email existe
        const usuario = await Usuario.findOne({ correo, estado: true });
        //Usuario activo
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario/Password no existe -correo"
            });

        }
        //Verificar contrasenia
        if (!bcrypt.compareSync(password, usuario.password)) {
            return res.status(400).json({
                msg: "Usuario/Password no existe -pswd"
            });
        }

        //JWT
        const token = await generarJWT(usuario.id);
        res.json({
            msg: "loggedUser:",
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "ERROR, hable con el administrador"
        });

    }
}
const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    try {
        const {correo,nombre,img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo,estado:true});
        //Si no existe, crealo
        if (!usuario){
            const data = {
                nombre,
                correo,
                password: 'Google Password xd',
                img,
                google:true 
            };
            usuario = new Usuario(data);
            //Guardando en DB
            await usuario.save();
        }

        res.status(200).json({
            msg: 'Todo OK!, Google SignIn',
            usuario:{nombre,correo,img},
            id_token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no valido',
            id_token
        })

    }
}
module.exports = {
    login,
    googleSignIn
}