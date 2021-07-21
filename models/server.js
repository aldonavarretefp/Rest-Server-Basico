const express = require('express');
const cors = require('cors')

const {dbConnection} = require("../database/config");


class Server {
    //Usualmente las propiedades se declaran en constructor
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            
            categorias: '/api/categorias'
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
    }
    routes(){
        //Configurando las rutas
        this.app.use(this.paths.auth,require("../routes/auth"));
        this.app.use(this.paths.usuarios,require("../routes/usuarios"));
        this.app.use(this.paths.categorias,require("../routes/categorias"));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;