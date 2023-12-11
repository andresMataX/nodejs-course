import express, { Application } from 'express'
import cors from 'cors'
import userRoutes from '../routes/usuario'
import db from '../db/connection'

class Server {
  private app: Application
  private port: string
  private paths = {
    usuarios: '/api/usuarios',
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8000'

    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log('Database online')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura y paraseo del Body
    this.app.use(express.json())

    // Carpeta pública
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.usuarios, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

export default Server
