const dbValidators = require('./db-validators');
const generarJWT   = require('./generarJWT');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.export = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo

}