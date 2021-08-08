const path = require('path');

const { response} = require('express');


const cargarArchivo = (req,res = response) => {
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg:"No hay archivos en la petición"
        });
        return;
    }

    const {archivo} = req.files;
    
    uploadPath = path.join(__dirname,'../uploads/',archivo.name);

    archivo.mv(uploadPath, function(err) {
        if (err) {
        return res.status(500).json({err});
        }

        res.json({
            msg:`Archivo subido a ${uploadPath}`
        });
    });

}

module.exports = {
    cargarArchivo
}
