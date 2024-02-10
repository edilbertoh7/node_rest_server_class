const express = require('express')
const cors = require('cors')
class Server {
    constructor() {
        //inicializo express
        this.app = express()
        //inicializo el puerto
        this.port = process.env.PORT || 3000
        // path de usuarios
        this.usuariosPath = '/api/usuarios';
        // middlewares
        this.middlewares();
        //rutas de la aplicacion
        this.routes();
    }

    middlewares() {
      // cors
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());
        //uso express.static para que el servidor acepte archivos estaticos
        this.app.use(express.static('public'))
    }

    //creo el metodo routes para poner todas las rutas
    routes() {
       this.app.use(this.usuariosPath, require('../routes/usuarios'))
      //  this.app.use('/api/usuarios2', require('../routes/usuarios'))

    }

    //metodo que muestra el puerto donde esta corriendo el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puertos ' + 'http://localhost:'+this.port);
        });
    }






}

module.exports = Server
