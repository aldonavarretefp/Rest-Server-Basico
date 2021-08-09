const {Router} = require('express');
const {body,check} = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/',cargarArchivo);

router.put('/:coleccion/:id',[
    check('id','MONGOID no valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos

],actualizarImagen);


module.exports = router;