const validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  {esAdministrador, tieneRole}  = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo');
module.exports = {
    ...validarCampos,
    ...validarJWT,
    esAdministrador,
    tieneRole,
    ...validarArchivoSubir
}