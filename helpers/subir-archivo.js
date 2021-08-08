const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = ({archivo},extensionesValidas = ['png','jpg','jpeg','gif'],carpeta='') => {
    return new Promise((resolve,reject)=> {
        const separarPorPunto = archivo.name.split('.') ; // ['nombredelarchivo','extension' ]
        const extension = separarPorPunto[separarPorPunto.length-1];
        if(!extensionesValidas.includes(extension)){
            // return res.status(404).json({
            //     msg: `Extensión ${extension} inválida`,
            //     extensionesValidas
            // });
            return reject(`Extensión ${extension} inválida`)
        }
        const nombreTemp = uuidv4() + "." + extension;
    
        const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreTemp);
    
        archivo.mv(uploadPath, function(err) {
            if (err) {
            // return res.status(500).json({err});
            return reject(err)
            }
            resolve(nombreTemp);
            // res.json({
            //     msg:`Archivo subido a ${uploadPath}`
            // });
        });

    })

}
module.exports = {
    subirArchivo
}