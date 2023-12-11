const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = async (req, res = response) => {
  // Queryparams
  const { limite = 5, desde = 0 } = req.query

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }), // Filtramos los que cumplan con la condición
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ])

  res.json({
    // ...resp
    total,
    usuarios,
  })
}

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body

  const usuario = new Usuario({ nombre, correo, password, rol })

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync(password, salt)

  // Guardar en BD
  usuario.save()

  res.json(usuario)
}

const usuariosPut = async (req, res) => {
  // Nombre dado por el /:
  const id = req.params.id
  const { _id, password, google, correo, ...resto } = req.body

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })

  res.json(usuario)
}

const usuariosDelete = async (req, res) => {
  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  )

  res.json(usuario)
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
}
