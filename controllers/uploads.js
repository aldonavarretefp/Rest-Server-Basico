
const { response} = require('express');
const { extname } = require('path');
const { subirArchivo } = require('../helpers/subir-archivo');


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
    res.status(200).json({
        id,coleccion
    })
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}
