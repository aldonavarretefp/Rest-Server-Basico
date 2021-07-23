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

    const [productos,total] = await Promise.all([
        Producto.find(query)
                .limit(Number(limite))
                .skip(Number(skip))
                .populate('usuario',"nombre")
                .populate('categoria','nombre'),
        Producto.countDocuments(query)
    ]);
    res.status(200).json({
        msg: 'obtenerProductos:',
        total,
        productos
    })
    
}

//obtenerProducto  - populate {} 
const obtenerProducto = async (req,res = response) =>{
    const { id } = req.params;
    const producto = await Producto.findOne({estado:true,_id:id})
                        .populate('usuario','nombre')
                        .populate('categoria','nombre');;
    if(!producto){
        return res.status(404).json({
            msg: `Producto con id ${id} no encontrado!`
        });
    }
    res.status(200).json({
        msg: 'producto:',
        producto
    });

}
//actualizarProducto (nombre) - estado:false 
const actualizarProducto = async (req,res = response ) =>{
    const {id} = req.params;
    const filter = {_id:id,estado:true};
    const {estado,usuario,categoria,...data} = req.body;
    const options = {new:true};
    if (data.nombre){data.nombre = data.nombre.toUpperCase()};
    const update = data
    const producto = await Producto.findOneAndUpdate(filter,update,options)
                            .populate('usuario','nombre')
                            .populate('categoria','nombre');
    if(!producto){
        return res.status(404).json({
            msg: `Producto con ID:${id} NOT FOUND`
        })
    }

    res.status(200).json({
        msg: 'productoActualizada:',
        producto 
    })
}
//borrarProducto id - estado:false 
const borrarProducto = async (req,res = response) =>{
    const {id} = req.params;
    const filter = {_id:id,estado:true};
    const update = {estado:false};
    const options = {new:true};
    const producto = await Producto.findOneAndUpdate(filter,update,options)
                                    .populate('usuario','nombre')
                                    .populate('categoria','nombre');
    if(!producto){
        return res.status(404).json({
            msg: `No se encontró el producto!`
        });
    }
   
    res.status(200).json({
        msg: 'Producto borrado!',
        producto
    })
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto, 
    actualizarProducto,
    borrarProducto
}
