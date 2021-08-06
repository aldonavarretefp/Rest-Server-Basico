const {response} = require('express');
const {ObjectId} = require('mongoose').Types;


const {Usuario,Categoria,Producto,Role} = require('../models');

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

    const filter = {_id:termino,estado:true};

    // Por correo
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const producto = await Producto.findOne(filter).populate("categoria");
        return res.status(200).json( {
            msg: 'productoBuscado:',
            results: producto? [producto]: []
        })
    }else{
       // Por nombre
       const regex = new RegExp(termino,'i');
       const productos = await Producto.find({
           estado:true,
           $or:[{nombre:regex}]
        })
        .populate("categoria");
       return res.status(productos?200:404).json( {
           msg: 'productosEncontrados:',
           results: productos? [productos]: []
       })
    }
}
const buscarCategoria = async (termino = '',res = response) =>{
    const filter = {_id:termino,estado:true};

    // Por correo
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const categoria = await Categoria.findOne(filter);
        return res.status(200).json( {
            msg: 'categoriaBuscada:',
            results: categoria? [categoria]: []
        })
    }else{
       // Por nombre
       const regex = new RegExp(termino,'i');
       const categorias = await Categoria.find({
           estado:true,
           $or:[{nombre:regex},{correo:regex}]
        });
       return res.status(categorias?200:404).json( {
           msg: 'categoriasEncontrados:',
           results: categorias? [categorias]: []
       })
    }
}
const buscarRol = async (termino = '',res = response) =>{
    const filter = {_id:termino};

    // Por correo
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const rol = await Role.findOne(filter);
        return res.status(200).json( {
            msg: 'rolBuscado:',
            results: rol? [rol]: []
        })
    }else{
       // Por nombre
       const regex = new RegExp(termino,'i');
       const roles = await Role.find({
           $or:[{rol:regex}]
        });
       return res.status(roles?200:404).json( {
           msg: 'rolesEncontrados:',
           results: roles? [roles]: []
       })
    }
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
            buscarCategoria(termino,res);
            break;
        case 'productos':
            buscarProducto(termino,res);
            break;
        case 'roles':
            buscarRol(termino,res);
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