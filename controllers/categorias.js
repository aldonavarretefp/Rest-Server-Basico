const {response} = require('express');

const Categoria= require('../models/categoria')

//TODO: 
//obtenerCategorias - paginado = total - populate
//obtenerCategoria  - populate {}
//actualizarCategoria (nombre) - estado:false
//borrarCategoria id - estado:false
//TODO: 
//Rutas:
    // MiddleWare para validar los ids
    

const crearCategoria = async (req,res = response) => {
    
    try {
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({nombre});
        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe!`
            })
        }
        //Generar la data a guardar
        const data = {
            nombre,
            usuario:req.usuario._id
        }
    
        const categoria = new Categoria(data);
    
        //guardar DB
        await categoria.save();
    
        return res.status(200).json({
            msg: `Categoria ${nombre} creada!`,
            categoria
        });
    } catch (error) {
        res.status(400).json({
            msg: `Hubo un error al crear la Categoria`,
            error
        });
    }

}

module.exports = {
    crearCategoria
}
