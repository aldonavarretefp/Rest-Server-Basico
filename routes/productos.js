const { Router } = require('express');
const {check,body} = require('express-validator');


const { crearProducto, 
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const { validarCampos,
        validarJWT,
        esAdministrador,
        } = require('../middlewares');

const {existeCategoriaPorNombre} = require("../helpers/db-validators");

const router = Router();


//Obtener todas las categorias - publico
router.get("/",obtenerProductos);

//Obtener una categoria por id - publico
router.get("/:id",[
    check('nombre','El nombre de la categoria a obtener es obligatorio!').not().isEmpty(),
    check('id','ID es obligatorio!').notEmpty(),
    check('id','ID invalido!').isMongoId(),
    validarCampos
],obtenerProducto);

//Crear producto - privado - cualquier persona con un token valido
router.post("/",[
    validarJWT,
    check('categoria').custom(existeCategoriaPorNombre),
    body('categoria','Categoria es requerida!').notEmpty(),
    body('nombre','El nombre es requerido').not().isEmpty(),
    validarCampos
],crearProducto);

//Actualizar - privado - cualquiera con token valido
router.put("/:id",[
    validarJWT,
    check('id','ID no valido').isMongoId(),
    validarCampos
],actualizarProducto);


//Borrar una categoria - admin
router.delete("/:id",[
    validarJWT,
    esAdministrador,
    check('id','ID es obligatorio').notEmpty(),
    check('id','ID invalido!').isMongoId(),
    validarCampos
],borrarProducto);



module.exports = router

