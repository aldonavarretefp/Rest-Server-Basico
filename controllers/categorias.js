const {response} = require('express');


const Categoria= require('../models/categoria')




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

//obtenerCategorias - paginado = total - populate //DONE
const obtenerCategorias = async (req,res = response) =>{
    const {limite = 3,skip = 0} = req.query;
    const query = {estado:true};
    if (Number(skip)>=Number(limite)) {
        return res.json({msg:"SINTAXIS_INVALIDA"})
        
    };

    const [categorias,total] = await Promise.all([
        Categoria.find(query)
                .limit(Number(limite))
                .skip(Number(skip))
                .populate('usuario',"nombre"),
        Categoria.countDocuments(query)
    ]);
    res.status(200).json({
        msg: 'obtenerCategorias:',
        total,
        categorias
    })
    
}

//obtenerCategoria  - populate {} //DONE
const obtenerCategoria = async (req,res = response) =>{
    const { id } = req.params;
    const categoria = await Categoria.findOne({estado:true,_id:id}).populate('usuario','nombre');
    if(!categoria){
        return res.status(404).json({
            msg: `Categoria con id ${id} no encontrada!`
        });
    }
    res.status(200).json({
        msg: 'categoría:',
        categoria
    });

}
//actualizarCategoria (nombre) - estado:false //DONE
const actualizarCategoria = async (req,res = response ) =>{
    const {id} = req.params;
    const {nombre,estado,usuario,...data} = req.body;
    const categoria = await Categoria.findOne({_id:id,estado:true})
                            .populate('usuario','nombre');
    if(!categoria){
        return res.status(404).json({
            msg: `Categoría con ID:${id} NOT FOUND`
        })
    }
    categoria.nombre = nombre.toUpperCase();
    await categoria.save();
    res.status(200).json({
        msg: 'categoriaActualizada:',
        categoria 
    })
}
//borrarCategoria id - estado:false //DONE
const borrarCategoria = async (req,res = response) =>{
    const {id} = req.params;
    const filter = {_id:id,estado:true};
    const update = {estado:false};
    const options = {new:true};
    const categoria = await Categoria.findOneAndUpdate(filter,update,options).populate('usuario','nombre');
    if(!categoria){
        return res.status(404).json({
            msg: `No se encontró la categoría!`
        });
    }
   
    res.status(200).json({
        msg: 'Categoria borrada!',
        categoriaBorrada: categoria
    })
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria, 
    actualizarCategoria,
    borrarCategoria
}
