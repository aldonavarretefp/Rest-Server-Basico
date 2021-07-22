const {response} = require('express');

const Categoria= require('../models/categoria')



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
                .skip(Number(skip)),
        Categoria.countDocuments(query)
    ]);
    res.status(200).json({
        msg: 'Obtener Categorias de 3 en 3',
        total,
        categorias
    })
    
}

//obtenerCategoria  - populate {} //DONE
const obtenerCategoria = async (req,res = response) =>{
    const { id } = req.params;
    console.log(id)
    const categoria = await Categoria.findOne({estado:true,_id:id}).populate('usuario');
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
//actualizarCategoria (nombre) - estado:false
const actualizarCategoria = async (req,res = response ) =>{

}
//borrarCategoria id - estado:false
const borrarCategoria = async (req,res = response) =>{
    //Casos:
        //1. Que ya este borrada
        //2. Que no exista
    const filter = {id,estado:true}

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria, 
    actualizarCategoria,
    borrarCategoria
}
