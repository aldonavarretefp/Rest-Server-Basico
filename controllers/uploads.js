const path = require('path');

const { response} = require('express');
const { extname } = require('path');
const { v4: uuidv4 } = require('uuid');

const cargarArchivo = (req,res = response) => {
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg:"No hay archivos en la petición"
        });
        return;
    }

    const {archivo} = req.files;
    const separarPorPunto = archivo.name.split('.') ; // ['nombredelarchivo','extension' ]
    const extension = separarPorPunto[separarPorPunto.length-1];
    //Validar la extension
    const extensionesValidas  = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extension)){
        return res.status(404).json({
            msg: `Extensión ${extension} inválida`,
            extensionesValidas
        });
    }
    const nombreTemp = uuidv4() + "." + extension;


    uploadPath = path.join(__dirname,'../uploads/',nombreTemp);

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
