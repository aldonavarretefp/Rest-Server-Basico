const {Router} = require('express');
const {body,check} = require('express-validator');
const router = Router();

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioporId } = require('../helpers/db-validators');
// const {validarCampos}  = require('../middlewares/validar-campos');
// const  {validarJWT}  = require('../middlewares/validar-jwt');
// const  {esAdministrador, tieneRole}  = require('../middlewares/validar-roles');
const { validarCampos,validarJWT,esAdministrador,tieneRole } = require('../middlewares');

//Endpoints:
//Obtener info
router.get('/', usuariosGet);

//Actualizando data
router.put('/:id',[
    check('id','ID_INVALIDO').isMongoId(),
    check('id').custom(existeUsuarioporId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut)

//Crear nuevos recursos
router.post('/',[
    body("correo","CORREO_INVALIDO").isEmail(),
    body("correo").custom(existeEmail),
    body("password","CONTRASENIA MAYOR A 6 CARACTERES").isLength({min:5})
    .matches(/\d/).withMessage("DEBE CONTENER UN NUMERO"),
    body("nombre","NOMBRE ES OBLIGATORIO").not().isEmpty(),
    body('rol').custom(esRoleValido),
    validarCampos
],usuariosPost);

//Borrar, marcandolo nadamas
router.delete('/:id',[
    validarJWT,
    /*esAdministrador,*/
    tieneRole("ADMIN_ROLE","VENTAS_ROLE"),
    check('id','ID_INVALIDO').isMongoId(),
    check('id').custom(existeUsuarioporId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch);



module.exports = router;