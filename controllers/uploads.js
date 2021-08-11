
const path = require('path');
const fs = require('fs');

const { response} = require('express');

const { subirArchivo } = require('../helpers/subir-archivo');
const {Usuario,Producto} = require('../models');


const cargarArchivo = async (req,res = response) => {
    try {
        const nombre = await subirArchivo(req.files,undefined,'img');
        res.status(200).json({
            nombre
        });
    } catch (msg) {
        res.status(400).json({
            msg
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

    // Limpiar imagenes previas

    try {
        if(modelo.img){
            const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
        }
    } catch (error) {
        return res.status(400).json({error});
    }


    const nombreImg = await subirArchivo(req.files,undefined,coleccion);
    modelo.img = nombreImg;

    await modelo.save();

    res.status(200).json(modelo)
}
const mostrarImagen = async (req,res = response )=>{
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

        if(modelo.img){
            const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
            if(fs.existsSync(pathImagen)){
                //Mostrar imagen
                return res.status(200).sendFile(pathImagen);
            }
        }
        const pathNoImageFound = path.join(__dirname,'../assets','no-image.jpg');
        res.status(404).sendFile(pathNoImageFound);
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}
