const {response} = require('express');
const {ObjectId} = require('mongoose').Types;


const {Usuario,Categoria,Producto} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]
const buscarUsuarios = async (termino = '',res = response) =>{
    const filter = {_id:termino,estado:true};

    // Por correo
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const usuario = await Usuario.findOne(filter);
        return res.status(200).json( {
            msg: 'usuarioBuscado:',
            results: usuario? [usuario]: []
        })
    }else{
       // Por nombre
       const regex = new RegExp(termino,'i');
       const usuarios = await Usuario.find({
           estado:true,
           $or:[{nombre:regex},{correo:regex}]
        });
       return res.status(200).json( {
           msg: 'usuariosEncontrados:',
           results: usuarios? [usuarios]: []
       })
    }
}
const buscarProducto = async (termino = '',res = response) =>{
    res.json({
        msg: 'buscarProducto:',
    })
}

const buscar = (req,res = response) =>{
    const {termino,coleccion} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case'usuarios':
            buscarUsuarios(termino,res);
            break;
        case 'categorias' :
            //Linea
            break;
        case 'productos':
            buscarProducto(termino,res)
            break;
        case 'roles':
            //Linea
            break;
        default:
            res.status(500).json({
                msg: `Error, coleccion ${coleccion} no encontrada,si cree que se trata de un error, comuniquese con el desarrollador`
            });
            break;
    }
}

module.exports ={
    buscar
}