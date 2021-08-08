
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
    const nombre = await subirArchivo(req.files);
    res.status(200).json({
        nombre
    });
    
}

module.exports = {
    cargarArchivo
}
