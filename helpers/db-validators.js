const { Role,
        Usuario,
        Categoria } = require("../models");

const esRoleValido = async (rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la DB`);
    }
}
const existeEmail = async (correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail)throw new Error(`${correo} ya esta registrado`);
}
const existeUsuarioporId = async (id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario)throw new Error(`${id} no existe en la DB`);
}

const existeCategoriaPorNombre = async (nombre = '') =>{
    //Las categorias estan en mayusculas
    nombre = nombre.toUpperCase();

    const filter = {nombre};
    const existeCategoria = await Categoria.findOne(filter);
    if (!existeCategoria){
        throw new Error(`Categoria ${nombre} no existe en la base de datos`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioporId,
    existeCategoriaPorNombre
};