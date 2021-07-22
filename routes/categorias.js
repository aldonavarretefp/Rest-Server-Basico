const { Router } = require('express');
const {check,body} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const { validarCampos,validarJWT, esAdministrador } = require('../middlewares');


const router = Router();
//Obtener todas las categorias - publico
router.get("/",obtenerCategorias);

//Obtener una categoria por id - publico
router.get("/:id",[
    check('nombre','El nombre de la categoria a obtener es obligatorio!').not().isEmpty(),
    check('id','ID es obligatorio!').notEmpty(),
    check('id','ID invalido!').isMongoId(),
    validarCampos
],obtenerCategoria);

//Crear una nueva categoria - privado - cualquier persona con un token valido
router.post("/",[
    validarJWT,
    body('nombre','El nombre es requerido').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar - privado - cualquiera con token valido
router.put("/:id",[
    validarJWT,
    body('nombre','Se necesita nombre para actualizar!').notEmpty(),
    check('id','ID no valido').isMongoId(),
    validarCampos
],actualizarCategoria);


//Borrar una categoria - admin
router.delete("/:id",[
    validarJWT,
    esAdministrador,
    check('id','ID es obligatorio').notEmpty(),
    check('id','ID invalido!').isMongoId(),
    validarCampos
],borrarCategoria);



module.exports = router
