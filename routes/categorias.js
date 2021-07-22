const { Router } = require('express');
const {check,body} = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');

const { validarCampos,validarJWT } = require('../middlewares');


const router = Router();
//Obtener todas las categorias - publico
router.get("/",(req,res)=>{
    res.json({
        msg:'get'
    })
});
//Obtener una categoria por id - publico
router.get("/:id",(req,res)=>{
    res.json({
        msg:'get - id'
    })
});
//Crear una nueva categoria - privado - cualquier persona con un token valido
router.post("/",[
    validarJWT,
    body('nombre','El nombre es requerido').not().isEmpty(),
    validarCampos
],crearCategoria);
//Actualizar - privado - cualquiera con token valido
router.put("/:id",(req,res)=>{
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
