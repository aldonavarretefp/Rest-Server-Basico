const {Router} = require('express');
const {body,check} = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir ,validarCampos } = require('../middlewares');


const router = Router();


router.post('/',[
    validarArchivoSubir
], cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','MONGOID no valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos

],actualizarImagen);


module.exports = router;