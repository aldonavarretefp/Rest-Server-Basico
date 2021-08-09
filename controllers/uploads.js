
const { response} = require('express');

const { subirArchivo } = require('../helpers/subir-archivo');
const {Usuario,Producto} = require('../models');


const cargarArchivo = async (req,res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg:"No hay archivos en la petición"
        });
        return;
    }
    try {
        const nombre = await subirArchivo(req.files,undefined,'img');
        res.status(200).json({
            nombre
        });
        
    } catch (error) {
        res.status(400).json({
            error
        })
    }
    
}

const actualizarImagen = async  (req,res=response) => {
    const {id,coleccion} = req.params;

    let modelo;
    const filters = {estado:true,_id:id}

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findOne(filters)
            if (!modelo){
                return res.status(404).json({
                    msg: `El usuario con ID ${id} no existe`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findOne(filters).populate('categoria');
            if (!modelo){
                return res.status(404).json({
                    msg: `El producto con ID ${id} no existe`
                });
            }
        break;
    
        default:
            return res.status(500).json({
                msg:'Comuniquese con el administrador para este error'
            });        
    }

    const nombreImg = await subirArchivo(req.files,undefined,coleccion);
    modelo.img = nombreImg;


    await modelo.save();

    res.status(200).json(modelo)
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}
