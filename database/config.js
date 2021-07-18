const mongoose = require("mongoose");
require('colors');

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log(">>> Connected to DB ".green);
    } catch (error) {
        throw new Error("Error al iniciar DB",error);
    }
}

module.exports = {
    dbConnection
}