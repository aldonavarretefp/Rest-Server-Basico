const {validationResult} = require("express-validator");

const validarCampos = (req,res,next)=>{
    //Verificar correo no valido
    const errores = validationResult(req);
    if (!errores.isEmpty())return res.status(400).json({ errors: errores.array() });
    next();
}
module.exports = {
    validarCampos
}