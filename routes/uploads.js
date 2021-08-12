const {Router} = require('express');
const {body,check} = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir ,validarCampos } = require('../middlewares');


const router = Router();

// Cargar Archivos
router.post('/',[
    validarArchivoSubir
], cargarArchivo);

//Mostrar Imagen
router.get('/:coleccion/:id',[
    check('id','MONGOID no valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)

// actualizar Imagen
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','MONGOID no valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos

],actualizarImagenCloudinary);


module.exports = router;