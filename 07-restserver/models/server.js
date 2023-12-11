const express = require('express')
var cors = require('cors')
const { dbConnection } = require('../database/config.db')

class Server {
  constructor() {
    // Propiedades
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      usuarios: '/api/usuarios',
      productos: '/api/productos',
    }

    // Conectar a base de datos
    this.conectarDB()

    // Middlewares (Funciones que añaden funcionalidaes)
    this.middlewares()

    // Rutas de la app
    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  // Llevan el .use() para indicar que es un middleware
  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'))
    this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'))
    this.app.use(this.paths.categorias, require('../routes/categorias.routes'))
    this.app.use(this.paths.productos, require('../routes/productos.routes'))
    this.app.use(this.paths.buscar, require('../routes/buscar.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en: ${this.port}`)
    })
  }
}

module.exports = Server
