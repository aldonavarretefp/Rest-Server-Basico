const {Schema,model} = require('mongoose');

const CategoriaSchema = new Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required: true
    },
    img:{
        type:String,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
});

module.exports = model('Categoria',CategoriaSchema);