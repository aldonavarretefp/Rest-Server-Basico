const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require("../database/config");


class Server {
    //Usualmente las propiedades se declaran en constructor
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
            
        }
        

        //Conectar a base de datos
        this.conectarBaseDatos();

        //Middlewares   
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();

    }
    async conectarBaseDatos(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }
    routes(){
        //Configurando las rutas
        this.app.use(this.paths.auth,require("../routes/auth"));
        this.app.use(this.paths.buscar,require("../routes/buscar"));
        this.app.use(this.paths.categorias,require("../routes/categorias"));
        this.app.use(this.paths.productos,require("../routes/productos"));
        this.app.use(this.paths.uploads,require("../routes/uploads"));
        this.app.use(this.paths.usuarios,require("../routes/usuarios"));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;