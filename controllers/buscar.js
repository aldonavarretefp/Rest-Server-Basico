const {response} = require('express');
const {ObjectId} = require('mongoose').Types;


const {Usuario,Categoria,Producto} = require('../models');

const coleccionesPermitidas =[
    'usuarios',
    'categorias',
    'productos',
    'roles'
]
const buscarUsuarios = async (termino = '',res = response) =>{
    const esMongoId = ObjectId.isValid(termino);
    const filter = {_id:termino,estado:true}
    if (esMongoId) {
        const usuario = await Usuario.findOne(filter);
        return res.json({
            msg: 'usuarioBuscado:',
            results:usuario? [usuario]: []
        })
    }
    return res.status(404).json({
        msg: `usuario ${termino} no encontrado!`
    })
}

const buscar = (req,res = response) =>{
    const {coleccion,termino} = req.params;

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
            //Linea
            break;
        case 'roles':
            //Linea
            break;
        default:
            break;
    }
}

module.exports ={
    buscar
}