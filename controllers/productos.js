const { response } = require('express')

const {Producto,Categoria} = require('../models');

const crearProducto = async (req,res = response) => {
    
    try {
        const nombre = req.body.nombre.toUpperCase();

        const nombreCategoria = req.body.categoria.toUpperCase();
        const query = {nombre:nombreCategoria};
        console.log(req.body,nombre,nombreCategoria);
        
        const [productoDB,categoria] = await Promise.all([
            Producto.findOne({nombre}),
            Categoria.findOne(query)
        ]);
        console.log(productoDB,categoria);
        
        if (productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre} ya existe!`
            })
        }
        //Generar la data a guardar
        const data = {
            nombre,
            usuario:req.usuario._id,
            categoria
        }
        
        const producto = new Producto(data);
        
        //guardar DB
        await producto.save();
    
        return res.status(200).json({
            msg: `Producto ${nombre} creado!`,
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: `Hubo un error al crear el producto`,
            error
        });
    }

}

//obtenerProductos - paginado = total - populate 
const obtenerProductos = async (req,res = response) =>{
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
        msg: 'obtenerProductos:',
        total,
        categorias
    })
    
}

//obtenerProducto  - populate {} 
const obtenerProducto = async (req,res = response) =>{
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
//actualizarProducto (nombre) - estado:false 
const actualizarProducto = async (req,res = response ) =>{
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
//borrarProducto id - estado:false 
const borrarProducto = async (req,res = response) =>{
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
    crearProducto,
    obtenerProductos,
    obtenerProducto, 
    actualizarProducto,
    borrarProducto
}
