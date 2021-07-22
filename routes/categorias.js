const { Router } = require('express');
const {check,body} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias');

const { validarCampos,validarJWT } = require('../middlewares');


const router = Router();
//Obtener todas las categorias - publico
router.get("/",obtenerCategorias);
//Obtener una categoria por id - publico
router.get("/:id",[
    //TODO:
    //check('nombre','El nombre es obligatorio')
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
    //TODO:
    //Por nombre actualizar la categoria
],(req,res)=>{
    res.json({
        msg:'put'
    })
});
//Borrar una categoria - admin
router.delete("/:id",(req,res)=>{
    res.json({
        msg:'delete'
    })
});



module.exports = router
