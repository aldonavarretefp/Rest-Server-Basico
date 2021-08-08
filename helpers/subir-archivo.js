const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = ({archivo},extensionesValidas = ['png','jpg','jpeg','gif'],carpeta='') => {
    return new Promise((resolve,reject)=> {
        const separarPorPunto = archivo.name.split('.') ; // ['nombredelarchivo','extension' ]
        const extension = separarPorPunto[separarPorPunto.length-1];
        if(!extensionesValidas.includes(extension)){
            return reject(`Extensión ${extension} no permitida - ${extensionesValidas}`)
        }
        const nombreTemp = uuidv4() + "." + extension;
    
        const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreTemp);
    
        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err)
            }
            resolve(nombreTemp);

        });

    })

}
module.exports = {
    subirArchivo
}