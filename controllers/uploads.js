const { response} = require('express')
const cargarArchivo = (req,res = response) => {
    res.status(200).json({
        msg: 'cargarArchivo'
    })
}


module.exports = {
    cargarArchivo
}
