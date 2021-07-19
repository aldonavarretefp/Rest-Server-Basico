const jwt = require('jsonwebtoken');
const esAdministrador = (req=request,res = response,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        });
    }
    const {rol,nombre} = req.usuario;
    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} NO ES ADMINISTRADOR`
        });
    }
    next();
}

module.exports = {
    esAdministrador
}