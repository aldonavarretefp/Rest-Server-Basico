const {response} = require('express');


const usuariosGet = (req, res =response)=> {
    const {q,nombre,apiKey} = req.query;
    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apiKey
    });
}
const usuariosPost = (req, res =response)=> {
    const {nombre,edad} = req.body;
    const {id} = req.params;
    res.json({
        msg: "post API - Controlador",
        id,
        nombre,
        edad,
    });
}
const usuariosPut = (req, res =response)=> {
    res.json({
        msg: "put API - Controlador"
    });
}
const usuariosPatch = (req, res =response)=> {
    res.json({
        msg: "patch API - Controlador"
    });
}
const usuariosDelete = (req, res =response)=> {
    res.json({
        msg: "delete API - Controlador"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}