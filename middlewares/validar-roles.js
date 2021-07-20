const jwt = require('jsonwebtoken');
const {request, response} = require('express');
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
const tieneRole = (...roles )=>{
    return (req=request,res=response,next) =>{
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            });
        }
        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere los siguientes roles: ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdministrador,
    tieneRole
}